import { connect } from 'react-redux';
import { DefaultParamsComponent } from './default-params.component';
import { withRouter } from 'react-router-dom';
import { actions } from '../../../core/+store/reducers/app-layout/app-layout.reducer';
import { actions as devicesActions } from '../../../core/+store/reducers/devices/devices.reducer';

const mapDispatchToProps = {
    getAppLayoutSettingsAction: actions.getAppLayoutSettingsAction,
    updateAppLayoutSettingsAction: actions.updateAppLayoutSettingsAction,
    getDevicesAction: devicesActions.getDevicesAction,
};

const mapStateToProps = ({ appLayout, devices }) => ({
    appLayout,
    devices
});

export const DefaultParamsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultParamsComponent));
