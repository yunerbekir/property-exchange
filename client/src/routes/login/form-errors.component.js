import React from 'react';
import PropTypes from 'prop-types';

export const FormErrors = ({ formErrors }) => {
    return (
        <div className='formErrors'>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                    return (
                        <span key={i}>{formErrors[fieldName]}</span>
                    );
                } else {
                    return <span key={i}/>;
                }
            })}
        </div>
    );
};

FormErrors.propTypes = {
    formErrors: PropTypes.object
};
