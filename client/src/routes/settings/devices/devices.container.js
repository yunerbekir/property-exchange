import { connect } from 'react-redux';
import { DevicesComponent } from './devices.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/devices/devices.reducer';

const mapDispatchToProps = {
    getDevicesAction: actions.getDevicesAction,
    addDeviceAction: actions.addDeviceAction,
    removeDeviceAction: actions.removeDeviceAction,
    updateDeviceAction: actions.updateDeviceAction,
};

const mapStateToProps = ({ devices, appLayout }) => ({
    devices,
    appLayout
});

export const DevicesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DevicesComponent));
