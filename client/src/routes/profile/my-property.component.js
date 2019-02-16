import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class MyPropertyComponent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>{this.props.currentproperty.address}</p>
                    <button onClick={() => {
                        this.props.onPropertyUpdate({ ...this.props.currentproperty, address: 'ilienci' });
                    }}>Updates
                    </button>
                </Card>
            </React.Fragment>
        );
    }
}

MyPropertyComponent.propTypes = {
    currentproperty: PropTypes.object.isRequired,
    onPropertyUpdate: PropTypes.func.isRequired,
};

