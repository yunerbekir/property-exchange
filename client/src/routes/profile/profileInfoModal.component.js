import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';
import './my-requested-properties-modal.component.scss';
import './profileInfoModal.component.scss';

export class ProfileInfoModalComponent extends React.Component {
    state = {
        visible: false,
        currentproperty: []
    };

    showModal = (propsToEdit) => {
        this.setState({
            visible: true,
            currentproperty: propsToEdit
        });
    };

    handleOk = (e) => {
        this.props.onUpdate(this.state.currentproperty).then(() => {
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

    updateAddress = (e) => {
        const newAddress = e.target.value;
        this.setState((prevState) => ({
            currentproperty: {
                ...prevState.currentproperty ,
                address: newAddress,
            }
        }));
    };

    updateRent = (e) => {
        const newRent = e.target.value;
        this.setState((prevState) => ({
            currentproperty: {
                ...prevState.currentproperty ,
                rent: +newRent,
            }
        }));
    };

    updateSize = (e) => {
        const newSize = e.target.value;
        this.setState((prevState) => ({
            currentproperty: {
                ...prevState.currentproperty ,
                size: +newSize,
            }
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
                    <Form.Item label={'Address'}>
                        <Input type={'text'} value={this.state.currentproperty.address}
                                onChange={this.updateAddress}/>
                    </Form.Item>
                    <Form.Item label={'Rent'}>
                        <Input type={'number'} value={this.state.currentproperty.rent}
                                onChange={this.updateRent}/>
                    </Form.Item>
                    <Form.Item label={'Size'}>
                        <Input type={'number'} value={this.state.currentproperty.size}
                                onChange={this.updateSize}/>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

ProfileInfoModalComponent.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

