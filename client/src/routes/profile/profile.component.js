import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { MyPoisComponent } from './my-pois.component';
import { MyRequestedPropertiesComponent } from './my-requested-properties.component';
import { ProfileInfoComponent } from './profileInfo.component';




export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onMyPropertyUpdate = this.onMyPropertyUpdate.bind(this);
        this.onPoisUpdate = this.onPoisUpdate.bind(this);
        this.onRequestedPropertiesUpdate = this.onRequestedPropertiesUpdate.bind(this);
        this.updateActiveStatus = this.updateActiveStatus.bind(this);
    };

    onMyPropertyUpdate(newProperty) {
        this.props.updateProfileAction({ ...this.props.profile, currentproperty: newProperty }).then(() => {
            this.props.getProfileAction();
        });
    }

    onPoisUpdate(newPois) {
        this.props.updateProfilePoisAction(newPois).then(() => {
            this.props.getProfileAction();
        });
    }

    onCurrentPropertyUpdate = (currentproperty) => {
        return this.props.updateProfileAction({ ...this.props.profile, currentproperty }).then(() => {
            return this.props.getProfileAction();
        });
    };

    onRequestedPropertiesUpdate(newProperties) {

        return this.props.updateProfileRequestedPropertiesAction(newProperties).then(() => {
            return this.props.getProfileAction();
        });
    }

    updateActiveStatus(newStatus) {

        return this.props.updateProfileAction({ ...this.props.profile, ...newStatus }).then(() => {
            return this.props.getProfileAction();
        });
    }

    componentDidMount() {
        this.props.getProfileAction();
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <div>
                        {this.props.profile ? <ProfileInfoComponent profile={this.props.profile}
                                                                    onCurrentPropertyUpdated={this.onCurrentPropertyUpdate}
                                                                    updateActiveStatus={this.updateActiveStatus}
                                                                    getProfileAction={this.props.getProfileAction}/>
                            : null}
                    </div>

                    

                    <div hidden={true}>
                        {this.props.profile && this.props.profile.pois ?
                            <MyPoisComponent pois={this.props.profile.pois} onPoisUpdated={this.onPoisUpdate}/>
                            : null}
                    </div>

                    <div>
                        {this.props.profile && this.props.profile.requestedproperties ?
                            <MyRequestedPropertiesComponent requestedproperties={this.props.profile.requestedproperties}
                                                            onRequestedPropertiesUpdated={this.onRequestedPropertiesUpdate}/>
                            : null}
                    </div>
                </Card>
            </React.Fragment>

        );
    }
}

ProfileComponent.propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileAction: PropTypes.func.isRequired,
    updateProfileAction: PropTypes.func.isRequired,
    updateProfilePoisAction: PropTypes.func.isRequired,
    updateProfileRequestedPropertiesAction: PropTypes.func.isRequired,
};

