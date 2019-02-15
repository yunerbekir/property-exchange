import React from 'react';
import PropTypes from 'prop-types';
import './travel-time-form.component.scss';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { Button, Select, Form, Input, InputNumber, Modal } from 'antd';
import { DevicesPickerComponent } from '../../../shared/components/devices-picker/devices-picker.component';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { RealtimePeriodPickerComponent } from '../../../shared/components/realtime-period-picker/realtime-period-picker.component';
import * as moment from 'moment';

const initialState = {
    isTravelTimeModalOpen: false,
    currentTravelTimeId: null,
    currentTravelTimeName: '',
    currentTravelTimeDateRange: null,
    currentTravelTimeRealTimeResolutionPeriodInMinutes: null,
    currentTravelTimeRealTimeOffsetInMinutes: 0,
    currentTravelTimeDevicesList: [],
    currentTravelTimeParams: null,
    currentTravelTimePercentile: 80,
    currentTravelTimeAlgorithmId: 1,
};

export class TravelTimeFormComponent extends React.Component {
    state = {
        ...initialState
    };

    openTravelTimeForm = ({ travelTimeForEdit }) => {
        if (travelTimeForEdit) {
            this.setState({
                isTravelTimeModalOpen: true,
                currentTravelTimeId: travelTimeForEdit.id,
                currentTravelTimeName: travelTimeForEdit.name,
                currentTravelTimeDateRange: { ...travelTimeForEdit.dateRange },
                currentTravelTimeRealTimeResolutionPeriodInMinutes: travelTimeForEdit.realTimeResolutionPeriodInMinutes,
                currentTravelTimeRealTimeOffsetInMinutes: travelTimeForEdit.realTimeOffsetInMinutes,
                currentTravelTimeDevicesList: [...travelTimeForEdit.devices],
                currentTravelTimePercentile: travelTimeForEdit.percentile,
                currentTravelTimeAlgorithmId: travelTimeForEdit.algorithmId,
                currentTravelTimeParams: { ...travelTimeForEdit.params },
            });
        } else {
            this.setState({ isTravelTimeModalOpen: true });
        }
    };

    getTravelTimeModalOkBtnProps = () => {
        const areRequiredFieldsEmpty = !this.state.currentTravelTimeName || !(this.state.currentTravelTimeDateRange || this.state.currentTravelTimeRealTimeResolutionPeriodInMinutes) || this.state.currentTravelTimeDevicesList.length < 2;
        return {
            form: 'travel-time-form',
            htmlType: 'submit',
            disabled: areRequiredFieldsEmpty,
            title: areRequiredFieldsEmpty ? 'Not all fields are filled' : ''
        };
    };

    onCurrentTravelTimeNameChange = (e) => {
        this.setState({ currentTravelTimeName: e.target.value });
    };

    onCurrentTravelTimeDateRangeChange = (newDateRange) => {
        this.setState({ currentTravelTimeDateRange: newDateRange });
    };

    onCurrentTravelTimeRealTimeResolutionPeriodInMinutesChange = (newPeriod) => {
        this.setState({ currentTravelTimeRealTimeResolutionPeriodInMinutes: newPeriod });
    };

    onCurrentTravelTimeRealTimeOffsetInMinutesChange = (newOffset) => {
        this.setState({ currentTravelTimeRealTimeOffsetInMinutes: newOffset });
    };

    onCurrentTravelTimeDevicesListChange = (newDevicesList) => {
        this.setState({ currentTravelTimeDevicesList: newDevicesList });
    };

    onPercentileChange = (newPercentile) => {
        this.setState({ currentTravelTimePercentile: newPercentile });
    };

    onAlgorithmChange = (newAlgorithm) => {
        this.setState({ currentTravelTimeAlgorithmId: newAlgorithm });
    };

    onCancel = () => {
        this.setState({ ...initialState });
    };

    onSave = (e) => {
        e.preventDefault();

        this.props.onSaveTravelTimeForm({
            id: this.state.currentTravelTimeId,
            name: this.state.currentTravelTimeName,
            devices: this.state.currentTravelTimeDevicesList,
            dateRange: this.state.currentTravelTimeDateRange,
            realTimeResolutionPeriodInMinutes: this.state.currentTravelTimeRealTimeResolutionPeriodInMinutes,
            realTimeOffsetInMinutes: this.state.currentTravelTimeRealTimeOffsetInMinutes,
            percentile: this.state.currentTravelTimePercentile,
            algorithmId: this.state.currentTravelTimeAlgorithmId,
            params: this.state.currentTravelTimeParams || {
                visibleOnMap: true,
                addedOn: moment().valueOf(),
                expectedTravelTimeRanges: {},
            },
        }).then((result) => {
            if (result) {
                this.setState({ ...initialState });
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };

        return (
            <div>
                <Button type='primary' icon='plus-circle-o'
                        onClick={this.openTravelTimeForm}
                        style={this.props.btnStyle || {}}>
                    New Travel Time Route
                </Button>
                <Modal
                    destroyOnClose={true}
                    className={'travel-time-form'}
                    title='Travel Time Route'
                    visible={this.state.isTravelTimeModalOpen}
                    onOk={this.onSave}
                    okButtonProps={this.getTravelTimeModalOkBtnProps()}
                    onCancel={this.onCancel}
                    okText={'Save'}
                    cancelText={'Cancel'}
                    closable={true}>
                    <Form id={'travel-time-form'} onSubmit={this.onSave}>
                        <Form.Item
                            {...formItemLayout}
                            label='Name:'>
                            <Input autoFocus={true} placeholder='Name...'
                                   className={'name-input'}
                                   value={this.state.currentTravelTimeName}
                                   onChange={this.onCurrentTravelTimeNameChange}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label='Period:'>
                            <RealtimePeriodPickerComponent
                                realTimeResolutionPeriodInMinutes={this.state.currentTravelTimeRealTimeResolutionPeriodInMinutes}
                                onPeriodChange={this.onCurrentTravelTimeRealTimeResolutionPeriodInMinutesChange}
                                realTimeOffsetInMinutes={this.state.currentTravelTimeRealTimeOffsetInMinutes}
                                onPeriodOffsetChange={this.onCurrentTravelTimeRealTimeOffsetInMinutesChange}/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label='Algorithm:'>
                            <Input.Group compact>
                                <Input placeholder='Percentile:' disabled
                                       style={{ width: 100, pointerEvents: 'none', backgroundColor: '#fff' }}/>
                                <InputNumber min={1} max={100} value={this.state.currentTravelTimePercentile}
                                             onChange={this.onPercentileChange}/>
                                <Input placeholder='Type:' disabled
                                       style={{ width: 100, pointerEvents: 'none', backgroundColor: '#fff' }}/>
                                <Select value={this.state.currentTravelTimeAlgorithmId} style={{ width: 110 }}
                                        onChange={this.onAlgorithmChange}>
                                    <Select.Option value={1}>Clustering</Select.Option>
                                    <Select.Option value={2}>Percentile</Select.Option>
                                </Select>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label='Devices:'>
                            <DevicesPickerComponent
                                value={this.state.currentTravelTimeDevicesList}
                                appLayout={this.props.appLayout}
                                devices={this.props.devices}
                                onListChange={this.onCurrentTravelTimeDevicesListChange}
                                currentTravelTimeDevicesList={this.state.currentTravelTimeDevicesList}
                                currentMapSettings={this.props.currentMapSettings}
                                onMapSettingsChange={this.props.onMapSettingsChange}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

TravelTimeFormComponent.propTypes = {
    btnStyle: PropTypes.object,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    onSaveTravelTimeForm: PropTypes.func.isRequired,
    currentMapSettings: PropTypes.object.isRequired,
    onMapSettingsChange: PropTypes.func.isRequired,
};
