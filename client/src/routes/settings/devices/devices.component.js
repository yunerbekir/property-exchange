import React from 'react';
import { Form, Input, Modal } from 'antd';
import { CrudTableComponent } from '../../../shared/components/crud-table/crud-table.component';
import PropTypes from 'prop-types';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { DeviceLocationPickerComponent } from './device-location-picker.component';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { DeviceIpAddressPickerComponent, LoaderComponent } from '../../../shared';

const devicesTableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
        editable: true,
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'Device ID',
        dataIndex: 'deviceId',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'Longitude',
        dataIndex: 'longitude',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.longitude - b.longitude,
    },
    {
        title: 'Latitude',
        dataIndex: 'latitude',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.latitude - b.latitude,
    },
    {
        title: 'Configuration IP',
        dataIndex: 'configuratorUrl',
        width: '20%',
        render: text => <span>{text} <a onClick={e => e.stopPropagation()}
                                        href={text}
                                        target={'_blank'}>Open</a></span>,
        sorter: (a, b) => a.configuratorUrl.localeCompare(b.configuratorUrl),
    }
];

const initialState = {
    showNewDeviceModal: false,
    showEditDeviceLocationModal: false,
    editDeviceId: '',
    modalDeviceName: '',
    modalDeviceId: '',
    modalDeviceLongitude: null,
    modalDeviceLatitude: null,
    modalDeviceConfiguratorUrl: '',
};

export class DevicesComponent extends React.Component {
    _ismounted = false;

    state = {
        ...initialState,
        showLoader: true
    };

    onDeviceAdd = () => {
        this.setState({ showNewDeviceModal: true });
    };

    getModalDeviceModalOkBtnProps = () => {
        const areRequiredFieldsEmpty = !this.state.modalDeviceName || !this.state.modalDeviceId || !this.state.modalDeviceConfiguratorUrl || !this.state.modalDeviceLongitude || !this.state.modalDeviceLatitude;
        return {
            form: 'device-form',
            htmlType: 'submit',
            disabled: areRequiredFieldsEmpty,
            title: areRequiredFieldsEmpty ? 'Not all fields are filled' : ''
        };
    };

    onOpenDeviceEditModal = (text, device) => {
        this.setState({
            showEditDeviceLocationModal: true,
            modalDeviceName: device.name,
            modalDeviceId: device.deviceId,
            modalDeviceLongitude: device.longitude,
            modalDeviceLatitude: device.latitude,
            editDeviceId: device.id,
            modalDeviceConfiguratorUrl: device.configuratorUrl,
        });
    };

    onModalCancel = () => {
        this.setState({ ...initialState });
    };

    onModalDeviceNameChange = (e) => {
        this.setState({ modalDeviceName: e.target.value });
    };

    onModalDeviceIdChange = (e) => {
        this.setState({ modalDeviceId: e.target.value });
    };

    onModalDeviceLongitudeChange = (e) => {
        this.setState({ modalDeviceLongitude: +e.target.value });
    };

    onModalDeviceLatitudeChange = (e) => {
        this.setState({ modalDeviceLatitude: +e.target.value });
    };

    onModalDeviceConfiguratorUrlChange = (value) => {
        this.setState({ modalDeviceConfiguratorUrl: value });
    };

    onLocationChange = ({ lat, lng }) => {
        this.setState({
            modalDeviceLongitude: lng,
            modalDeviceLatitude: lat,
        });
    };

    onEditDeviceSave = (e) => {
        e.preventDefault();

        const currentDevice = this.props.devices.find(d => d.id === this.state.editDeviceId);
        this.props.updateDeviceAction(new DeviceModel({
            ...currentDevice,
            name: this.state.modalDeviceName || 'Name...',
            deviceId: this.state.modalDeviceId || 'Device ID...',
            longitude: this.state.modalDeviceLongitude || 0,
            latitude: this.state.modalDeviceLatitude || 0,
            configuratorUrl: this.state.modalDeviceConfiguratorUrl || '0.0.0.0',
        })).then(() => this.setState({ ...initialState }));
    };

    onDeviceSave = (e) => {
        e.preventDefault();

        this.props.addDeviceAction({
            name: this.state.modalDeviceName || 'Name...',
            deviceId: this.state.modalDeviceId || 'Device ID...',
            longitude: this.state.modalDeviceLongitude || 0,
            latitude: this.state.modalDeviceLatitude || 0,
            configuratorUrl: this.state.modalDeviceConfiguratorUrl || '0.0.0.0',
        }).then((result) => {
            if (result) {
                this.setState({ ...initialState });
            }
        });
    };


    onDeviceEdit = (deviceJson) => {
        this.props.updateDeviceAction(new DeviceModel(deviceJson));
    };

    onDeviceRemove = (device) => {
        this.props.removeDeviceAction(device.id);
    };

    componentDidMount() {
        this._ismounted = true;

        this.props.getDevicesAction().then(() => {
            if (this._ismounted) {
                this.setState({ showLoader: false });
            }
        });
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const getModalForm = (submitMethod) => <Form id={'device-form'} onSubmit={submitMethod}>
            <Form.Item
                {...formItemLayout}
                label='Name:'>
                <Input autoFocus={true}
                       placeholder='Name...'
                       value={this.state.modalDeviceName}
                       onChange={this.onModalDeviceNameChange}/>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label='Device ID:'>
                <Input placeholder='Device ID...'
                       value={this.state.modalDeviceId}
                       onChange={this.onModalDeviceIdChange}/>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label='Configuration IP:'>
                <DeviceIpAddressPickerComponent value={this.state.modalDeviceConfiguratorUrl}
                                                onChange={this.onModalDeviceConfiguratorUrlChange}/>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label='Longitude:'>
                <Input type={'number'}
                       placeholder='Longitude...'
                       value={this.state.modalDeviceLongitude}
                       onChange={this.onModalDeviceLongitudeChange}/>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label='Latitude:'>
                <Input type={'number'}
                       placeholder='Latitude...'
                       value={this.state.modalDeviceLatitude}
                       onChange={this.onModalDeviceLatitudeChange}/>
            </Form.Item>

            <DeviceLocationPickerComponent appLayout={this.props.appLayout}
                                           currentDeviceId={this.state.editDeviceId}
                                           devices={this.props.devices}
                                           currentLocation={{
                                               lng: this.state.modalDeviceLongitude || 0,
                                               lat: this.state.modalDeviceLatitude || 0,
                                           }}
                                           onLocationChange={this.onLocationChange}/>
        </Form>;

        return (
            <div style={{ padding: '0 15px' }}>
                <LoaderComponent visible={this.state.showLoader} isPageLoader={true}/>
                <CrudTableComponent
                    columns={devicesTableColumns}
                    data={this.props.devices}
                    onItemAdd={this.onDeviceAdd}
                    onItemEdit={this.onDeviceEdit}
                    onItemRemove={this.onDeviceRemove}
                    addBtnText={'New Device'}
                    helperText={'Fields are editable by clicking on the cells'}
                    customActions={[{ title: 'Edit', handler: this.onOpenDeviceEditModal }]}/>
                <Modal title='New Device'
                       width={800}
                       visible={this.state.showNewDeviceModal}
                       onOk={this.onDeviceSave}
                       okButtonProps={this.getModalDeviceModalOkBtnProps()}
                       onCancel={this.onModalCancel}
                       okText={'Add'}
                       cancelText={'Cancel'}
                       closable={true}
                       destroyOnClose={true}>{getModalForm(this.onDeviceSave)}</Modal>

                <Modal title={`Edit Device ${this.state.modalDeviceName}`}
                       width={800}
                       visible={this.state.showEditDeviceLocationModal}
                       onOk={this.onEditDeviceSave}
                       okButtonProps={this.getModalDeviceModalOkBtnProps()}
                       onCancel={this.onModalCancel}
                       okText={'Update'}
                       cancelText={'Cancel'}
                       closable={true}
                       destroyOnClose={true}>{getModalForm(this.onEditDeviceSave)}</Modal>
            </div>

        );
    }
}

DevicesComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    getDevicesAction: PropTypes.func.isRequired,
    addDeviceAction: PropTypes.func.isRequired,
    removeDeviceAction: PropTypes.func.isRequired,
    updateDeviceAction: PropTypes.func.isRequired,
};
