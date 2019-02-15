import React from 'react';
import PropTypes from 'prop-types';
import './compare-periods-chart-item-date-picker.component.scss';
import moment from 'moment';
import { dateWithDayOfWeekStringFormat } from '../../../../../core/constants/date-constants';
import { Tag } from 'antd';


export class ComparePeriodsChartItemDatePickerComponent extends React.Component {
    render() {
        const startDateString = moment(this.props.startDate).format(dateWithDayOfWeekStringFormat);
        const endDateString = moment(this.props.startDate).add(this.props.durationInMinutes, 'minutes').format(dateWithDayOfWeekStringFormat);

        const startDateStringParts = startDateString.split(' ');
        const endDateStringParts = endDateString.split(' ');

        let dateRangeString = '';

        // find dates parts with same text (period)
        for (let i = 0; i < startDateStringParts.length; i++) {
            if (startDateStringParts[i] === endDateStringParts[i]) {
                dateRangeString += ' ' + startDateStringParts[i];
            }
        }

        if (dateRangeString) {
            dateRangeString += ' (';
            //add start date different periods
            for (let i = 0; i < startDateStringParts.length; i++) {
                if (startDateStringParts[i] !== endDateStringParts[i]) {
                    dateRangeString += `${startDateStringParts[i]} `;
                }
            }

            dateRangeString += ' - ';

            //add end date different periods
            for (let i = 0; i < startDateStringParts.length; i++) {
                if (startDateStringParts[i] !== endDateStringParts[i]) {
                    dateRangeString += `${endDateStringParts[i]} `;
                }
            }

            dateRangeString = dateRangeString.substring(0, dateRangeString.length - 1);
            dateRangeString += ')';
        } else {
            dateRangeString = `${startDateString} - ${endDateString}`;
        }

        return (
            <div className={'compare-periods-chart-item-date'}>
                <Tag color={this.props.color} onClick={() => this.props.onToggleComparePeriod(this.props.startDate)}>
                    {dateRangeString}
                </Tag>
            </div>
        );
    }
}

ComparePeriodsChartItemDatePickerComponent.propTypes = {
    color: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    durationInMinutes: PropTypes.number.isRequired,
    timezoneOffsetInMinutes: PropTypes.number.isRequired,
    onToggleComparePeriod: PropTypes.func.isRequired,
};

