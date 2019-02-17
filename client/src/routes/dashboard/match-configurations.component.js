import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'antd';
import './match-configurations.component.scss';
import flat1 from '../../core/assets/images/flat1.jpg';
import flat2 from '../../core/assets/images/flat2.jpg';
import flat3 from '../../core/assets/images/flat3.jpg';

const flatImages = [flat1, flat2, flat3];

export class MatchConfigurationsComponent extends React.Component {

    renderConfigItemCard = (userId, userIds) => {
        const currentUser = this.props.dashboard.activeUsers.find(u => u.id === userId);
        if (!currentUser) {
            return null;
        }

        return <Card
            hoverable
            style={{ width: 230 }}
            cover={<img alt='example'
                        style={{ height: '230px', width: '100%' }}
                        src={flatImages[userIds.indexOf(userId)]}/>}
        >
            <Card.Meta
                title={currentUser.currentproperty.address}
                description={`${currentUser.username} (${currentUser.email})`}
            />
        </Card>;
    };

    render() {
        return (
            <div className={'match-configs-container'}>
                <div className={'group-header'}><Icon type='appstore'/> My Matches</div>
                <div className={'group-body'}>
                    {this.props.dashboard && this.props.dashboard.myMatches && this.props.dashboard.myMatches.length > 0 ? this.props.dashboard.myMatches.map((myMatch, idx) => {
                        return <div className={'match-item'} key={idx}>
                            <div className={'header'}>
                                <span style={{ marginRight: '100px', fontSize: '16px' }}>Configuration {idx + 1}</span>
                                <Button type='primary' icon='check'>Accept</Button>
                                <Button type='danger' icon='close'>Decline</Button>
                            </div>
                            <div className={'body'}>
                                {myMatch.configuration.map((matchElement, configIdx) => {
                                    return <div className={'match-config-item'} key={configIdx}>
                                        {this.renderConfigItemCard(matchElement.from, myMatch.userids)}
                                        <Icon type='double-right'/>
                                        {this.renderConfigItemCard(matchElement.to, myMatch.userids)}
                                    </div>;
                                })}
                            </div>
                        </div>;
                    }) : <h3 style={{ textAlign: 'center' }}>There are no matches yet!</h3>}
                </div>
            </div>
        );
    }
}

MatchConfigurationsComponent.propTypes = {
    dashboard: PropTypes.object.isRequired,
};
