import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import './my-requested-properties.component.scss';
import { MyRequestedPropertiesModalComponent } from './my-requested-properties-modal.component';

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
                                         cover={<img alt='example'
                                                     src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'/>}
                            >
                                <Card.Meta
                                    avatar={<div>{idx + 1}</div>}
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

