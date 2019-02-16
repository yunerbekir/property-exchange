import React from 'react';
import PropTypes from 'prop-types';
import '../login.component.scss';
import { Button, Form } from 'antd';
import { LoaderComponent } from '../../../shared';
import { AppLayoutModel } from '../../../shared/models/AppLayoutModel';

export class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email:'',
            showLoader: false,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.register = this.register.bind(this);
        this.performLoginAction = this.performLoginAction.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    register(e) {
        debugger;
        e.preventDefault();
        const { username, password,email } = this.state;
        this.props.registerAction({ username, password,email });
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

    componentDidMount() {
        // if (this.props.history.location.search.indexOf('?user=') > -1) {
        //     this.createUserAndLogin();
        // }
    }

    render() {
        return (
            <div className={'login-component'}>


                <div className='login-footer'>
                    <Form className={'login-form'} onSubmit={this.register}>
                            <input autoFocus={true}
                               type='text' name='username'
                               placeholder='username'
                               value={this.state.username}
                               onChange={this.handleUserInput}/>
                             <input type='password' name='password'
                               placeholder='password'
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                            <input type='text' name='email'
                               placeholder='email'
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                        <Button htmlType={'submit'}>
                            <LoaderComponent visible={this.state.showLoader}>submit</LoaderComponent>
                        </Button>
                    </Form>
                </div>

            </div>

        );
    }
}

RegisterComponent.propTypes = {
    addUserAction: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
};

