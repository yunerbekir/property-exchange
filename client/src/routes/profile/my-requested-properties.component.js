import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import './my-requested-properties.component.scss';
import { MyRequestedPropertiesModalComponent } from './my-requested-properties-modal.component';
import req1 from '../../core/assets/images/req-1.png';
import req2 from '../../core/assets/images/req-2.png';
import req3 from '../../core/assets/images/req-3.png';
import reqEmpty from '../../core/assets/images/req-empty.jpg';
import star1 from '../../core/assets/images/first.jpg';
import star2 from '../../core/assets/images/second.jpg';
import star3 from '../../core/assets/images/thirt.jpg';
const starArr =[star1, star2, star3];

const mapImages = [req1, req2, req3];

export class MyRequestedPropertiesComponent extends React.Component {
    propertiesModalRef = React.createRef();


    openEditModal = (e) => {
        this.propertiesModalRef.current.showModal(this.props.requestedproperties);
    };

    onModalSave = (updatedProps) => {
        return this.props.onRequestedPropertiesUpdated(updatedProps);
    };

    render() {
        const mainCardTitle = <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                My Requested Locations
            </div>
            <div>
                <Button onClick={this.openEditModal}>Edit</Button>
            </div>
        </div>;

        return (
            <div className={'requested-props-container'}>
                <Card title={mainCardTitle} bordered={true} className={'prop-card-container'}>
                    {
                        this.props.requestedproperties.map((property, idx) => {
                            return <Card key={`${property.address}-${idx}`}
                                         className={'prop-card'}
                                         style={{ width: 300 }}
                                         cover={<img alt={'prop-maps'} style={{ height: '200px' }}
                                                     src={property.address ? mapImages[idx] : reqEmpty}/>}
                            >
                                <Card.Meta
                                    avatar={<div><img src={starArr[idx]} alt="star" width="40px"/></div>}
                                    title={property.address || 'Not Added Yet!'}
                                    description={property.address ? <div>
                                        <div><b>{property.rent}</b> maximum rent price</div>
                                        <div><b>{property.size}</b> sq. m. property size</div>
                                    </div> : 'Not Added Yet!'}/>
                            </Card>;
                        })
                    }
                </Card>
                <MyRequestedPropertiesModalComponent ref={this.propertiesModalRef} onUpdate={this.onModalSave}/>
            </div>
        );
    }
}

MyRequestedPropertiesComponent.propTypes = {
    requestedproperties: PropTypes.array.isRequired,
    onRequestedPropertiesUpdated: PropTypes.func.isRequired,
};

