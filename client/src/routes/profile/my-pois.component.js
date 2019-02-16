import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd/lib/radio';
import { Card } from 'antd';

export class MyPoisComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>{this.props.pois[0] && this.props.pois[0].location}</p>
                    <button onClick={() => {
                        this.props.onPoisUpdated([...this.props.pois, { location: 'qnci', hourRange: '18-19' }]);
                    }}>Updates
                    </button>
                </Card>
            </React.Fragment>
        );
    }
}

MyPoisComponent.propTypes = {
    pois: PropTypes.array.isRequired,
    onPoisUpdated: PropTypes.func.isRequired,
};

