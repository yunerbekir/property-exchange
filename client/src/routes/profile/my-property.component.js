import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export class MyPropertyComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            address:this.props.currentproperty.address
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleButtonClick= this.handleButtonClick.bind(this);
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }
    handleButtonClick(){
        this.props.onPropertyUpdate({ ...this.props.currentproperty, address: this.state.address });
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>{this.props.currentproperty.address}</p>
                    <input autoFocus={true}
                               type='text' name='address'
                               placeholder='Address'
                               value={this.state.address}
                               onChange={this.handleUserInput}/>
                    <button onClick={this.handleButtonClick}>update
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

