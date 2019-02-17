import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import './imageSetComponent.scss';


export class ImageSetComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Carousel autoplay autoplaySpeed={3000} className={'carousel'}>
                    {
                        this.props.imageSet.map((picture, index) => {
                            return (<div key={index}><img src={picture} alt='photograph'/></div>);
                        })
                    }
                </Carousel>
            </React.Fragment>
        );
    }

}


ImageSetComponent.propTypes = {
    imageSet: PropTypes.array.isRequired
};
