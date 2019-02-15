import React from 'react';
import PropTypes from 'prop-types';
import './login.component.scss';
import { Button, Form } from 'antd';
import { LoaderComponent } from '../../shared';
import { AppLayoutModel } from '../../shared/models/AppLayoutModel';

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showLoader: false,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.login = this.login.bind(this);
        this.performLoginAction = this.performLoginAction.bind(this);
        this.createUserAndLogin = this.createUserAndLogin.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    login(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.performLoginAction({ username, password });
    }

    performLoginAction({ username, password }) {
        this.setState({ showLoader: true }, () => {
            this.props.loginAction({ username, password }).then((result) => {
                if (!result) {
                    this.setState({ showLoader: false });
                }
            });
        });
    }

    createUserAndLogin() {
        const username = this.props.history.location.search.substr('?user='.length, this.props.history.location.search.length);
        const password = username;

        this.props.addUserAction({
            username,
            password,
            role: 'ROLE_ADMIN'
        }).then((result) => {
            if (result) {
                this.performLoginAction({ username, password });
                this.props.history.replace('/');
            }
        });
    }

    componentDidMount() {
        if (this.props.history.location.search.indexOf('?user=') > -1) {
            this.createUserAndLogin();
        }
    }

    render() {
        return (
            <div className={'login-component'}>
                <div className={'login-logo'}/>
                <div className={'login-image'}/>

                <div className='login-footer'>
                    <Form className={'login-form'} onSubmit={this.login}>
                        <input autoFocus={true}
                               type='text' name='username'
                               placeholder='Username...'
                               value={this.state.username}
                               onChange={this.handleUserInput}/>
                        <input type='password' name='password'
                               placeholder='Password...'
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                        <Button htmlType={'submit'}>
                            <LoaderComponent visible={this.state.showLoader}>LOG IN</LoaderComponent>
                        </Button>

                        <p> Copyright &copy; 2018 Rhythm Engineering</p>
                        <span>Version: <b>{window.packageVersion}</b></span>
                    </Form>

                    <div className={'login-info'}>
                        <span>
                            {
                                this.props.appLayout.deploymentInfo ||
                                `In|Time delivers precise travel – time data, helping you identify incidents and congestion as they occur along the transportation network. Do a roadway health check-up with In|Time now!`
                            }
                        </span>
                    </div>
                </div>

            </div>

        );
    }
}

LoginComponent.propTypes = {
    addUserAction: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
};

