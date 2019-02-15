import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './loader.component.scss';


export class LoaderComponent extends React.Component {
    render() {
        if (this.props.visible) {
            return <div className={`loader-component ${this.props.isPageLoader ? 'full-page' : ''}`}
                        style={this.props.style ? this.props.style : {}}>
                {
                    this.props.isPageLoader ? <div className='indeterminate'/> : <Icon type='loading' spin={true}/>
                }
            </div>;
        }

        return this.props.children || null;
    }
}

LoaderComponent.propTypes = {
    visible: PropTypes.bool.isRequired,
    isPageLoader: PropTypes.bool,
    style: PropTypes.object,
};

