import React from 'react';
import PropTypes from 'prop-types';
import { AppLayoutModel } from '../../shared/models/AppLayoutModel';
import {LoginContainer} from './login.container'
import {RegisterContainer} from './register.container'
import { Button } from 'antd/lib/radio';

export class AuthenticateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:true,
        };
    }

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {
        const btnText = this.state.isLogin?'Register':'Login';

        return (
            <React.Fragment>
                {this.state.isLogin?<LoginContainer/>:<RegisterContainer/>}
                <div>
                    <Button className='changeFormButton' htmlType={'submit'} align={'center'} 
                    onClick={() => this.setState({isLogin: !this.state.isLogin})}>
                    {btnText}
                    </Button>
                </div>
            </React.Fragment>

        );
    }
}

AuthenticateComponent.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
};

