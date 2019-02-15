import React from 'react';
import PropTypes from 'prop-types';
import './travel-time.component.scss';
import { DeviceModel } from '../../shared/models/DeviceModel';
import { TravelTimeModel } from '../../shared/models/TravelTimeModel';
import { MapViewComponent } from './map-view/map-view.component';
import { Col, Row } from 'antd';
import { TravelTimeItemComponent } from './travel-time-item/travel-time-item.component';
import { AppLayoutModel } from '../../shared/models/AppLayoutModel';
import { ResizableBox } from 'react-resizable';
import { LoaderComponent } from '../../shared';
import { TravelTimeFormComponent } from './travel-time-form/travel-time-form.component';
import { TravelTimeChartFormComponent } from './travel-time-item/travel-time-chart-form/travel-time-chart-form.component';
import { TravelTimeComparePeriodsChartModel } from '../../shared/models/TravelTimeComparePeriodsChartModel';
import { TravelTimeComparePeriodsChartDataModel } from '../../shared/models/TravelTimeComparePeriodsChartDataModel';

export class TravelTimeComponent extends React.Component {
    mapViewRef = React.createRef();
    travelTimeFormRef = React.createRef();
    travelTimeChartFormRef = React.createRef();
    travelTimeListContainerRef = React.createRef();
    _ismounted = false;

    state = {
        showLoader: true,
        mapWidth: window.innerWidth / 2,
        mapSettings: {
            imageBounds: [[0, 0], [10, 10]],
            mapImage: '',
            lat: 0,
            lng: 0,
            zoom: 1,
            selectedTileIdx: 0,
        }
    };

    onMapResizeStop = (event, { element, size }) => {
        this.setState({
            mapWidth: size.width,
        }, () => {
            //this is needed to reload tiles according the new dimensions
            window.dispatchEvent(new Event('resize'));
        });
    };

    onSaveTravelTimeForm = (travelTimeJson) => {
        if (travelTimeJson.id) {
            const updatedTravelTime = new TravelTimeModel(travelTimeJson);
            updatedTravelTime.id = travelTimeJson.id;

            return this.props.updateTravelTimeAction(updatedTravelTime).then((result) => {
                if (result) {
                    this.props.getTravelTimesDataAction(updatedTravelTime.id);
                }

                return result;
            });
        } else {
            return this.props.addTravelTimeAction(travelTimeJson);
        }
    };

    onUpdateTravelTime = (updatedTravelTime) => {
        return this.props.updateTravelTimeAction(updatedTravelTime);
    };

    onEditTravelTime = (travelTimeForEdit) => {
        this.travelTimeFormRef.current.openTravelTimeForm({ travelTimeForEdit });
    };

    onOpenTravelTimeChart = (travelTime, chart) => {
        this.travelTimeChartFormRef.current.openTravelTimeChartForm({ travelTime, chart });
    };

    updateTravelTimeWithCharts = (travelTimeId, chartJson) => {
        if (chartJson.id) {
            const chart = new TravelTimeComparePeriodsChartModel(chartJson);
            chart.id = chartJson.id;

            return this.props.updateTravelTimeComparePeriodsChartAction(travelTimeId, chart);
        }

        return this.props.addTravelTimeComparePeriodsChartAction(travelTimeId, chartJson);
    };

    onRemoveTravelTime = (removedTravelTimeId) => {
        this.props.removeTravelTimeAction(removedTravelTimeId);
    };

    onFocusDevices = (deviceIds) => {
        if (!this.mapViewRef.current) {
            return;
        }

        this.mapViewRef.current.fitBounds(deviceIds);
    };

    onMapSettingsChange = (newMapSettings) => {
        this.setState({ mapSettings: newMapSettings });
    };

    componentDidMount() {
        this._ismounted = true;

        Promise.all([
            this.props.getDevicesAction(),
            this.props.getTravelTimesAction(),
            this.props.getTravelTimeComparePeriodsChartsAction(),
        ]).then(() => {
            if (this._ismounted) {
                this.setState({ showLoader: false });
            }
        });

        this.setState({ mapSettings: this.props.appLayout.mapSettings });
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        const resizableBoxHeight = window.innerHeight - 84;

        return (
            <LoaderComponent visible={this.state.showLoader} isPageLoader={true}>
                <Row className={'map-view-row'}>
                    <TravelTimeFormComponent appLayout={this.props.appLayout}
                                             ref={this.travelTimeFormRef}
                                             btnStyle={{
                                                 position: 'absolute',
                                                 zIndex: '500',
                                                 top: '12px',
                                                 right: '20px',
                                                 cursor: 'pointer'
                                             }}
                                             devices={this.props.devices}
                                             onSaveTravelTimeForm={this.onSaveTravelTimeForm}
                                             currentMapSettings={this.state.mapSettings}
                                             onMapSettingsChange={this.onMapSettingsChange}/>
                    <TravelTimeChartFormComponent ref={this.travelTimeChartFormRef}
                                                  appLayout={this.props.appLayout}
                                                  onSaveTravelTimeChartForm={this.updateTravelTimeWithCharts}/>
                    <div>
                        <ResizableBox className='map-view-resizable'
                                      onResizeStop={this.onMapResizeStop}
                                      height={resizableBoxHeight}
                                      width={this.state.mapWidth}
                                      maxConstraints={[window.innerWidth - 350, resizableBoxHeight]}
                                      axis='x'>
                            <MapViewComponent
                                ref={this.mapViewRef}
                                appLayout={this.props.appLayout}
                                travelTimes={this.props.travelTimes}
                                travelTimesData={this.props.travelTimesData}
                                devices={this.props.devices}
                                onVisibleTravelTimeOnMapChange={this.props.updateTravelTimeAction}/>
                        </ResizableBox>
                    </div>
                    <div className={'travel-time-list'} style={{ width: '100%' }}
                         ref={this.travelTimeListContainerRef}
                    >
                        {this.props.travelTimes.map(travelTime => <Col key={travelTime.id} span={24}>
                            <TravelTimeItemComponent appLayout={this.props.appLayout}
                                                     travelTime={travelTime}
                                                     travelTimeData={this.props.travelTimesData[travelTime.id]}
                                                     comparePeriodsCharts={this.props.travelTimeComparePeriodsCharts[travelTime.id]}
                                                     devices={this.props.devices}
                                                     onUpdateTravelTime={this.onUpdateTravelTime}
                                                     onRemoveTravelTime={this.onRemoveTravelTime}
                                                     onEditTravelTime={this.onEditTravelTime}
                                                     onOpenTravelTimeChart={this.onOpenTravelTimeChart}
                                                     getTravelTimesDataAction={this.props.getTravelTimesDataAction}
                                                     getTravelTimesOriginDestinationPercentageDataAction={this.props.getTravelTimesOriginDestinationPercentageDataAction}
                                                     getTravelTimeComparePeriodsChartDataAction={this.props.getTravelTimeComparePeriodsChartDataAction}
                                                     addTravelTimeAction={this.props.addTravelTimeAction}
                                                     onFocusDevices={this.onFocusDevices}
                                                     containerWidth={this.travelTimeListContainerRef.current ? this.travelTimeListContainerRef.current.clientWidth : window.innerWidth / 2}
                                                     onAddTravelTimeComparePeriodsChart={this.props.addTravelTimeComparePeriodsChartAction}
                                                     onRemoveTravelTimeComparePeriodsChart={this.props.removeTravelTimeComparePeriodsChartAction}
                                                     onUpdateTravelTimeComparePeriodsChart={this.props.updateTravelTimeComparePeriodsChartAction}
                                                     comparePeriodsChartsData={this.props.travelTimeComparePeriodsChartsData}
                                                     clearTravelTimesDataAction={this.props.clearTravelTimesDataAction}
                                                     clearTravelTimeComparePeriodsChartDataAction={this.props.clearTravelTimeComparePeriodsChartDataAction}/>
                        </Col>)}
                    </div>
                </Row>
            </LoaderComponent>
        );
    }
}

TravelTimeComponent.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    travelTimes: PropTypes.arrayOf(PropTypes.instanceOf(TravelTimeModel)).isRequired,
    travelTimeComparePeriodsCharts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.instanceOf(TravelTimeComparePeriodsChartModel))).isRequired,
    travelTimesData: PropTypes.object.isRequired,
    travelTimeComparePeriodsChartsData: PropTypes.objectOf(PropTypes.instanceOf(TravelTimeComparePeriodsChartDataModel)).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    addTravelTimeAction: PropTypes.func.isRequired,
    updateTravelTimeAction: PropTypes.func.isRequired,
    removeTravelTimeAction: PropTypes.func.isRequired,
    getTravelTimesAction: PropTypes.func.isRequired,
    addTravelTimeComparePeriodsChartAction: PropTypes.func.isRequired,
    updateTravelTimeComparePeriodsChartAction: PropTypes.func.isRequired,
    removeTravelTimeComparePeriodsChartAction: PropTypes.func.isRequired,
    getTravelTimeComparePeriodsChartsAction: PropTypes.func.isRequired,
    getDevicesAction: PropTypes.func.isRequired,
    getTravelTimesDataAction: PropTypes.func.isRequired,
    getTravelTimesOriginDestinationPercentageDataAction: PropTypes.func.isRequired,
    getTravelTimeComparePeriodsChartDataAction: PropTypes.func.isRequired,
    clearTravelTimesDataAction: PropTypes.func.isRequired,
    clearTravelTimeComparePeriodsChartDataAction: PropTypes.func.isRequired,
};

