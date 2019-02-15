import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, Polygon } from 'react-leaflet';
import './map-view.component.scss';
import { TravelTimeModel } from '../../../shared/models/TravelTimeModel';
import { Select } from 'antd';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import L from 'leaflet';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
/* eslint-disable no-unused-vars */
import * as polyLineOffset from 'leaflet-polylineoffset';
import * as rotatedMarker from 'leaflet-rotatedmarker';
import { getColorBetween, getDefaultMarkerAngles, getDistanceInPixels } from '../../../core';
import { deviceIconNotInTravelTime, deviceIconInTravelTime } from '../../../shared/utils/default-device-marker.util';
import { MapTileLayerComponent } from '../../../shared/components/map-components/map-tile-layer/map-tile-layer.component';


const requiredPathLengthForMarker = 80;

const getCenterOfPolygon = (position) => {
    if (!position) {
        return new L.LatLng(0, 0);
    }

    return L.latLngBounds(position).getCenter();
};

const getTravelTimeValueIcon = (map, travelTime, range, angle) => {
    const rotateAngle = angle > 0 ? -90 : 90;
    let backgroundColor = getColorBetween(range, travelTime);

    return new L.DivIcon({
        className: 'marker',
        iconSize: [15, 30],
        iconAnchor: [0, 0],
        html: `<div class='travel-time-value-icon' style='background: ${backgroundColor}'>
            <div class='travel-time-value-container' style='transform: skewY(-45deg) rotate(${rotateAngle}deg);'>${typeof travelTime !== 'undefined' ? travelTime : '-'}</div>
            </div>` // eslint-disable-line
    });
};


export class MapViewComponent extends React.Component {
    travelTimeMapRef = React.createRef();

    state = {
        zoom: this.props.appLayout.mapSettings.zoom,
        showMapImage: false,
    };

    fitBounds = (markerArrayIds) => {
        if (!this.travelTimeMapRef.current) {
            return;
        }

        const bounds = L.latLngBounds(this.props.devices.filter(device => markerArrayIds.find(id => id === device.id))
            .map(({ latitude, longitude }) => ({
                lat: latitude,
                lng: longitude
            })));

        this.travelTimeMapRef.current.contextValue.map.fitBounds(bounds);
    };

    onZoomChange = e => {
        this.setState({
            zoom: e.target.value,
        });
    };

    onTravelTimesSelectionChange = (selectedTravelTimesIds) => {
        this.props.travelTimes.forEach(travelTime => {
            if ((travelTime.params.visibleOnMap && selectedTravelTimesIds.indexOf(travelTime.id) === -1) ||
                (!travelTime.params.visibleOnMap && selectedTravelTimesIds.indexOf(travelTime.id) !== -1)) {
                const updatedTravelTime = TravelTimeModel.clone({
                    ...travelTime,
                    params: { ...travelTime.params, visibleOnMap: !travelTime.params.visibleOnMap }
                });

                this.props.onVisibleTravelTimeOnMapChange(updatedTravelTime);
            }
        });
    };

    componentDidMount() {
        this.setState({
            zoom: this.props.appLayout.mapSettings.zoom,
        });
    }

    render() {
        const position = [this.props.appLayout.mapSettings.lat, this.props.appLayout.mapSettings.lng];
        const visibleOnMapTravelTimes = this.props.travelTimes.filter(tt => tt.params.visibleOnMap);

        return (
            <div style={{ height: `100%` }}>
                <Select
                    className='travel-time-selector'
                    mode='multiple'
                    placeholder='Select travel time...'
                    onChange={this.onTravelTimesSelectionChange}
                    value={visibleOnMapTravelTimes.map(tt => tt.id)}>
                    {
                        this.props.travelTimes.map(travelTime =>
                            <Select.Option key={travelTime.id}>{travelTime.name}</Select.Option>)
                    }
                </Select>

                <Map worldCopyJump={true} ref={this.travelTimeMapRef} center={position} zoom={this.state.zoom}
                     onZoomEnd={this.onZoomChange}
                     style={{ height: `100%` }}>
                    <MapTileLayerComponent appLayout={this.props.appLayout}/>
                    {
                        this.props.devices.map(device => (
                            <Marker key={device.id} position={[device.latitude, device.longitude]}
                                    zIndexOffset={500}
                                    icon={deviceIconNotInTravelTime(this.travelTimeMapRef.current)}>
                                <Popup>
                                    <h4>Name: {device.name}</h4>
                                    <div>
                                        Configuration: <a
                                        href={device.configuratorUrl.indexOf('http://') !== 0 ? `http://${device.configuratorUrl}` : device.configuratorUrl}
                                        target={'_blank'}>{device.configuratorUrl}</a>
                                    </div>
                                </Popup>
                            </Marker>))
                    }

                    {
                        visibleOnMapTravelTimes.map(mapTravelTime => mapTravelTime.devices.map((originDeviceId, idx) => {
                            const destinationDeviceId = mapTravelTime.devices[idx + 1];
                            const destinationDevice = this.props.devices.find(d => d.id === destinationDeviceId);
                            const originDevice = this.props.devices.find(d => d.id === originDeviceId);
                            const currentTravelTypeData = (this.props.travelTimesData && this.props.travelTimesData[mapTravelTime.id]) ? this.props.travelTimesData[mapTravelTime.id].data : {};

                            if (mapTravelTime.devices.length - 1 !== idx) {
                                const isZoomedIn = getDistanceInPixels(this.travelTimeMapRef, originDevice, destinationDevice) > requiredPathLengthForMarker;
                                const originRotationAngle = getDefaultMarkerAngles(this.travelTimeMapRef, originDevice, destinationDevice);
                                const destinationRotationAngle = getDefaultMarkerAngles(this.travelTimeMapRef, destinationDevice, originDevice);
                                return [
                                    <Polygon
                                        color={getColorBetween(
                                            mapTravelTime.params.expectedTravelTimeRanges[`${originDeviceId} ${destinationDeviceId}`],
                                            currentTravelTypeData[`${originDevice.id}__${destinationDevice.id}`]
                                        )}
                                        weight={5}
                                        offset={4}
                                        key={`${mapTravelTime.id}__${originDeviceId}__${destinationDeviceId}`}
                                        positions={[[originDevice.latitude, originDevice.longitude], [destinationDevice.latitude, destinationDevice.longitude]]}/>,

                                    <Polygon
                                        color={getColorBetween(
                                            mapTravelTime.params.expectedTravelTimeRanges[`${destinationDeviceId} ${originDeviceId}`],
                                            currentTravelTypeData[`${destinationDeviceId}__${originDeviceId}`]
                                        )}
                                        weight={5}
                                        offset={4}
                                        key={`${mapTravelTime.id}__${destinationDeviceId}__${originDeviceId}`}
                                        positions={[[destinationDevice.latitude, destinationDevice.longitude], [originDevice.latitude, originDevice.longitude]]}/>,

                                    isZoomedIn ?
                                        <Marker key={`oxrigin-${originDevice.id}`}
                                                zIndexOffset={550}
                                                draggable={true}
                                                position={getCenterOfPolygon([[originDevice.latitude, originDevice.longitude], [destinationDevice.latitude, destinationDevice.longitude]])}
                                                rotationAngle={originRotationAngle}
                                                icon={getTravelTimeValueIcon(
                                                    this.travelTimeMapRef.current,
                                                    currentTravelTypeData[`${originDevice.id}__${destinationDevice.id}`],
                                                    mapTravelTime.params.expectedTravelTimeRanges[`${originDeviceId} ${destinationDeviceId}`],
                                                    originRotationAngle
                                                )}/> : null,

                                    isZoomedIn ?
                                        <Marker key={`destination-${destinationDeviceId}`}
                                                zIndexOffset={550}
                                                draggable={true}
                                                position={getCenterOfPolygon([[destinationDevice.latitude, destinationDevice.longitude], [originDevice.latitude, originDevice.longitude]])}
                                                rotationAngle={destinationRotationAngle}
                                                icon={getTravelTimeValueIcon(
                                                    this.travelTimeMapRef.current,
                                                    currentTravelTypeData[`${destinationDevice.id}__${originDevice.id}`],
                                                    mapTravelTime.params.expectedTravelTimeRanges[`${destinationDeviceId} ${originDeviceId}`],
                                                    destinationRotationAngle
                                                )}/> : null,
                                ];
                            }

                            return null;
                        }))
                    }

                    {
                        visibleOnMapTravelTimes.map(mapTravelTime => mapTravelTime.devices.map((originDeviceId, idx) => {
                            const originDevice = this.props.devices.find(d => d.id === originDeviceId);
                            return <Marker key={`origin-${originDevice.id}`}
                                           zIndexOffset={550}
                                           position={[originDevice.latitude, originDevice.longitude]}
                                           icon={deviceIconInTravelTime(this.travelTimeMapRef.current, `${mapTravelTime.name[0]} ${idx + 1}`)}>
                                <Popup>
                                    <h4>Name: {originDevice.name}</h4>
                                    <div>
                                        Configuration: <a
                                        href={originDevice.configuratorUrl}
                                        target={'_blank'}>{originDevice.configuratorUrl}</a>
                                    </div>
                                </Popup>
                            </Marker>;
                        }))
                    }
                </Map>
            </div>
        );
    }
}

MapViewComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    travelTimes: PropTypes.arrayOf(PropTypes.instanceOf(TravelTimeModel)).isRequired,
    travelTimesData: PropTypes.object.isRequired,
    onVisibleTravelTimeOnMapChange: PropTypes.func.isRequired,
};
