import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Dropdown, Icon, InputNumber, Menu, Popover, Switch, Table, Alert } from 'antd';
import './travel-time-item.component.scss';
import { TravelTimeModel } from '../../../shared/models/TravelTimeModel';
import { TravelTimesDataModel } from '../../../shared/models/TravelTimesDataModel';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { Resizable } from 'react-resizable';
import { LoaderComponent } from '../../../shared';
import { getColorBetween } from '../../../core';
import * as moment from 'moment';
import { RealtimePeriodPickerComponent } from '../../../shared/components/realtime-period-picker/realtime-period-picker.component';
import { TravelTimeComparePeriodsChartModel } from '../../../shared/models/TravelTimeComparePeriodsChartModel';
import { ComparePeriodsChartItemComponent } from './compare-periods-chart-item/compare-periods-chart-item.component';
import { TravelTimeComparePeriodsChartDataModel } from '../../../shared/models/TravelTimeComparePeriodsChartDataModel';
import { dateStringFormat } from '../../../core/constants/date-constants';

const TravelTimeTableTitleComponent = (props) => {
    const { onResize, width, children, prefix, ...restProps } = props;

    if (!width) {
        return <th {...restProps}>{prefix ? <span className={'table-prefix'}>{prefix}&nbsp;</span> : ''}{children}</th>;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} title={props.title}
                className={'travel-time-item-table-cell'}>{prefix ?
                <span className={'table-prefix'}>{prefix}&nbsp;</span> : ''}{children}</th>
        </Resizable>
    );
};

const TwoDevicesCellComponent = (props) => {
    const greenColor = '#5d9732';
    const redColor = '#f5222d';

    const {
        customClass, title, children, prefix, visibleTableCellPopOver, onPopOverClose, minTravelTimeValue,
        maxTravelTimeValue, editTableCellTravelTimeRanges, onTableCellTravelTimeRangeValuesChange, travelTimeValue, className, ...restProps
    } = props;


    const min = editTableCellTravelTimeRanges ? editTableCellTravelTimeRanges.minTravelTimeValue : 0;
    const max = editTableCellTravelTimeRanges ? editTableCellTravelTimeRanges.maxTravelTimeValue : 0;

    return (
        <td {...restProps} title={title} style={{
            color: minTravelTimeValue === 0 && maxTravelTimeValue === 0 ? 'initial' : getColorBetween(
                { minTravelTimeValue, maxTravelTimeValue },
                travelTimeValue)
        }}
            className={`travel-time-item-table-cell ${customClass || ''} ${className}`}>
            {prefix ? <span className={'table-prefix'}>{prefix}&nbsp;</span> : ''}
            {children}
            {maxTravelTimeValue !== 0 && travelTimeValue > maxTravelTimeValue ?
                <Icon style={{ marginLeft: '4px' }} type='warning' theme='filled'/> : ''}
            <Popover
                content={
                    <div>
                        <InputNumber style={{ background: greenColor, color: 'white' }}
                                     value={min}
                                     onChange={(val) => onTableCellTravelTimeRangeValuesChange({
                                         minTravelTimeValue: val,
                                         maxTravelTimeValue: max
                                     })}/>
                        <InputNumber style={{ background: redColor, color: 'white' }}
                                     value={max}
                                     onChange={(val) => onTableCellTravelTimeRangeValuesChange({
                                         minTravelTimeValue: min,
                                         maxTravelTimeValue: val
                                     })}/>
                        <Button onClick={onPopOverClose}>Save</Button>
                    </div>
                }
                title='Set expected travel time range'
                trigger='click'
                visible={visibleTableCellPopOver}
            />
        </td>
    );
};

export class TravelTimeItemComponent extends React.Component {
    _ismounted = false;
    dataFetchInterval;

    state = {
        columnWidths: {},
        showLoader: true,
        visibleTableCellPopOver: '',
        tableCellTravelTimeRanges: {},
        selectedOriginDeviceId: null,
        selectedDestinationDeviceId: null,
    };

    tableComponents = {
        // table: null,
        header: {
            // wrapper: null,
            // row: null,
            cell: TravelTimeTableTitleComponent,
        },
        body: {
            // wrapper: null,
            // row: null,
            cell: TwoDevicesCellComponent,
        }
    };

    getTravelTimeData = () => {
        const onGetDataSuccess = () => {
            if (this._ismounted) {
                this.setState({ showLoader: false });
            }
        };

        const setStateMethod = () => {
            this.setState(
                { showLoader: true },
                () => {
                    if (this.props.travelTime.params.showTravelTimeValues) {
                        return this.props.getTravelTimesDataAction(this.props.travelTime.id).then(onGetDataSuccess);
                    }

                    return this.props.getTravelTimesOriginDestinationPercentageDataAction(this.props.travelTime.id).then(onGetDataSuccess);
                }
            );
        };

        setStateMethod();

        if (this.dataFetchInterval) {
            clearTimeout(this.dataFetchInterval);
        }

        this.dataFetchInterval = setTimeout(() => {
            this.getTravelTimeData();
        }, 15 * 60 * 1000);
    };


    onResize = deviceId => (e, column) => {
        this.setState((prevState) => {
            const nextColumnsWidths = { ...prevState.columnWidths };
            nextColumnsWidths[deviceId] = nextColumnsWidths[deviceId] ? nextColumnsWidths[deviceId] + e.movementX : column.size.width;
            return { columnWidths: nextColumnsWidths };
        });
    };


    onDateRangeChange = (newDateRange) => {
        const updatedTravelTime = new TravelTimeModel({ ...this.props.travelTime, dateRange: newDateRange });
        updatedTravelTime.id = this.props.travelTime.id;

        this.setState(
            { showLoader: true },
            () => this.props.onUpdateTravelTime(updatedTravelTime).then(() => {
                this.getTravelTimeData();
            })
        );
    };

    onRealTimeResolutionPeriodInMinutesChange = (newPeriod) => {
        const updatedTravelTime = new TravelTimeModel({
            ...this.props.travelTime,
            realTimeResolutionPeriodInMinutes: newPeriod
        });
        updatedTravelTime.id = this.props.travelTime.id;

        this.setState(
            { showLoader: true },
            () => this.props.onUpdateTravelTime(updatedTravelTime).then(() => {
                this.getTravelTimeData();
            })
        );
    };

    onRealTimeOffsetInMinutesChange = (newOffset) => {
        const updatedTravelTime = new TravelTimeModel({
            ...this.props.travelTime,
            realTimeOffsetInMinutes: newOffset
        });
        updatedTravelTime.id = this.props.travelTime.id;

        this.setState(
            { showLoader: true },
            () => this.props.onUpdateTravelTime(updatedTravelTime).then(() => {
                this.getTravelTimeData();
            })
        );
    };

    onRemove = () => {
        this.props.onRemoveTravelTime(this.props.travelTime.id);
    };

    onDuplicate = () => {
        const duplicatedTravelTime = {
            ...this.props.travelTime,
            name: `Duplicate ${this.props.travelTime.name}`,
            params: {
                ...this.props.travelTime.params,
                visibleOnMap: false,
                addedOn: moment().valueOf(),
            }
        };

        this.props.addTravelTimeAction(duplicatedTravelTime).then((duplicatedTravelTimeResponse) => {
            if (duplicatedTravelTimeResponse && duplicatedTravelTimeResponse.payload && duplicatedTravelTimeResponse.payload.id) {
                this.props.comparePeriodsCharts.forEach((comparePeriodsChart) => {
                    this.props.onAddTravelTimeComparePeriodsChart(duplicatedTravelTimeResponse.payload.id, comparePeriodsChart);
                });
            }
        });
    };

    toggleDataType = () => {
        const updatedTravelTime = TravelTimeModel.clone({
            ...this.props.travelTime,
            params: {
                ...this.props.travelTime.params,
                showTravelTimeValues: !this.props.travelTime.params.showTravelTimeValues
            }
        });

        return this.props.onUpdateTravelTime(updatedTravelTime).then(() => {
            this.getTravelTimeData();
        });
    };

    onToggleViewOnMap = () => {
        if (!this.props.travelTime.params.visibleOnMap) {
            this.props.onFocusDevices(this.props.travelTime.devices);
        }

        const updatedTravelTime = TravelTimeModel.clone({
            ...this.props.travelTime,
            params: { ...this.props.travelTime.params, visibleOnMap: !this.props.travelTime.params.visibleOnMap }
        });

        return this.props.onUpdateTravelTime(updatedTravelTime);
    };

    openEditModal = () => {
        this.props.onEditTravelTime(this.props.travelTime);
    };

    openChartModal = () => {
        this.props.onOpenTravelTimeChart(this.props.travelTime);
    };

    editChartModal = (chart) => {
        this.props.onOpenTravelTimeChart(this.props.travelTime, chart);
    };

    onUpdateDevices = (newTravelTimeDevicesList) => {
        const updatedTravelTime = new TravelTimeModel({
            ...this.props.travelTime,
            devices: [...newTravelTimeDevicesList]
        });
        updatedTravelTime.id = this.props.travelTime.id;

        return this.props.onUpdateTravelTime(updatedTravelTime).then(() => {
            this.getTravelTimeData();
        });
    };

    onUpdateTravelTimeRanges = (travelTimeRange) => {
        const updatedTravelTime = TravelTimeModel.clone({
            ...this.props.travelTime,
            params: {
                ...this.props.travelTime.params,
                expectedTravelTimeRanges: {
                    ...this.props.travelTime.params.expectedTravelTimeRanges ? this.props.travelTime.params.expectedTravelTimeRanges : {},
                    ...travelTimeRange
                }
            }
        });

        return this.props.onUpdateTravelTime(updatedTravelTime);
    };

    isBigTable = () => {
        return this.props.containerWidth < this.getTableCalculatedWidth();
    };

    getTableWidth(key) {
        return this.props.containerWidth / 2 > this.props.appLayout[key] ? this.props.appLayout[key] : this.props.containerWidth / 2;
    }

    getTableCalculatedWidth = () => {
        return this.getTableWidth('originTableColumnWidth') + this.getTableWidth('tableColumnWidth') * (this.props.travelTime.devices.length);
    };

    focusAllDevices = () => {
        this.props.onFocusDevices(this.props.travelTime.devices);
    };

    preventCollapse = (e) => {
        e.stopPropagation();
    };

    convertArrayOfObjectsToCSV = ({ data }) => {
        if (!data || !data.length) {
            return null;
        }

        const columnDelimiter = ',';
        const lineDelimiter = '\n';

        const dataKeys = Object.keys(data[0]);

        let result = '';
        result += dataKeys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(tableRow => {
            const resultRowArray = dataKeys.map(tableCell => tableRow[tableCell]);

            result += resultRowArray.join(columnDelimiter);
            result += lineDelimiter;
        });

        return result;
    };

    downloadCSV = () => {
        let csvData = [];
        const header = `${ moment(this.state.from).format(dateStringFormat)} - ${moment(this.state.to).format(dateStringFormat)}`;
        this.props.travelTime.devices.map((originDeviceId, idx) => {
            const dataRow = {
                'Origin-Destination': this.props.devices.find(currentDevice => currentDevice.id === originDeviceId).name
            };

            this.props.travelTime.devices.forEach(destinationDeviceId => {
                const deviceName = this.props.devices.find(currentDevice => currentDevice.id === destinationDeviceId).name;
                const travelTimeDataKey = `${originDeviceId}__${destinationDeviceId}`;
                dataRow[deviceName] = this.props.travelTimeData && this.props.travelTimeData.data && this.props.travelTimeData.data[travelTimeDataKey] ?
                    this.props.travelTimeData.data[travelTimeDataKey] :
                    '';
            });

            return csvData.push(dataRow);
        });

        let csv = this.convertArrayOfObjectsToCSV({
            data: csvData
        });
        if (csv == null) {
            return;
        }

        const filename = `${this.props.travelTime.name}.csv`;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + header + '\n' + csv;
        }
        const data = encodeURI(csv);

        const link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    };

    componentDidMount() {
        this._ismounted = true;

        this.getTravelTimeData();

        if (this.props.travelTime.isNewlyAdded() && this.props.travelTime.devices.length > 0) {
            this.focusAllDevices();
        }
    }

    componentWillUnmount() {
        this._ismounted = false;
        if (this.dataFetchInterval) {
            clearTimeout(this.dataFetchInterval);
        }

        this.props.clearTravelTimesDataAction(this.props.travelTime.id);

        if (this.props.comparePeriodsCharts) {
            this.props.clearTravelTimeComparePeriodsChartDataAction(this.props.comparePeriodsCharts.map(chart => chart.id));
        }
    }

    renderCharts() {
        if (this.props.comparePeriodsCharts && this.props.comparePeriodsCharts.length) {
            const originDevice = this.props.devices.find(d => d.id === this.state.selectedOriginDeviceId);
            const destinationDevice = this.props.devices.find(d => d.id === this.state.selectedDestinationDeviceId);

            return this.props.comparePeriodsCharts.map(chart => (
                <ComparePeriodsChartItemComponent key={chart.id}
                                                  containerWidth={this.props.containerWidth - 60}
                                                  chartData={this.props.comparePeriodsChartsData[chart.id]}
                                                  travelTime={this.props.travelTime}
                                                  comparePeriodsChart={chart}
                                                  onRemoveTravelTimeComparePeriodsChart={this.props.onRemoveTravelTimeComparePeriodsChart}
                                                  onUpdateTravelTimeComparePeriodsChart={this.props.onUpdateTravelTimeComparePeriodsChart}
                                                  onEditTravelTimeComparePeriodFormOpen={this.editChartModal}
                                                  originDevice={originDevice}
                                                  destinationDevice={destinationDevice}
                                                  getDataMethod={this.props.getTravelTimeComparePeriodsChartDataAction}
                />));
        }

        return null;
    }

    render() {
        return (
            <Collapse bordered={false}
                      defaultActiveKey={[this.props.travelTime.isNewlyAdded()]}
                      className={`travel-time-item ${this.props.travelTime.params.visibleOnMap ? 'visible-on-map' : ''}`}>
                <Collapse.Panel
                    showArrow={false}
                    key={this.props.travelTime.id}
                    header={
                        <div className='travel-time-table-header'>
                            <div className={'travel-time-item-name-container'}>
                                <Icon className={'pie-chart-icon'} type='pie-chart'
                                      theme='outlined'/> {this.props.travelTime.name || 'Travel Time'}
                            </div>
                            <div className={'actions-container'} onClick={this.preventCollapse}>
                                <div className='travel-time-data-actions'>
                                    <Button onClick={this.toggleDataType}
                                            className={'data-type-btn'}
                                            type={this.props.travelTime.params.showTravelTimeValues ? '' : 'primary'}>
                                        {this.props.travelTime.params.showTravelTimeValues ? 'Travel TIme' : 'Origin - Destination'}
                                    </Button>

                                    <div className='travel-time-date-picker'>
                                        <RealtimePeriodPickerComponent
                                            realTimeResolutionPeriodInMinutes={this.props.travelTime.realTimeResolutionPeriodInMinutes}
                                            realTimeOffsetInMinutes={this.props.travelTime.realTimeOffsetInMinutes}
                                            onPeriodChange={this.onRealTimeResolutionPeriodInMinutesChange}
                                            onPeriodOffsetChange={this.onRealTimeOffsetInMinutesChange}
                                        />
                                    </div>
                                </div>

                                <Button type='primary' shape='circle' icon='environment' size='small'
                                        title='View Route' style={{ marginRight: '5px', padding: '0 4px' }}
                                        disabled={this.props.travelTime.devices.length === 0}
                                        onClick={this.focusAllDevices}/>
                                <Switch checkedChildren={<Icon type='compass' title='Hide Travel Time Display'/>}
                                        unCheckedChildren={<Icon type='close' title='Show Travel Time Display'/>}
                                        checked={this.props.travelTime.params.visibleOnMap}
                                        disabled={this.props.travelTime.devices.length === 0}
                                        onChange={this.onToggleViewOnMap}/>
                                <Dropdown overlay={<Menu>
                                    <Menu.Item key='1' onClick={this.openEditModal}>Edit</Menu.Item>
                                    <Menu.Item key='2' onClick={this.openChartModal}>Create comparison
                                        chart...</Menu.Item>
                                    <Menu.Divider/>
                                    <Menu.Item key='3' onClick={this.downloadCSV}>Export as CSV</Menu.Item>
                                    <Menu.Divider/>
                                    <Menu.Item key='4' onClick={this.onDuplicate}>Duplicate</Menu.Item>
                                    <Menu.Item key='5' onClick={this.onRemove}>Remove</Menu.Item>
                                </Menu>} trigger={['click']}>
                                    <Icon className={'cpointer'} type='ellipsis'
                                          style={{ fontSize: '24px', transform: 'rotate(90deg)' }}/>
                                </Dropdown>
                            </div>
                        </div>
                    }>
                    <div>
                        <Table
                            style={!this.isBigTable() ? { width: this.getTableCalculatedWidth(), margin: 'auto' } : {}}
                            className={`travel-time-item-table ${this.isBigTable() ? 'huge-table' : ''}`}
                            bordered
                            pagination={false}
                            components={this.tableComponents}
                            scroll={this.isBigTable() ? {
                                x: this.getTableCalculatedWidth(),
                                y: '700px'
                            } : {}}
                            columns={[
                                {
                                    title: <div className={'origin-destination-cell'}>
                                        <div>Origin</div>
                                        <div>Destination</div>
                                    </div>,
                                    dataIndex: 'origin',
                                    width: this.getTableWidth('originTableColumnWidth'),
                                    fixed: this.isBigTable() ? 'left' : '',
                                    onCell: column => {
                                        return ({
                                            title: column.origin,
                                            customClass: 'road-column',
                                            prefix: column.prefix,
                                        });
                                    },
                                    onHeaderCell: (column) => ({
                                        title: 'Origin - Destination',
                                    }),
                                },
                                ...this.props.travelTime.devices.map((deviceId, idx) => {
                                        const originDevice = this.props.devices.find(currentDevice => currentDevice.id === deviceId);
                                        const title = originDevice.name;
                                        return {
                                            title,
                                            key: deviceId,
                                            dataIndex: deviceId,
                                            onCell: column => {
                                                let expectedTravelTimeRange = (this.props.travelTime.params.expectedTravelTimeRanges && this.props.travelTime.params.expectedTravelTimeRanges[`${column.key} ${deviceId}`]) || {
                                                    minTravelTimeValue: 0,
                                                    maxTravelTimeValue: 0
                                                };

                                                return ({
                                                    travelTimeValue: this.props.travelTimeData && this.props.travelTimeData.data ? this.props.travelTimeData.data[`${column.key}__${deviceId}`] : 0,
                                                    minTravelTimeValue: expectedTravelTimeRange.minTravelTimeValue,
                                                    maxTravelTimeValue: expectedTravelTimeRange.maxTravelTimeValue,
                                                    editTableCellTravelTimeRanges: this.state.tableCellTravelTimeRanges,
                                                    visibleTableCellPopOver: this.state.visibleTableCellPopOver === `${column.key} ${deviceId}`,
                                                    className: deviceId === this.state.selectedDestinationDeviceId && column.key === this.state.selectedOriginDeviceId ? 'active-cell' : '',
                                                    onTableCellTravelTimeRangeValuesChange: (newRange) => this.setState({ tableCellTravelTimeRanges: newRange }),
                                                    onPopOverClose: () => {
                                                        this.onUpdateTravelTimeRanges({
                                                            [`${column.key} ${deviceId}`]: this.state.tableCellTravelTimeRanges
                                                        });

                                                        this.setState({
                                                            visibleTableCellPopOver: '',
                                                            tableCellTravelTimeRanges: {}
                                                        });
                                                    },
                                                    onClick: () => {
                                                        if (column.key !== deviceId) {
                                                            this.setState({
                                                                selectedOriginDeviceId: column.key,
                                                                selectedDestinationDeviceId: deviceId,
                                                            });
                                                        }

                                                        this.props.onFocusDevices([column.key, deviceId]);
                                                    },
                                                    onContextMenu: (e) => {
                                                        e.preventDefault();
                                                        if (column.key !== deviceId) {
                                                            this.setState({
                                                                visibleTableCellPopOver: `${column.key} ${deviceId}`,
                                                                tableCellTravelTimeRanges: this.props.travelTime.params.expectedTravelTimeRanges ?
                                                                    this.props.travelTime.params.expectedTravelTimeRanges[`${column.key} ${deviceId}`] : {}
                                                            });
                                                        }
                                                    }
                                                });
                                            },
                                            onHeaderCell: column => ({
                                                title,
                                                prefix: idx + 1,
                                            }),
                                            width: this.getTableWidth('tableColumnWidth'),
                                        };
                                    }
                                )]}
                            dataSource={
                                this.props.travelTime.devices.map((originDeviceId, idx) => {
                                    const dataRow = {
                                        key: originDeviceId,
                                        prefix: idx + 1,
                                        origin: this.props.devices.find(currentDevice => currentDevice.id === originDeviceId).name,
                                    };
                                    this.props.travelTime.devices.forEach(destinationDeviceId => {
                                        if (originDeviceId === destinationDeviceId) {
                                            dataRow[destinationDeviceId] = '';
                                            return;
                                        }

                                        if (this.state.showLoader) {
                                            dataRow[destinationDeviceId] = <LoaderComponent visible={true}/>;
                                            return;
                                        }

                                        const travelTimeDataKey = `${originDeviceId}__${destinationDeviceId}`;
                                        dataRow[destinationDeviceId] = this.props.travelTimeData && this.props.travelTimeData.data && this.props.travelTimeData.data[travelTimeDataKey] ?
                                            this.props.travelTimeData.data[travelTimeDataKey] :
                                            '';
                                    });
                                    return dataRow;
                                })
                            }

                        />
                        <Alert message={'Click on any origin-destination cell to display a travel time data chart'}
                               type='info' showIcon/>
                        <div>{this.renderCharts()}</div>
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }
}

TravelTimeItemComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    travelTime: PropTypes.instanceOf(TravelTimeModel).isRequired,
    comparePeriodsChartsData: PropTypes.objectOf(PropTypes.instanceOf(TravelTimeComparePeriodsChartDataModel)).isRequired,
    comparePeriodsCharts: PropTypes.arrayOf(PropTypes.instanceOf(TravelTimeComparePeriodsChartModel)),
    travelTimeData: PropTypes.instanceOf(TravelTimesDataModel),
    onUpdateTravelTime: PropTypes.func.isRequired,
    onRemoveTravelTime: PropTypes.func.isRequired,
    onEditTravelTime: PropTypes.func.isRequired,
    onOpenTravelTimeChart: PropTypes.func.isRequired,
    getTravelTimesDataAction: PropTypes.func.isRequired,
    getTravelTimesOriginDestinationPercentageDataAction: PropTypes.func.isRequired,
    getTravelTimeComparePeriodsChartDataAction: PropTypes.func.isRequired,
    addTravelTimeAction: PropTypes.func.isRequired,
    onFocusDevices: PropTypes.func.isRequired,
    containerWidth: PropTypes.any,
    onAddTravelTimeComparePeriodsChart: PropTypes.func.isRequired,
    onRemoveTravelTimeComparePeriodsChart: PropTypes.func.isRequired,
    onUpdateTravelTimeComparePeriodsChart: PropTypes.func.isRequired,
    clearTravelTimesDataAction: PropTypes.func.isRequired,
    clearTravelTimeComparePeriodsChartDataAction: PropTypes.func.isRequired,
};

