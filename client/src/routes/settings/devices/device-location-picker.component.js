import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup } from 'react-leaflet';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { deviceIconNotInTravelTime } from '../../../shared/utils/default-device-marker.util';
import { MapTileLayerComponent } from '../../../shared/components/map-components/map-tile-layer/map-tile-layer.component';
import { MapButtonsComponent } from '../../../shared/components/map-components/map-buttons/map-buttons.component';

export class DeviceLocationPickerComponent extends React.Component {
    refDevice = React.createRef();
    mapRef = React.createRef();

    state = {
        zoom: this.props.appLayout.mapSettings.zoom,
    };

    updateDeviceLocation = () => {
        const { lat, lng } = this.refDevice.current.leafletElement.getLatLng().wrap();

        this.props.onLocationChange({ lat, lng });
    };

    onMapClick = (e) => {
        const { lat, lng } = e.latlng.wrap();
        this.props.onLocationChange({ lat, lng });
    };

    onZoomChange = e => {
        this.setState({
            zoom: e.target.value,
        });
    };

    componentDidMount() {
        this.setState({
            zoom: this.props.appLayout.mapSettings.zoom,
        });
    }

    render() {
        const mapCenter = [this.props.currentLocation.lat || this.props.appLayout.mapSettings.lat, this.props.currentLocation.lng || this.props.appLayout.mapSettings.lng];
        const devicePosition = [this.props.currentLocation.lat, this.props.currentLocation.lng];

        return (
            <div className={'map-settings-container'}>
                <MapButtonsComponent mapRef={this.mapRef} devices={this.props.devices}
                                     onMapSettingsChange={this.props.onLocationChange}/>

                <Map worldCopyJump={true} center={mapCenter} zoom={this.state.zoom}
                     onZoomEnd={this.onZoomChange}
                     onClick={this.onMapClick}
                     style={{ height: '350px' }}
                     ref={this.mapRef}>
                    <MapTileLayerComponent appLayout={this.props.appLayout}/>
                    {
                        this.props.devices.filter(device => this.props.currentDeviceId ? device.id !== this.props.currentDeviceId : true).map(device => (
                            <Marker key={device.id} position={[device.latitude, device.longitude]}
                                    zIndexOffset={500}
                                    icon={deviceIconNotInTravelTime(this.mapRef.current)}>
                                <Popup>
                                    <h4>Name: {device.name}</h4>
                                    <div>
                                        Configuration: <a
                                        href={device.configuratorUrl}
                                        target={'_blank'}>{device.configuratorUrl}</a>
                                    </div>
                                </Popup>
                            </Marker>)
                        )
                    }

                    <Marker position={devicePosition}
                            draggable={true}
                            onDragend={this.updateDeviceLocation}
                            ref={this.refDevice}
                    />
                </Map>
            </div>
        );
    }
}

DeviceLocationPickerComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    currentLocation: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }).isRequired,
    onLocationChange: PropTypes.func.isRequired,
    currentDeviceId: PropTypes.string,
};
