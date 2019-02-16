import React from 'react';
import { Modal } from 'antd';
import './version-information.component.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';

export function VersionInformationComponent(props) {
    const modalTitle = <span><FontAwesomeIcon icon='info-circle'/> Version Information</span>;

    return (
        <Modal className='version-information-component'
               title={modalTitle}
               visible={props.showModal}
               onCancel={props.onHide}
               closable={true}
               destroyOnClose={true}
               footer={null}
        >
            <p>Version: <b>{props.version.packageVersion}</b></p>
            <p>Build date: <b>{props.version.buildDate}</b></p>
            <p>API: <b>{props.version.api}</b></p>
            <p>API Version: <b>{props.version.apiVersion}</b></p>
        </Modal>
    );
}

VersionInformationComponent.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    version: PropTypes.object.isRequired,
};
