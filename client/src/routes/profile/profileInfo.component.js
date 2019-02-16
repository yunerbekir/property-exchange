import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';

export class ProfileInfoComponent extends React.Component {

    
    render() {
        return (
            <React.Fragment>
                <Card>
                </Card> <Avatar src=""/>
            </React.Fragment>
        );
    }
}

ProfileInfoComponent.propTypes = {
    currentproperty: PropTypes.object.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
};

