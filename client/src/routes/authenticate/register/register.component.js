import React from 'react';
import PropTypes from 'prop-types';
import '../login-register.component.scss';
import '../authenticate.component.scss';
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
            userError:'',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.register = this.register.bind(this);
        this.performLoginAction = this.performLoginAction.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        let validationError='';
        switch(name){
            case 'username':{
                validationError=validateUserName(value);
                break;
            }
            case 'password':{
                validationError=validatePassword(value);
                break;
            }
            case 'password':{
                validationError=validateEmail(value);
                break;
            }
            default: validationError="";
        }

        this.setState({ [name]: value, userError:validationError });
    }

    register(e) {
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
                               <div>{this.state.userError}</div>
                             <input type='password' name='password'
                               placeholder='password'
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                            <input type='text' name='email'
                               placeholder='email'
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                        <Button htmlType={'submit'}>
                            <LoaderComponent visible={this.state.showLoader}>Register</LoaderComponent>
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

function validateUserName(name){
    return name && !/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/i.test(name)
    ? "Invalid username"
    : "";
}

function validatePassword(pass){
    return pass && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(pass)
    ? "Invalid password"
    : "";
}

function validateEmail(email){
    return email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ? 'Invalid email address'
    : "";
}