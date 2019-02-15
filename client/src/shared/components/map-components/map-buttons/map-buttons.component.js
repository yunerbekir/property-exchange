import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './map-buttons.component.scss';
import L from 'leaflet';
import { DeviceModel } from '../../../../shared/models/DeviceModel';

export class MapButtonsComponent extends React.Component {

    onSetMyLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.props.onMapSettingsChange({
                ...this.props.currentMapSettings, ...{
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            });
        });
    };

    focusAllDevices = () => {
        if (!this.props.mapRef.current) {
            return;
        }

        const bounds = L.latLngBounds(this.props.devices.map(({ latitude, longitude }) => ({
            lat: latitude,
            lng: longitude
        })));

        this.props.mapRef.current.contextValue.map.flyToBounds([bounds], { duration: 2 });
    };

    render() {
        return (
            <span>
                {this.props.devices && this.props.devices.length > 0 ?
                    <Button className='focus-devices-btn' type='primary' icon='environment'
                            title='View All Devices' onClick={this.focusAllDevices}/> : null}
                <Button className='get-my-location-btn' type='primary' icon='global'
                        title='Current Location' onClick={this.onSetMyLocation}/>
            </span>
        );
    }
}

MapButtonsComponent.propTypes = {
    mapRef: PropTypes.object.isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    currentMapSettings: PropTypes.object,
    onMapSettingsChange: PropTypes.func.isRequired,
};
