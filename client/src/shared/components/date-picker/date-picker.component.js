import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import './date-picker.component.scss';
import { DatePicker } from 'antd';
import { AppLayoutModel } from '../../models/AppLayoutModel';
import { TimeZonePickerComponent } from '../time-zone-picker/time-zone-picker.component';
import { dateStringFormat, hourStringFormat } from '../../../core/constants/date-constants';

export class DatePickerComponent extends React.Component {
    state = {
        from: null,
        to: null,
        timezoneOffset: moment().utcOffset(),
    };

    setStateFromParent(props) {
        if (props.value) {
            this.setState({
                from: props.value.from,
                to: props.value.to,
                timezoneOffset: Number.isFinite(props.value.timezoneOffset) ? props.value.timezoneOffset : moment().utcOffset(),
            });
        }
    }

    onDateTimeRangeChange = (date, dateString) => {
        this.setState({
            from: dateString[0],
            to: dateString[1],
            timezoneOffset: this.state.timezoneOffset
        });
    };

    onCancel = (isOpening) => {
        if (!isOpening) {
            this.setState({
                from: this.props.value ? this.props.value.from : null,
                to: this.props.value ? this.props.value.to : null,
                timezoneOffset: (this.props.value && Number.isFinite(this.props.value.timezoneOffset)) ? this.props.value.timezoneOffset : moment().utcOffset(),
            });
        }
    };

    onDateTimeRangeOk = (date) => {
        this.props.onDateChange({
            from: date[0].format(dateStringFormat),
            to: date[1].format(dateStringFormat),
            timezoneOffset: this.state.timezoneOffset
        });
    };

    onTimeZoneOffsetChange = (newOffset) => {
        this.props.onDateChange({
            from: this.state.from,
            to: this.state.to,
            timezoneOffset: newOffset
        });
    };

    componentDidMount() {
        this.setStateFromParent(this.props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value) {
            if (this.props.value && (prevProps.value.from !== this.props.value.from || prevProps.value.to !== this.props.value.to || prevProps.value.timezoneOffset !== this.props.value.timezoneOffset)) {
                this.setStateFromParent(this.props);
            }
        } else {
            this.setStateFromParent(this.props);
        }
    }

    render() {
        const currentRange = this.state.from ? [moment(this.state.from), moment(this.state.to)] : [];


        return (
            <div>
                <DatePicker.RangePicker
                    onOpenChange={this.onCancel}
                    allowClear={false}
                    value={currentRange}
                    showTime={{
                        minuteStep: 15,
                        format: hourStringFormat,
                        defaultValue: [moment('00:00', hourStringFormat), moment('23:59', hourStringFormat)],
                    }}
                    format={dateStringFormat}
                    placeholder={['Start Time', 'End Time']}
                    onChange={this.onDateTimeRangeChange}
                    onOk={this.onDateTimeRangeOk}
                />

                {this.props.value ?
                    <TimeZonePickerComponent onTimezoneChange={this.onTimeZoneOffsetChange}
                                             offsetInMinutes={this.props.value.timezoneOffset}/>
                    : ''
                }
            </div>
        );
    }
}

DatePickerComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    value: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        timezoneOffset: PropTypes.number.isRequired
    }),
    onDateChange: PropTypes.func.isRequired,
};

