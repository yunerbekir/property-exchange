import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select } from 'antd';
import './device-ip-address-picker.component.scss';


export class DeviceIpAddressPickerComponent extends React.Component {
    segmentedAddress = { protocol: 'http', ipAddress: '', port: 80 };

    onProtocolChange = (protocol) => {
        this.convertFromSegmentsToUrlString({ protocol });
    };

    onIpAddressChange = (e) => {
        const rawIpSegments = e.target.value.split('.').slice(0, 4);
        const ipSegments = rawIpSegments.map((segment, idx) => {
            if (isNaN(segment)) {
                return 255;
            }

            if (+segment > 255 && segment.toString().length === 3) {
                return segment.toString().substr(0, 2);
            }

            if (segment.toString().length === 4) {
                return segment.toString().substr(0, 3);
            }

            return segment;
        });

        if (+rawIpSegments[rawIpSegments.length - 1] > 255 && rawIpSegments.length < 4) {
            ipSegments.push(rawIpSegments[rawIpSegments.length - 1].toString().substring(rawIpSegments[rawIpSegments.length - 1].length - 1, rawIpSegments[rawIpSegments.length - 1].length));
        }

        this.convertFromSegmentsToUrlString({ ipAddress: ipSegments.join('.') });
    };

    onPortChange = (port) => {
        this.convertFromSegmentsToUrlString({ port });
    };

    componentDidMount() {
        this.convertFromUrlStringToSegments(this.props.value);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.convertFromUrlStringToSegments(this.props.value);
        }
    }

    convertFromSegmentsToUrlString = ({ protocol, ipAddress, port }) => {
        let validPort = this.segmentedAddress.port;
        if (port >= 1 && port <= 9999) {
            validPort = port;
        }
        this.props.onChange(`${protocol || this.segmentedAddress.protocol}://${typeof ipAddress !== 'undefined' ? ipAddress : this.segmentedAddress.ipAddress}:${validPort}`);
    };

    convertFromUrlStringToSegments = (url) => {
        const segments = url.split('://');
        if (segments.length === 1) {
            return { ...this.segmentedAddress };
        }

        const ipPortSegments = segments[1].split(':');
        const protocol = segments[0];
        const ipAddress = ipPortSegments[0];
        const port = +ipPortSegments[1] ? +ipPortSegments[1] : '';

        return { protocol, ipAddress, port };
    };

    render() {
        this.segmentedAddress = this.convertFromUrlStringToSegments(this.props.value);

        return <Input.Group compact>
            <Select value={this.segmentedAddress.protocol}
                    style={{ width: 85 }}
                    onChange={this.onProtocolChange}>
                <Select.Option value='http'>http://</Select.Option>
                <Select.Option value='https'>https://</Select.Option>
            </Select>
            <Input placeholder=' 0 . 0 . 0 . 0'
                   style={{ width: `calc(100% - 155px` }}
                   value={this.segmentedAddress.ipAddress}
                   onChange={this.onIpAddressChange}/>
            <InputNumber min={1} max={9999}
                         value={this.segmentedAddress.port}
                         style={{ width: 70 }}
                         onChange={this.onPortChange}/>
        </Input.Group>;
    }
}

DeviceIpAddressPickerComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
