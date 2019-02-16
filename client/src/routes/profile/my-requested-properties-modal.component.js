import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';
import './my-requested-properties-modal.component.scss';

export class MyRequestedPropertiesModalComponent extends React.Component {
    state = {
        visible: false,
        requestedproperties: []
    };

    showModal = (propsToEdit) => {
        this.setState({
            visible: true,
            requestedproperties: propsToEdit
        });
    };

    handleOk = (e) => {
        this.props.onUpdate(this.state.requestedproperties).then(() => {
            this.setState({
                visible: false,
            });
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    updateAddress = (idx, e) => {
        const newAddress = e.target.value;
        this.setState((prevState, props) => ({
            requestedproperties: [...prevState.requestedproperties.slice(0, idx), {
                address: newAddress,
                rent: prevState.requestedproperties[idx].rent,
                size: prevState.requestedproperties[idx].size
            }, ...prevState.requestedproperties.slice(idx + 1, prevState.requestedproperties.length)]
        }));
    };

    updateRent = (idx, e) => {
        const newRent = e.target.value;
        this.setState((prevState, props) => ({
            requestedproperties: [...prevState.requestedproperties.slice(0, idx), {
                address: prevState.requestedproperties[idx].address,
                rent: newRent,
                size: prevState.requestedproperties[idx].size
            }, ...prevState.requestedproperties.slice(idx + 1, prevState.requestedproperties.length)]
        }));
    };

    updateSize = (idx, e) => {
        const newSize = e.target.value;
        this.setState((prevState, props) => ({
            requestedproperties: [...prevState.requestedproperties.slice(0, idx), {
                address: prevState.requestedproperties[idx].address,
                rent: prevState.requestedproperties[idx].rent,
                size: newSize
            }, ...prevState.requestedproperties.slice(idx + 1, prevState.requestedproperties.length)]
        }));
    };

    render() {


        return (
            <Modal
                title='Update My Requested Properties'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form layout='inline'>
                    {this.state.requestedproperties.map((propToEdit, idx) => {
                        return <div className={'my-requested-prop-form-group'} key={idx}>
                            <Form.Item label={'Region'}>
                                <Input type={'text'} value={propToEdit.address}
                                       onChange={(e) => this.updateAddress(idx, e)}/>
                            </Form.Item>
                            <Form.Item label={'Maximum Rent Price'}>
                                <Input type={'number'} value={propToEdit.rent}
                                       onChange={(e) => this.updateRent(idx, e)}/>
                            </Form.Item>
                            <Form.Item label={'Minimum size'}>
                                <Input type={'number'} value={propToEdit.size}
                                       onChange={(e) => this.updateSize(idx, e)}/>
                            </Form.Item>
                        </div>;
                    })}
                </Form>
            </Modal>
        );
    }
}

MyRequestedPropertiesModalComponent.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

