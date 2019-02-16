import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Divider, Row, Col } from 'antd';
import './profileInfo.component.scss';
import tempProfile from '../../core/assets/images/tempProfile.png';


export class ProfileInfoComponent extends React.Component {

    
    render() {
        console.log(this.props.profile)
        return (
            <React.Fragment>
                <Card className={'profileGrid'}>
                    <Row>
                    <div className={'avatarGrid'}>
                        <Avatar className='avatar' src={tempProfile}/>
                        <p>{this.props.profile.username}</p>
                        <p>{this.props.profile.email}</p>
                    </div>
                    <Divider type='vertical'/>
                    </Row>
                </Card> 
            </React.Fragment>
        );
    }
}

ProfileInfoComponent.propTypes = {
    profile: PropTypes.object.isRequired,
};

