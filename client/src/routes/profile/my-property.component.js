import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd/lib/radio';
import { Card } from 'antd';

export class MyPropertyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

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

