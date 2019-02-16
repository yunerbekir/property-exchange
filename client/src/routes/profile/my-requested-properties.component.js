import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class MyRequestedPropertiesComponent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>{this.props.requestedproperties[0] && this.props.requestedproperties[0].rent}</p>
                    <button onClick={() => {
                        this.props.onRequestedPropertiesUpdated([...this.props.requestedproperties, {
                            address: 'nastan',
                            rent: 99,
                            size: 66
                        }]);
                    }}>Updates
                    </button>
                </Card>
            </React.Fragment>
        );
    }
}

MyRequestedPropertiesComponent.propTypes = {
    requestedproperties: PropTypes.array.isRequired,
    onRequestedPropertiesUpdated: PropTypes.func.isRequired,
};

