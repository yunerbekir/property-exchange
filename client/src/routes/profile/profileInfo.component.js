import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Switch, Row, Col, Button } from 'antd';
import './profileInfo.component.scss';
import {ProfileInfoModalComponent} from './profileInfoModal.component';
import {ImageSetComponent} from './imageSetComponent';

import DefaultAvatarIcon from '../../core/assets/images/defaultAvatarIcon.png'
import flat1 from '../../core/assets/images/flat1.jpg';
import flat2 from '../../core/assets/images/flat2.jpg';
import flat3 from '../../core/assets/images/flat3.jpg';


export class ProfileInfoComponent extends React.Component {
    propertiesModalRef = React.createRef();
    
    
    openModal=(e)=>{
        this.propertiesModalRef.current.showModal(this.props.profile.currentproperty);
    }

    onModalSave = (updatedProps) => {
        return this.props.onCurrentPropertyUpdated(updatedProps);
    };

    handleTogle=()=>{
         return this.props.updateActiveStatus({isactive:!this.props.profile.isactive});
    }

    render() {
        return (
            <React.Fragment>
                <Card className={'profile-grid'}>
                    <Row gutter={48}>
                        {this.props.profile?<Col className={'avatar-grid'} span={5}>
                            <Avatar className='avatar' src={DefaultAvatarIcon}/>
                            <p>{this.props.profile.username}</p>
                            <p>{this.props.profile.email}</p>
                        </Col>:null}
                        <Col className={'user-meta'} span={5}>
                        {this.props.profile && this.props.profile.currentproperty?
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Active:</td>
                                        <td><Switch className={'active-switch'} checked={this.props.profile.isactive} onChange={this.handleTogle}/></td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{this.props.profile.currentproperty.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Rent:</td>
                                        <td>{this.props.profile.currentproperty.rent}</td>
                                    </tr>
                                    <tr>
                                        <td>Size:</td>
                                        <td>{this.props.profile.currentproperty.size}</td>
                                    </tr>
                                </tbody>
                            </table>: null}
                              <Button className={'modal-button'} onClick={this.openModal}>Edit</Button>
                        </Col>
                        <Col className={'image-set-container'}span={6}>
                            <ImageSetComponent imageSet={[flat1,flat2,flat3]}/>
                        </Col>
                    </Row>
                    
                </Card> 
                <ProfileInfoModalComponent ref={this.propertiesModalRef} onUpdate={this.onModalSave}/>
            </React.Fragment>
        );
    }
}

ProfileInfoComponent.propTypes = {
    profile: PropTypes.object.isRequired,
    onCurrentPropertyUpdated: PropTypes.func.isRequired,
    updateActiveStatus: PropTypes.func.isRequired,
    getProfileAction: PropTypes.func.isRequired,
};

