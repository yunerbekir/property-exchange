import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd/lib/radio';
import { Card } from 'antd';

export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProfileAction();
    }

    render() {

        return (
            <React.Fragment>
                <Card>
                    <p>{this.props.profile && this.props.profile.username}</p>
                </Card>
            </React.Fragment>

        );
    }
}

ProfileComponent.propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileAction: PropTypes.func.isRequired,
};

