import React from 'react';
import { Form, Button, InputNumber, Col, Row, } from 'antd';

import './default-params.component.scss';
import PropTypes from 'prop-types';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import { MapSettingsComponent } from './map-settings.component';
import { DeviceModel } from '../../../shared/models/DeviceModel';

export class DefaultParamsComponent extends React.Component {
    state = {
        tableColumnWidth: 200,
        originTableColumnWidth: 200,
        currentTheme: 'Theme Day',
        deploymentInfo: '',
        mapSettings: {
            imageBounds: [[0, 0], [10, 10]],
            mapImage: '',
            lat: 0,
            lng: 0,
            zoom: 1,
            selectedTileIdx: 0,
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const updatedAppLayoutSettings = AppLayoutModel.clone({
            selectedThemeIdx: this.props.appLayout.getThemes().indexOf(this.state.currentTheme),
            mapSettings: { ...this.state.mapSettings },
            originTableColumnWidth: this.state.originTableColumnWidth,
            tableColumnWidth: this.state.tableColumnWidth,
            deploymentInfo: this.state.deploymentInfo,
        });

        this.props.updateAppLayoutSettingsAction(updatedAppLayoutSettings);
    };

    onThemeChange = (currentTheme) => {
        this.setState({ currentTheme });
    };

    onMapSettingsChange = (newMapSettings) => {
        this.setState({ mapSettings: newMapSettings });
    };

    onTableColumnWidthChange = (newValue) => {
        this.setState({ tableColumnWidth: newValue });
    };

    onDeploymentInfoChange = (e) => {
        this.setState({ deploymentInfo: e.target.value });
    };

    onOriginTableColumnWidthChange = (newValue) => {
        this.setState({ originTableColumnWidth: newValue });
    };

    componentDidMount() {
        this.props.getAppLayoutSettingsAction();
        this.props.getDevicesAction();

        this.setState({
            currentTheme: this.props.appLayout.getSelectedTheme(),
            mapSettings: this.props.appLayout.mapSettings,
            tableColumnWidth: this.props.appLayout.tableColumnWidth,
            deploymentInfo: this.props.appLayout.deploymentInfo,
            originTableColumnWidth: this.props.appLayout.originTableColumnWidth,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.appLayout !== this.props.appLayout) {
            this.setState({
                currentTheme: this.props.appLayout.getSelectedTheme(),
                mapSettings: this.props.appLayout.mapSettings,
                tableColumnWidth: this.props.appLayout.tableColumnWidth,
                deploymentInfo: this.props.appLayout.deploymentInfo,
                originTableColumnWidth: this.props.appLayout.originTableColumnWidth,
            });
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} style={{ padding: '0 15px' }}>
                <Row className={'inline-form-items'}>
                    <Col span={14} offset={5}>
                        <MapSettingsComponent appLayout={this.props.appLayout}
                                              devices={this.props.devices}
                                              currentMapSettings={this.state.mapSettings}
                                              onMapSettingsChange={this.onMapSettingsChange}/>
                    </Col>
                </Row>
                <Row className={'inline-form-items'}>
                    <Col span={14} offset={5}>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 22 }}
                                wrapperCol={{ span: 22 }}
                                label='Origin Column Min Width:'>
                                <InputNumber min={20} max={window.innerWidth / 2}
                                             value={this.state.originTableColumnWidth}
                                             onChange={this.onOriginTableColumnWidthChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 22, offset: 1 }}
                                wrapperCol={{ span: 22, offset: 1 }}
                                label='Data Column Min Width:'>
                                <InputNumber min={20} max={window.innerWidth / 2}
                                             value={this.state.tableColumnWidth}
                                             onChange={this.onTableColumnWidthChange}/>
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row className={'inline-form-items'}>
                    <Col span={14} offset={5}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label='Deployment Info:'>
                                <textarea rows={3} className={'ant-input'}
                                          placeholder={`In|Time delivers precise travel – time data, helping you identify incidents and congestion as they occur along the transportation network. Do a roadway health check-up with In|Time now!`}
                                          style={{ resize: 'none', width: '100%' }} value={this.state.deploymentInfo}
                                          onChange={this.onDeploymentInfoChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    wrapperCol={{ span: 5, offset: 14 }}>
                    <Button style={{ width: '100%' }} type='primary' htmlType='submit'>Update</Button>
                </Form.Item>
            </Form>
        );
    }
}


DefaultParamsComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    getDevicesAction: PropTypes.func.isRequired,
    getAppLayoutSettingsAction: PropTypes.func.isRequired,
    updateAppLayoutSettingsAction: PropTypes.func.isRequired,
};
