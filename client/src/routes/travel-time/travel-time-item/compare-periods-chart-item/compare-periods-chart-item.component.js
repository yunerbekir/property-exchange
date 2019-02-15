import React from 'react';
import PropTypes from 'prop-types';
import './compare-periods-chart-item.component.scss';
import { TravelTimeComparePeriodsChartModel } from '../../../../shared/models/TravelTimeComparePeriodsChartModel';
import { DeviceModel } from '../../../../shared/models/DeviceModel';
import { TravelTimeComparePeriodsChartDataModel } from '../../../../shared/models/TravelTimeComparePeriodsChartDataModel';
import {
    Crosshair,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';
import moment from 'moment';
import { Button, Select, Popconfirm } from 'antd';
import { ComparePeriodsChartItemDatePickerComponent } from './compare-periods-chart-item-date-picker/compare-periods-chart-item-date-picker.component';
import { hourStringFormat } from '../../../../core/constants/date-constants';
import { LoaderComponent } from '../../../../shared';
import { TravelTimeModel } from '../../../../shared/models/TravelTimeModel';


const gridDashedStyle = { strokeDasharray: '5, 5', opacity: 0.7 };

const dataColors = [
    '#ed1e79',
    '#ff8330',
    '#ffd635',
    '#83c937',
    '#3fa9f5',
    '#7073FF',
    '#C561FF',
    '#FF61C8',
    'purple',
    'red',
    'volcano',
    'geekblue',
    'orange',
    'lime',
    'gold',
    'green',
    'cyan',
    'blue',
    'magenta',
];

export class ComparePeriodsChartItemComponent extends React.Component {
    _ismounted = false;

    state = {
        nearestX: null,
        crossHairValues: [],
        newStartDateValue: null,
        showLoader: false,
        disabledLineSeries: [],
        lineCurveType: '',
        isFullScreen: false,
    };

    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.openEditForm = this.openEditForm.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.getData = this.getData.bind(this);
        this.renderLineSeries = this.renderLineSeries.bind(this);
        this.onPlotMouseLeave = this.onPlotMouseLeave.bind(this);
        this.onNearestXAreaSeries = this.onNearestXAreaSeries.bind(this);
        this.onNewStartDatePickerClose = this.onNewStartDatePickerClose.bind(this);
        this.xAxisTickFormat = this.xAxisTickFormat.bind(this);
        this.xAxisTickValues = this.xAxisTickValues.bind(this);
        this.onToggleComparePeriod = this.onToggleComparePeriod.bind(this);
        this.onLineCurveTypeChange = this.onLineCurveTypeChange.bind(this);
    }

    onRemove() {
        this.props.onRemoveTravelTimeComparePeriodsChart(this.props.travelTime.id, this.props.comparePeriodsChart.id);
    }

    openEditForm() {
        this.props.onEditTravelTimeComparePeriodFormOpen(this.props.comparePeriodsChart);
    }

    toggleFullScreen() {
        this.setState((prevState) => ({ isFullScreen: !prevState.isFullScreen }));
    }

    getData() {
        if (this.props.originDevice && this.props.destinationDevice) {
            this.setState(
                { showLoader: true },
                () => this.props.getDataMethod({
                    chartId: this.props.comparePeriodsChart.id,
                    originDeviceId: this.props.originDevice.id,
                    destinationDeviceId: this.props.destinationDevice.id
                }).then(() => {
                    if (this._ismounted) {
                        this.setState({ showLoader: false });
                    }
                }));
        }
    }

    onPlotMouseLeave() {
        this.setState({
            nearestX: null,
            crossHairValues: []
        });
    }

    onNearestXAreaSeries(value, { index }) {
        if (this.props.chartData) {
            const crossHairValues = this.props.comparePeriodsChart.startDates.map(startPeriod => {
                const isLineDisabled = this.state.disabledLineSeries.some(date => date === startPeriod);

                let yValue;
                try {
                    yValue = this.props.chartData.data[startPeriod][index].y;
                } catch (e) {
                    yValue = 0;
                }

                return {
                    x: value.x,
                    y: yValue,
                    name: moment(startPeriod).add(value.x, 'minutes').format('ddd MM/DD HH:mm'),
                    display: isLineDisabled ? 'none' : 'flex'
                };
            });

            this.setState({
                nearestX: value.x,
                crossHairValues: crossHairValues
            });
        }
    }

    onNewStartDatePickerClose() {
        this.setState({
            newStartDateValue: null
        });
    }

    renderLineSeries() {
        if (!this.props.chartData) {
            return null;
        }

        return this.props.comparePeriodsChart.startDates.map((startDate, idx) => {
            let currentSeriesData = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
            if (this.props.chartData && this.props.chartData.data[startDate]) {
                currentSeriesData = this.props.chartData.data[startDate];
            }

            const laneData = currentSeriesData.map(({ x, y }) => ({
                y,
                x: moment.duration(moment(x).diff(startDate)).asMinutes(),
            }));
            const isLineDisabled = this.state.disabledLineSeries.some(date => date === startDate);
            const lineMarkSeriesOpacity = isLineDisabled ? 0 : 1;
            const lineSeriesOpacity = isLineDisabled ? 0 : 0.2;

            return [
                <LineMarkSeries
                    curve={this.state.lineCurveType}
                    size={1}
                    getNull={d => d.y !== 0}
                    key={idx}
                    color={dataColors[idx]}
                    opacity={lineMarkSeriesOpacity}
                    data={laneData}
                    onNearestX={this.onNearestXAreaSeries}/>,
                !this.state.lineCurveType ?
                    <LineSeries
                        key={`notFilteredLane - ${idx}`}
                        opacity={lineSeriesOpacity}
                        color={dataColors[idx]}
                        data={laneData.filter(({ y }) => y !== 0)}
                    /> : null
            ];
        });
    }

    onToggleComparePeriod(startDate) {
        this.setState((prevState) => {
            const disabledLineSeries = prevState.disabledLineSeries;
            const startDateIndex = disabledLineSeries.findIndex(date => date === startDate);
            startDateIndex > -1 ? disabledLineSeries.splice(startDateIndex, 1) : disabledLineSeries.push(startDate);

            return disabledLineSeries;
        });
    }

    onLineCurveTypeChange(value) {
        this.setState({
            lineCurveType: value
        });
    }

    xAxisTickFormat(v, idx) {
        if (this.props.containerWidth < 700 && idx % 2 === 0) {
            return '';
        }

        const timeFormat = this.props.comparePeriodsChart.durationInMinutes > 24 * 60 ? '(d) HH:mm' : hourStringFormat;

        const firstStartDate = this.props.comparePeriodsChart.startDates[0];
        const hasOneDifferentStartTime = this.props.comparePeriodsChart.startDates.find((possibleDifferentStartDate) => {
            return moment(firstStartDate).format(hourStringFormat) !== moment(possibleDifferentStartDate).format(hourStringFormat);
        });

        if (!hasOneDifferentStartTime) {
            const hoursFromMidnight = moment(firstStartDate).diff(moment(firstStartDate).startOf('day'));

            return moment(firstStartDate).startOf('week').add(hoursFromMidnight).add(v, 'minutes').format(timeFormat);
        }

        return moment().startOf('week').add(v, 'minutes').format(timeFormat);
    }

    xAxisTickValues() {
        const ticks = [0];

        let tickStepInMinutes = 15;
        if (this.props.comparePeriodsChart.durationInMinutes <= 4 * 60) {
            tickStepInMinutes = 15;
        } else if (this.props.comparePeriodsChart.durationInMinutes <= 8 * 60) {
            tickStepInMinutes = 30;
        } else if (this.props.comparePeriodsChart.durationInMinutes <= 24 * 60) {
            tickStepInMinutes = 60;
        } else if (this.props.comparePeriodsChart.durationInMinutes <= 2 * 24 * 60) {
            tickStepInMinutes = 6 * 60;
        } else if (this.props.comparePeriodsChart.durationInMinutes <= 4 * 24 * 60) {
            tickStepInMinutes = 12 * 60;
        } else if (this.props.comparePeriodsChart.durationInMinutes <= 31 * 24 * 60) {
            tickStepInMinutes = 24 * 60;
        } else {
            tickStepInMinutes = 2 * 24 * 60;
        }

        for (let i = 0; i < this.props.comparePeriodsChart.durationInMinutes / tickStepInMinutes; i++) {
            ticks.push(tickStepInMinutes * i);
        }

        ticks.push(this.props.comparePeriodsChart.durationInMinutes);

        return ticks;
    }

    componentDidUpdate(prevProps) {
        if (this.props.originDevice && !prevProps.originDevice &&
            this.props.destinationDevice && !prevProps.destinationDevice) {
            this.getData();
        }
        else if ((this.props.originDevice && this.props.originDevice.id !== prevProps.originDevice.id) ||
            (this.props.destinationDevice && this.props.destinationDevice.id !== prevProps.destinationDevice.id) ||
            this.props.comparePeriodsChart.durationInMinutes !== prevProps.comparePeriodsChart.durationInMinutes ||
            this.props.comparePeriodsChart.startDates !== prevProps.comparePeriodsChart.startDates ||
            this.props.comparePeriodsChart.timezoneOffsetInMinutes !== prevProps.comparePeriodsChart.timezoneOffsetInMinutes) {
            this.getData();
        }
        else if (this.props.travelTime.percentile !== prevProps.travelTime.percentile || this.props.travelTime.algorithmId !== prevProps.travelTime.algorithmId) {
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        const loaderStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            margin: 'auto',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            background: 'rgba(255,255,255,0.8)'
        };

        const { isFullScreen } = this.state;
        const chartTitleHeight = 52;
        const chartFooterHeight = 43;
        let plotHeight = 200;
        let plotWidth = this.props.containerWidth - 20 || 300;
        let fullScreenClassName = '';

        if (isFullScreen) {
            plotHeight = window.innerHeight - chartTitleHeight - chartFooterHeight;
            plotWidth = window.innerWidth;
            fullScreenClassName = 'full-screen';
        }

        return (
            <div className={`compare-chart-container ${fullScreenClassName}`}>
                <div className={'compare-chart-title'}>
                    <div className={'compare-chart-name'}>
                        {this.props.comparePeriodsChart.name}
                        <span className={'compare-chart-devices'}>({
                            this.props.originDevice ?
                                `${this.props.originDevice.name} - ${this.props.destinationDevice.name}` : 'Not selected origin - destination'
                        })
                        </span>
                    </div>
                    <div className={'actions-container'}>
                        <Select defaultValue={this.state.lineCurveType} style={{ width: 120 }}
                                onChange={this.onLineCurveTypeChange}>
                            <Select.Option value=''>Linear</Select.Option>
                            <Select.Option value='curveMonotoneX'>Curved</Select.Option>
                            <Select.Option value='curveBasis'>Approximate</Select.Option>
                            <Select.Option value='curveStepAfter'>Step Chart</Select.Option>
                        </Select>
                        <Button style={{ visibility: this.props.originDevice ? 'visible' : 'hidden' }}
                                size={'small'}
                                shape='circle' icon={isFullScreen ? 'shrink' : 'arrows-alt'}
                                onClick={this.toggleFullScreen}
                                title='Full Screen'/>
                        <Button size={'small'} type='warning' shape='circle' icon='edit' onClick={this.openEditForm}
                                title='Edit'/>
                        <Popconfirm title='Sure to delete?' placement={isFullScreen ? 'bottomRight' : 'topRight'}
                                    onConfirm={() => this.onRemove()}>
                            <Button size={'small'} type='danger' shape='circle' icon='close' title='Delete'/>
                        </Popconfirm>
                    </div>
                </div>
                <div className={'xy-plot-container'} style={{ height: this.props.originDevice ? plotHeight : 0 }}>
                    <XYPlot width={plotWidth} height={plotHeight}
                            yBaseValue={1}
                            onMouseLeave={this.onPlotMouseLeave}
                    >
                        <VerticalGridLines style={gridDashedStyle}/>
                        <HorizontalGridLines style={gridDashedStyle}/>
                        <XAxis tickValues={this.xAxisTickValues()} tickFormat={this.xAxisTickFormat}
                               tickLabelAngle={-40}
                               title='Period Length'/>
                        {this.renderLineSeries()}
                        <YAxis title='Travel Time (s)'/>
                        {this.state.nearestX !== null ? <Crosshair values={this.state.crossHairValues}>
                                <div className={'crosshair-values-container'}>
                                    {this.state.crossHairValues.map(({ name, y, display }, idx) => {
                                        return <div key={idx} style={{ display: display }}>
                                            <div className={'crosshair-item-name-container'}>{name}</div>
                                            <div style={{ borderLeftColor: dataColors[idx] }} className={'triangle'}/>
                                            <span className={'value-container'}>{y}</span>
                                        </div>;
                                    })}
                                </div>
                            </Crosshair>
                            : null}
                    </XYPlot>
                    {(this.state.showLoader) ? <LoaderComponent style={loaderStyle} visible={true}/> : null}
                </div>
                <div className={'compare-chart-footer'}>
                    <div>
                        {this.props.comparePeriodsChart.startDates.map((startDate, idx) => {
                            const isLineDisabled = this.state.disabledLineSeries.some(date => date === startDate);
                            const color = isLineDisabled ? 'grey' : dataColors[idx];
                            return <ComparePeriodsChartItemDatePickerComponent key={idx}
                                                                               color={color}
                                                                               startDate={startDate}
                                                                               durationInMinutes={this.props.comparePeriodsChart.durationInMinutes}
                                                                               timezoneOffsetInMinutes={this.props.comparePeriodsChart.timezoneOffsetInMinutes}
                                                                               onToggleComparePeriod={this.onToggleComparePeriod}
                            />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

ComparePeriodsChartItemComponent.propTypes = {
    containerWidth: PropTypes.number,
    chartData: PropTypes.instanceOf(TravelTimeComparePeriodsChartDataModel),
    travelTime: PropTypes.instanceOf(TravelTimeModel).isRequired,
    originDevice: PropTypes.instanceOf(DeviceModel),
    destinationDevice: PropTypes.instanceOf(DeviceModel),
    comparePeriodsChart: PropTypes.instanceOf(TravelTimeComparePeriodsChartModel).isRequired,
    onRemoveTravelTimeComparePeriodsChart: PropTypes.func.isRequired,
    onUpdateTravelTimeComparePeriodsChart: PropTypes.func.isRequired,
    onEditTravelTimeComparePeriodFormOpen: PropTypes.func.isRequired,
    getDataMethod: PropTypes.func.isRequired,
};
