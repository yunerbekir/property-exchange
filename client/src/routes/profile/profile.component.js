import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { MyPropertyComponent } from './my-property.component';
import { MyPoisComponent } from './my-pois.component';
import { MyRequestedPropertiesComponent } from './my-requested-properties.component';

export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onMyPropertyUpdate = this.onMyPropertyUpdate.bind(this);
        this.onPoisUpdate = this.onPoisUpdate.bind(this);
        this.onRequestedPropertiesUpdate = this.onRequestedPropertiesUpdate.bind(this);
    }

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

    onRequestedPropertiesUpdate(newProperties) {
        return this.props.updateProfileRequestedPropertiesAction(newProperties).then(() => {
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
                    <p>{this.props.profile && this.props.profile.username}</p>
                    <div>
                        {this.props.profile && this.props.profile.currentproperty ?
                            <MyPropertyComponent currentproperty={this.props.profile.currentproperty}
                                                 onPropertyUpdate={this.onMyPropertyUpdate}/>
                            : null}
                    </div>

                    <div>
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

