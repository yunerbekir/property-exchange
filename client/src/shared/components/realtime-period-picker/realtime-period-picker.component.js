import React from 'react';
import PropTypes from 'prop-types';
import './realtime-period-picker.component.scss';
import { Button, Input, InputNumber, Popover, Radio, Select } from 'antd';

function getRealtimePeriodsMarkup() {
    const periods = [
        { key: 15, text: '15 Minutes' },
        { key: 30, text: '30 Minutes' },
        { key: 45, text: '45 Minutes' },
        { key: 60, text: 'One hour' },
        { key: 2 * 60, text: 'Two hours' },
        { key: 4 * 60, text: 'Four hours' },
        { key: 8 * 60, text: 'Eight hours' },
        { key: 12 * 60, text: '12 hours' },
        { key: 60 * 24, text: '24 Hours' },
    ];

    return periods.map(period => (<Select.Option key={period.key} value={period.key}>{period.text}</Select.Option>));
}

export class RealtimePeriodPickerComponent extends React.Component {
    state = {
        periodOffsetValue: null,
        periodOffsetType: null
    };

    constructor(props) {
        super(props);

        this.onResolutionPeriodChange = this.onResolutionPeriodChange.bind(this);
        this.onPeriodOffsetValueChange = this.onPeriodOffsetValueChange.bind(this);
        this.onPeriodOffsetTypeChange = this.onPeriodOffsetTypeChange.bind(this);
        this.onPopoverVisibilityChange = this.onPopoverVisibilityChange.bind(this);
    }

    onResolutionPeriodChange(newPeriod) {
        this.props.onPeriodChange(+newPeriod);
    }

    onPeriodOffsetValueChange(newPeriodOffsetValue) {
        if (newPeriodOffsetValue >= 0 && newPeriodOffsetValue <= 365 * 2) {
            this.setState({
                periodOffsetValue: newPeriodOffsetValue
            });
        }
    }

    onPeriodOffsetTypeChange(e) {
        this.setState({
            periodOffsetType: e.target.value
        });
    }

    onPopoverVisibilityChange(visible) {
        if (visible) {
            const offset = this.props.realTimeOffsetInMinutes ? this.props.realTimeOffsetInMinutes / 60 : 0;
            const isDayValue = offset % 24 === 0;

            this.setState({
                periodOffsetValue: isDayValue ? offset / 24 : offset,
                periodOffsetType: isDayValue ? 'days' : 'hours'
            });
        } else {
            const typeValue = this.state.periodOffsetType === 'days' ? 24 : 1;
            this.props.onPeriodOffsetChange(this.state.periodOffsetValue * 60 * typeValue);
        }
    }

    render() {
        const popoverContent = <Input.Group compact>
            <InputNumber min={0} max={365 * 2} value={this.state.periodOffsetValue}
                         onChange={this.onPeriodOffsetValueChange}/>
            <Radio.Group value={this.state.periodOffsetType} buttonStyle='solid'
                         onChange={this.onPeriodOffsetTypeChange}>
                <Radio.Button value='hours'>Hours</Radio.Button>
                <Radio.Button value='days'>Days</Radio.Button>
            </Radio.Group>
        </Input.Group>;


        let offsetValue = this.props.realTimeOffsetInMinutes ? this.props.realTimeOffsetInMinutes / 60 : 0;
        let offsetType = 'hours';
        if (offsetValue % 24 === 0) {
            offsetValue = offsetValue / 24;
            offsetType = 'days';
        }

        return (
            <div>
                <Select value={this.props.realTimeResolutionPeriodInMinutes}
                        onChange={this.onResolutionPeriodChange}
                        style={{ width: '110px' }}>
                    {getRealtimePeriodsMarkup()}
                </Select>
                <Popover placement='bottomRight' title={'Offset'} content={popoverContent} trigger='click'
                         onVisibleChange={this.onPopoverVisibilityChange}>
                    <Button style={{ width: '120px' }}>
                        Offset: {offsetValue ? `${offsetValue} ${offsetType}` : 'None'}
                    </Button>
                </Popover>
            </div>
        );
    }
}

RealtimePeriodPickerComponent.propTypes = {
    realTimeResolutionPeriodInMinutes: PropTypes.number,
    realTimeOffsetInMinutes: PropTypes.number,
    onPeriodChange: PropTypes.func.isRequired,
    onPeriodOffsetChange: PropTypes.func.isRequired,
};

