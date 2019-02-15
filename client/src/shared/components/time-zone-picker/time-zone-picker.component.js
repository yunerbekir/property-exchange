import React from 'react';
import PropTypes from 'prop-types';
import './time-zone-picker.component.scss';
import { Select } from 'antd';


function getZonesMarkup() {
    const hoursArray = ['-12:00', '-11:00', '-10:00', '-09:30', '-09:00', '-08:00', '-07:00', '-06:00', '-05:00', '-04:00', '-3:30', '-03:00', '-02:00', '-01:00',
        '+00:00', '+01:00', '+02:00', '+03:00', '+03:30', '+04:00', '+04:30', '+05:00', '+05:30', '+05:45', '+06:00', '+06:30', '+07:00', '+08:00',
        '+08:45', '+09:00', '+09:30', '+10:00', '+10:30', '+11:00', '+12:00', '+12:45', '+13:00', '+14:00'];

    return hoursArray.map(hour => (<Select.Option value={hour} key={hour}>UTC {hour}</Select.Option>));
}

function fromMinutesToString(minutes) {
    const hours = Math.floor(Math.abs(minutes / 60));
    const extractedMinutes = Math.abs(minutes % 60);

    return `${minutes < 0 ? '-' : '+'}${hours < 10 ? '0' : ''}${hours}:${extractedMinutes < 10 ? '0' : ''}${extractedMinutes}`;
}

export class TimeZonePickerComponent extends React.Component {
    onTimeZoneChange = (timeZoneString) => {
        const sign = timeZoneString[0] === '-' ? -1 : 1;
        const absTime = timeZoneString.substr(1, timeZoneString.length);
        const [hours, minutes] = absTime.split(':').map(t => +t);

        this.props.onTimezoneChange(sign * ((hours * 60) + minutes));
    };

    render() {
        return (
            <Select value={fromMinutesToString(this.props.offsetInMinutes)}
                    onChange={this.onTimeZoneChange}
                    style={{ width: '110px' }}>
                {getZonesMarkup()}
            </Select>
        );
    }
}

TimeZonePickerComponent.propTypes = {
    offsetInMinutes: PropTypes.number.isRequired,
    onTimezoneChange: PropTypes.func.isRequired,
};

