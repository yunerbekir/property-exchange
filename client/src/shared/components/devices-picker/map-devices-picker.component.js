import React from 'react';
import PropTypes from 'prop-types';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { Map, Marker, Polygon } from 'react-leaflet';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { deviceIconNotInTravelTime, deviceIconInTravelTime } from '../../../shared/utils/default-device-marker.util';
import { MapTileLayerComponent } from '../map-components/map-tile-layer/map-tile-layer.component';
import { MapButtonsComponent } from '../map-components/map-buttons/map-buttons.component';

export class MapDevicesPickerComponent extends React.Component {
    mapRef = React.createRef();

    state = {
        zoom: this.props.appLayout.mapSettings.zoom,
        newTravelTimeLongitude: this.props.appLayout.mapSettings.lng,
        newTravelTimeLatitude: this.props.appLayout.mapSettings.lat,
    };

    getBoundsFromLatLng = (latLngObject) => {
        return [
            [latLngObject._northEast.lat, latLngObject._northEast.lng],
            [latLngObject._southWest.lat, latLngObject._southWest.lng],
        ];
    };

    onMapMoveEnd = (e) => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            imageBounds: this.getBoundsFromLatLng(this.mapRef.current.leafletElement.getBounds())
        });
    };

    fitBounds = (boundsArray) => {
        if (!this.mapRef.current) {
            return;
        }

        this.mapRef.current.contextValue.map.fitBounds(boundsArray);
    };

    onMapZoomEnd = (e) => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            imageBounds: this.getBoundsFromLatLng(this.mapRef.current.leafletElement.getBounds())
        });
    };

    toggleDevices = (toggledDeviceId) => {
        const currentTravelTimeDevicesList = [...this.props.currentTravelTimeDevicesList];
        const toggledDeviceIndex = this.props.currentTravelTimeDevicesList.findIndex(deviceId => deviceId === toggledDeviceId);
        toggledDeviceIndex > -1 ? currentTravelTimeDevicesList.splice(toggledDeviceIndex, 1) : currentTravelTimeDevicesList.push(toggledDeviceId);

        this.props.onToggleDevices(currentTravelTimeDevicesList);
    };

    render() {
        const position = [this.props.currentMapSettings.lat, this.props.currentMapSettings.lng];

        const selectedDevices = this.props.currentTravelTimeDevicesList.map(selectedDeviceId => {
            return this.props.devices.find(device => selectedDeviceId === device.id);
        });

        return (
            <div className='new-travel-time-map'>
                <MapButtonsComponent mapRef={this.mapRef} devices={this.props.devices}
                                     currentMapSettings={this.props.currentMapSettings}
                                     onMapSettingsChange={this.props.onMapSettingsChange}/>
                <Map worldCopyJump={true} center={position} zoom={this.state.zoom}
                     onMoveend={this.onMapMoveEnd}
                     onZoomend={this.onMapZoomEnd}
                     style={{ height: '300px', width: '100%' }}
                     ref={this.mapRef}>
                    <MapTileLayerComponent appLayout={this.props.appLayout}/>
                    {
                        this.props.devices.map(device => (
                            <Marker key={device.id} position={[device.latitude, device.longitude]}
                                    zIndexOffset={500} onClick={() => this.toggleDevices(device.id)}
                                    icon={deviceIconNotInTravelTime(this.mapRef.current)}/>)
                        )
                    }
                    {
                        selectedDevices.map(device => (
                            <Marker key={device.id} position={[device.latitude, device.longitude]}
                                    zIndexOffset={500} onClick={() => this.toggleDevices(device.id)}
                                    icon={deviceIconInTravelTime(this.mapRef.current, ``)}/>)
                        )
                    }

                    {
                        selectedDevices.map((currentDevice, idx) => {
                            if (selectedDevices.length === idx + 1) {
                                return null;
                            }

                            const destinationDevice = selectedDevices[idx + 1];

                            return <Polygon
                                color='grey'
                                weight={5}
                                key={`${currentDevice.id}__${destinationDevice.id}`}
                                positions={[[currentDevice.latitude, currentDevice.longitude], [destinationDevice.latitude, destinationDevice.longitude]]}/>;
                        })
                    }
                </Map>
            </div>
        );
    }
}

MapDevicesPickerComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    currentTravelTimeDevicesList: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentMapSettings: PropTypes.object.isRequired,
    onMapSettingsChange: PropTypes.func.isRequired,
    focusSelectedDevices: PropTypes.func.isRequired,
    onToggleDevices: PropTypes.func.isRequired,
};
