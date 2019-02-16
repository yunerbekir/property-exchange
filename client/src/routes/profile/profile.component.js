import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { MyPropertyComponent } from './my-property.component';

export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onMyPropertyUpdate = this.onMyPropertyUpdate.bind(this);
    }

    onMyPropertyUpdate(newProperty) {
        this.props.updateProfileAction({ ...this.props.profile, currentproperty: newProperty }).then(() => {
            this.props.getProfileAction();
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
};

