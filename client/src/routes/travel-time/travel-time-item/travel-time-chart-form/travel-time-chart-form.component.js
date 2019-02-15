import React from 'react';
import PropTypes from 'prop-types';
import './travel-time-chart-form.component.scss';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { AppLayoutModel } from '../../../../shared/models/AppLayoutModel';
import { DatePickerComponent } from '../../../../shared';
import * as moment from 'moment';
import { dateStringFormat, hourStringFormat } from '../../../../core/constants/date-constants';

const initialState = {
    isTravelTimeChartModalOpen: false,
    currentTravelTimeId: null,
    currentTravelTimeName: '',

    currentTravelTimeChartId: null,
    currentTravelTimeChartName: '',
    currentTravelTimeChartDateRange: null,
    currentTravelTimeStartDates: [],
};

export class TravelTimeChartFormComponent extends React.Component {
    state = { ...initialState };

    constructor(props) {
        super(props);

        this.onRemoveDateToCompare = this.onRemoveDateToCompare.bind(this);
        this.onAddDateToCompare = this.onAddDateToCompare.bind(this);
        this.onAddedDateToCompareChange = this.onAddedDateToCompareChange.bind(this);
    }

    openTravelTimeChartForm = ({ travelTime, chart }) => {
        if (chart) {
            this.setState({
                isTravelTimeChartModalOpen: true,
                currentTravelTimeId: travelTime.id,
                currentTravelTimeName: travelTime.name,

                currentTravelTimeChartId: chart.id,
                currentTravelTimeChartName: chart.name,
                currentTravelTimeChartDateRange: {
                    timezoneOffset: chart.timezoneOffsetInMinutes,
                    from: chart.startDates[0],
                    to: moment(chart.startDates[0]).add(chart.durationInMinutes, 'minutes').format(dateStringFormat)
                },
                currentTravelTimeStartDates: chart.startDates.filter((d, idx) => idx !== 0),
            });
        } else {
            this.setState({
                isTravelTimeChartModalOpen: true,
                currentTravelTimeId: travelTime.id,
                currentTravelTimeName: travelTime.name,
            });
        }
    };

    getTravelTimeModalOkBtnProps = () => {
        const defaultBtnProps = {
            form: 'travel-time-form',
            htmlType: 'submit',
            disabled: false,
            title: ''
        };

        const areRequiredFieldsEmpty = !this.state.currentTravelTimeChartName || !this.state.currentTravelTimeChartDateRange;

        if (areRequiredFieldsEmpty) {
            defaultBtnProps.disabled = true;
            defaultBtnProps.title = 'Not all fields are filled';
        } else {
            const datesToCompare = [this.state.currentTravelTimeChartDateRange.from, ...this.state.currentTravelTimeStartDates];
            const uniqueEntries = new Set(datesToCompare);

            if (datesToCompare.length !== uniqueEntries.size) {
                defaultBtnProps.disabled = true;
                defaultBtnProps.title = 'Comparison dates are not unique';
            }
        }

        return defaultBtnProps;
    };

    onCurrentTravelTimeChartNameChange = (e) => {
        this.setState({ currentTravelTimeChartName: e.target.value });
    };

    onCurrentTravelTimeChartDateRangeChange = (newDateRange) => {
        this.setState({ currentTravelTimeChartDateRange: newDateRange });
    };


    onRemoveDateToCompare(idx) {
        this.setState((prevState) => ({
            currentTravelTimeStartDates: prevState.currentTravelTimeStartDates.filter((currentDate, currentIndex) => idx !== currentIndex)
        }));
    }

    onAddDateToCompare() {
        this.setState((prevState) => ({
            currentTravelTimeStartDates: [...prevState.currentTravelTimeStartDates, moment().startOf('day').format(dateStringFormat)]
        }));
    }

    onAddedDateToCompareChange(idx, newDate) {
        this.setState((prevState) => ({
            currentTravelTimeStartDates: prevState.currentTravelTimeStartDates.map((currentDate, currentIndex) => idx === currentIndex ? newDate.format(dateStringFormat) : currentDate)
        }));
    }


    onCancel = () => {
        this.setState({ ...initialState });
    };

    onSave = (e) => {
        e.preventDefault();

        this.props.onSaveTravelTimeChartForm(
            this.state.currentTravelTimeId,
            {
                id: this.state.currentTravelTimeChartId,
                name: this.state.currentTravelTimeChartName,
                timezoneOffsetInMinutes: this.state.currentTravelTimeChartDateRange.timezoneOffset,
                durationInMinutes: moment.duration(moment(this.state.currentTravelTimeChartDateRange.to).diff(moment(this.state.currentTravelTimeChartDateRange.from))).asMinutes(),
                startDates: [this.state.currentTravelTimeChartDateRange.from, ...this.state.currentTravelTimeStartDates]
            })
            .then((result) => {
                if (result) {
                    this.setState({ ...initialState });
                }
            });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Modal
                destroyOnClose={true}
                className={'travel-time-form'}
                title={`Chart for: ${this.state.currentTravelTimeName}`}
                visible={this.state.isTravelTimeChartModalOpen}
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
                               value={this.state.currentTravelTimeChartName}
                               onChange={this.onCurrentTravelTimeChartNameChange}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='Initial Date Range:'>
                        <DatePickerComponent
                            appLayout={this.props.appLayout}
                            value={this.state.currentTravelTimeChartDateRange}
                            onDateChange={this.onCurrentTravelTimeChartDateRangeChange}/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label='Dates To Compare:'>
                        {
                            this.state.currentTravelTimeStartDates.map((startDate, idx) => (
                                <div key={idx}>
                                    <DatePicker
                                        allowClear={false}
                                        value={moment(startDate)}
                                        onChange={(newDate) => this.onAddedDateToCompareChange(idx, newDate)}
                                        showTime={{
                                            minuteStep: 15,
                                            format: hourStringFormat,
                                            defaultValue: moment('00:00', hourStringFormat),
                                        }}
                                        format={dateStringFormat}
                                        placeholder='New Period'
                                        onOk={(newDate) => this.onAddedDateToCompareChange(idx, newDate)}
                                    />
                                    <Button className={'date-to-compare-remove-btn'} size={'small'} type='danger'
                                            shape='circle' icon='close'
                                            onClick={() => this.onRemoveDateToCompare(idx)}/>
                                </div>))
                        }

                        <Button onClick={this.onAddDateToCompare}>Add new date</Button>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

TravelTimeChartFormComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    onSaveTravelTimeChartForm: PropTypes.func.isRequired,
};

