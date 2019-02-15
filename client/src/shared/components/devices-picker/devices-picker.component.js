import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, List, Avatar, Icon, Input } from 'antd';
import './devices-picker.component.scss';
import { DeviceModel } from '../../models/DeviceModel';
import { MapDevicesPickerComponent } from './map-devices-picker.component';
import L from 'leaflet';
import { AppLayoutModel } from '../../models/AppLayoutModel';

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <Avatar size={'small'} shape='square' icon='profile'/>);

const SortableItem = SortableElement(({ device, onRemoveDevice }) => {
    return (
        <List.Item>
            <List.Item.Meta avatar={<DragHandle/>} title={device.name}/>
            <Button size={'small'} type='danger' shape='circle' icon='close' title='Remove'
                    onClick={() => onRemoveDevice(device.id)}/>
        </List.Item>
    );
});

const SortableList = SortableContainer(({ devices, onRemoveDevice }) => {
    return (
        <List
            size='small'
            className={'devices-list selected'}
            itemLayout='horizontal'
            dataSource={devices}
            renderItem={(device, index) => (
                <SortableItem key={device.id} index={index} device={device} onRemoveDevice={onRemoveDevice}/>
            )}
        />
    );
});

export class DevicesPickerComponent extends React.Component {
    searchInputRef = React.createRef();
    travelTimeMapRef = React.createRef();

    state = {
        searchFieldValue: ''
    };

    onToggleDevices = (selectedDeviceIds) => {
        this.props.onListChange(selectedDeviceIds);
    };

    filterDevices = (device) => {
        return device.name.toLowerCase().indexOf(this.state.searchFieldValue.toLowerCase()) > -1;
    };

    focusSelectedDevices = (pickedDevices) => {
        if (!this.travelTimeMapRef.current.mapRef.current) {
            return;
        }

        const currentDevices = Array.isArray(pickedDevices) ? pickedDevices : this.props.currentTravelTimeDevicesList;
        const selectedDevices = [];

        this.props.devices.forEach(device => {
            currentDevices.forEach(el => {
                if (el === device.id) {
                    selectedDevices.push(device);
                }
            });
        });

        const bounds = L.latLngBounds(selectedDevices.map(({ latitude, longitude }) => ({
            lat: latitude,
            lng: longitude
        })));

        if (Object.keys(bounds).length !== 0) {
            this.travelTimeMapRef.current.fitBounds([bounds]);
        }
    };

    onAddNewDevice = (deviceId) => {
        this.props.onListChange([...this.props.value, deviceId]);
    };

    onRemoveDevice = (deviceId) => {
        this.props.onListChange(this.props.value.filter(selectedDeviceId => selectedDeviceId !== deviceId));
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const devices = [...this.props.value];

        this.props.onListChange(arrayMove(devices, oldIndex, newIndex));
    };

    clearSearchField = () => {
        this.searchInputRef.current.focus();
        this.setState({ searchFieldValue: '' });
    };

    onChangeSearchFieldValue = (e) => {
        this.setState({ searchFieldValue: e.target.value });
    };

    render() {
        return (
            <Row className={'devices-picker-component'}>
                <Col span={24}>
                    <Col span={11} className={'all-devices-column'}>
                        <Input
                            className={'search-input'}
                            placeholder='Search device..'
                            suffix={this.state.searchFieldValue ?
                                <Icon className={'cpointer'} type='close-circle' onClick={this.clearSearchField}/> :
                                <Icon type='search'/>}
                            value={this.state.searchFieldValue}
                            onChange={this.onChangeSearchFieldValue}
                            ref={this.searchInputRef}
                        />
                        <List
                            size='small'
                            className={'devices-list available'}
                            itemLayout='horizontal'
                            dataSource={this.props.devices.filter(device => !this.props.value.find(selectedDeviceId => selectedDeviceId === device.id))
                                .filter(this.filterDevices)}
                            renderItem={(device, index) => (
                                <List.Item onClick={() => this.onAddNewDevice(device.id)}>
                                    <List.Item.Meta title={device.name}/>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={2} style={{ textAlign: 'center', }}>
                        <Icon className={'swap-icon'} type='swap' style={{ fontSize: 32, }}/>
                    </Col>
                    <Col span={11}>
                        <SortableList
                            devices={this.props.value.map(selectedDeviceId => this.props.devices.find(selectedDevice => selectedDeviceId === selectedDevice.id))}
                            onSortEnd={this.onSortEnd} useDragHandle={true}
                            onRemoveDevice={this.onRemoveDevice}/>
                    </Col>
                </Col>
                <MapDevicesPickerComponent appLayout={this.props.appLayout} devices={this.props.devices}
                                           currentTravelTimeDevicesList={this.props.currentTravelTimeDevicesList}
                                           currentMapSettings={this.props.currentMapSettings}
                                           onMapSettingsChange={this.props.onMapSettingsChange}
                                           focusSelectedDevices={this.focusSelectedDevices}
                                           onToggleDevices={this.onToggleDevices}
                                           ref={this.travelTimeMapRef}/>
            </Row>
        );
    }
}

DevicesPickerComponent.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    onListChange: PropTypes.func.isRequired,
    currentTravelTimeDevicesList: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentMapSettings: PropTypes.object.isRequired,
    onMapSettingsChange: PropTypes.func.isRequired,
};
