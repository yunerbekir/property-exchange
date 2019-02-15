import * as React from 'react';
import PropTypes from 'prop-types';
import { ImageOverlay, Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Col, Dropdown, Icon, InputNumber, Input, Menu, Row, Form, Slider, Tag, } from 'antd';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';
import './default-params.component.scss';
import { DeviceModel } from '../../../shared/models/DeviceModel';
import { deviceIconNotInTravelTime } from '../../../shared/utils/default-device-marker.util';
import { MapButtonsComponent } from '../../../shared/components/map-components/map-buttons/map-buttons.component';

export class MapSettingsComponent extends React.Component {
    mapRef = React.createRef();

    state = {
        imageOpacity: 0.6,
    };

    getBoundsFromLatLng = (latLngObject) => {
        return [
            [latLngObject._northEast.lat, latLngObject._northEast.lng],
            [latLngObject._southWest.lat, latLngObject._southWest.lng],
        ];
    };

    onMapMoveEnd = (e) => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            ...e.sourceTarget.getCenter(),
            imageBounds: this.getBoundsFromLatLng(this.mapRef.current.leafletElement.getBounds())
        });
    };

    onMapZoomEnd = (e) => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            zoom: e.sourceTarget.getZoom(),
            imageBounds: this.getBoundsFromLatLng(this.mapRef.current.leafletElement.getBounds())
        });
    };

    selectTile = (idx) => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            selectedTileIdx: idx
        });
    };

    onLatitudeChange = value => {
        if (typeof value === 'number') {
            this.props.onMapSettingsChange({
                ...this.props.currentMapSettings,
                lat: +value
            });
        }

    };

    onLongitudeChange = value => {
        if (typeof value === 'number') {
            this.props.onMapSettingsChange({
                ...this.props.currentMapSettings,
                lng: +value
            });
        }
    };

    onZoomChange = value => {
        this.props.onMapSettingsChange({
            ...this.props.currentMapSettings,
            zoom: +value
        });
    };

    onFileUpload = (e) => {
        const input = e.target;
        const reader = new FileReader();
        reader.onload = () => {
            this.props.onMapSettingsChange({
                ...this.props.currentMapSettings,
                mapImage: reader.result,
                mapImageName: input.files[0].name,
            });
        };

        if (input.files && input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        } else {
            this.props.onMapSettingsChange({
                ...this.props.currentMapSettings,
                mapImage: null,
                mapImageName: ''
            });
        }
    };

    onMapImageOpacityChange = (value) => {
        this.setState({ imageOpacity: value });
    };

    render() {
        const position = [this.props.currentMapSettings.lat, this.props.currentMapSettings.lng];

        return (
            <div className={'map-settings-container'}>
                <MapButtonsComponent mapRef={this.mapRef} devices={this.props.devices}
                                     currentMapSettings={this.props.currentMapSettings}
                                     onMapSettingsChange={this.props.onMapSettingsChange}/>
                <Dropdown className='terrain-switcher-dropdown' trigger={['click']}
                          overlay={<Menu>
                              {this.props.appLayout.getTiles().map((tile, idx) => (
                                  <Menu.Item key={idx} onClick={() => this.selectTile(idx)}>
                                      {tile.name}
                                  </Menu.Item>))}
                          </Menu>}>
                    <Button title='Map Layers'><Icon type='database'/></Button>
                </Dropdown>

                <Map worldCopyJump={true} center={position} zoom={this.props.currentMapSettings.zoom}
                     style={{ height: '550px', width: '550px', float: 'left' }}
                     onMoveend={this.onMapMoveEnd}
                     onZoomend={this.onMapZoomEnd}
                     ref={this.mapRef}>
                    <TileLayer
                        url={this.props.appLayout.getTiles()[this.props.currentMapSettings.selectedTileIdx].value}/>
                    {this.props.currentMapSettings.mapImage ? <ImageOverlay url={this.props.currentMapSettings.mapImage}
                                                                            opacity={this.state.imageOpacity}
                                                                            bounds={this.props.currentMapSettings.imageBounds}/> : null}
                    {
                        this.props.devices.map(device => (
                            <Marker key={device.id} position={[device.latitude, device.longitude]} zIndexOffset={500}
                                    icon={deviceIconNotInTravelTime(this.mapRef.current)}>
                                <Popup>
                                    <h4>Name: {device.name}</h4>
                                    <div>
                                        Configuration: <a
                                        href={device.configuratorUrl}
                                        target={'_blank'}>{device.configuratorUrl}</a>
                                    </div>
                                </Popup>
                            </Marker>))
                    }
                </Map>
                <Col className={'map-location-inputs'}>
                    <Col span={10}><Row>
                        <Form.Item label='Latitude:'
                                   labelCol={{ span: 22, offset: 2 }}
                                   wrapperCol={{ span: 22, offset: 2 }}>
                            <InputNumber value={this.props.currentMapSettings.lat}
                                         onChange={this.onLatitudeChange}/>
                        </Form.Item>
                    </Row></Col>
                    <Col span={10}><Row>
                        <Form.Item label='Longitude:'
                                   labelCol={{ span: 22, offset: 2 }}
                                   wrapperCol={{ span: 22, offset: 2 }}>
                            <InputNumber value={this.props.currentMapSettings.lng} onChange={this.onLongitudeChange}/>
                        </Form.Item>
                    </Row></Col>
                    <Col span={10}><Row>
                        <Form.Item label='Zoom:'
                                   labelCol={{ span: 22, offset: 2 }}
                                   wrapperCol={{ span: 22, offset: 2 }}>
                            <Slider min={0} max={18} step={1} onChange={this.onZoomChange}
                                    value={this.props.currentMapSettings.zoom}/>
                        </Form.Item>
                    </Row></Col>
                </Col>
                <Col className={'map-location-inputs'}>
                    <Col span={10}><Row>
                        <Form.Item label='Choose image for offline map:'
                                   labelCol={{ span: 22, offset: 2 }}
                                   wrapperCol={{ span: 22, offset: 2 }}>

                            <label htmlFor={'file-uploader'} className={'upload-button ant-btn'}>
                                <Icon type='upload'/> Click to upload</label>
                            {this.props.currentMapSettings.mapImageName ?
                                <Tag closable style={{ overflow: 'hidden' }}
                                     onClose={this.onFileUpload}>{this.props.currentMapSettings.mapImageName}</Tag>
                                : null
                            }
                            <Input id={'file-uploader'} style={{ display: 'none' }} type='file'
                                   onChange={this.onFileUpload}/>
                        </Form.Item>
                    </Row></Col>
                    <Col span={10}><Row>
                        {
                            this.props.currentMapSettings.mapImage ?
                                <Form.Item label='Change Offline Map Image Opacity:'
                                           labelCol={{ span: 22, offset: 2 }}
                                           wrapperCol={{ span: 22, offset: 2 }}>
                                    <Slider min={0} max={1} step={0.1} onChange={this.onMapImageOpacityChange}
                                            value={this.state.imageOpacity}/>
                                </Form.Item> : null
                        }
                    </Row></Col>
                </Col>
            </div>
        );
    }
}

MapSettingsComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
    devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceModel)).isRequired,
    currentMapSettings: PropTypes.object.isRequired,
    onMapSettingsChange: PropTypes.func.isRequired,
};
