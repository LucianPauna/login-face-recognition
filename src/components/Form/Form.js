import React from 'react';
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            signInEmail: '',
            signInPassword: '',
            failed: false,
            errorMessage: ''
        };
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onEmailChange = (event) => {
        if (this.props.formType === 'register') {
            if (typeof event.target.value !== "undefined") {
                const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
              
                if (pattern.test(event.target.value)) {
                    this.setState({registerEmail: event.target.value, failed: false});
                } else {
                    this.setState({failed: true, errorMessage: 'Please enter a valid email address!'});
                }
            } 
        } else {
            this.setState({signInEmail: event.target.value});
        }
    }

    changeForm = () => {
        this.props.formType === 'register' ? this.props.onRouteChange('signin') : this.props.onRouteChange();
    }

    onPasswordChange = (event) => {
        if (this.props.formType === 'register') {
            this.setState({registerPassword: event.target.value});
        } else {
            this.setState({signInPassword: event.target.value});
        }
    }

    onFormSubmit = () => {
        const body = this.props.formType === 'register' ? JSON.stringify({   
            name: this.state.registerName.length ? this.state.registerName : this.state.registerEmail.substring(0, this.state.registerEmail.lastIndexOf("@")),
            email: this.state.registerEmail,
            password: this.state.registerPassword
        }) : JSON.stringify({   
            email: this.state.signInEmail,
            password: this.state.signInPassword
        });
        fetch('https://hidden-bayou-04591.herokuapp.com/'+this.props.formType, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                } else {
                    this.setState({failed: true, errorMessage: this.props.formType === 'register' ? 'Please use a different email address!': 'Wrong email or password!'});
                }
            });
    }

    render() {
        const { formType } = this.props
        return (
            <div className="Form">
                <div className="Form-inner">
                    <h2>{ formType === 'register' ? 'Register' : 'Sign In'}</h2>
                    { formType === 'register' ?
                        <p>
                        <label htmlFor="name">Name<span>*</span></label>
                        <input type="text" name="name" id="name" required onChange={this.onNameChange} />
                    </p> : ''
                    }
                    <p>
                        <label htmlFor="email">Email<span>*</span></label>
                        <input type="email" name="email" id="email" required onChange={this.onEmailChange} />
                    </p>
                    <p>
                        <label htmlFor="password">Password<span>*</span></label>
                        <input type="password" name="password" id="password" required onChange={this.onPasswordChange} />
                    </p>
                    <input type="submit" value={ formType === 'register' ? 'Register' : 'Sign In'} onClick={this.onFormSubmit} />
                    <div className="Form-help">
                        <p onClick={this.changeForm}>{formType === 'register' ? 'Sign In' : 'Register'}</p>
                    </div>
                    { this.state.failed ? <div className="Form-failed"><p>{this.state.errorMessage}</p></div> : '' }
                </div>
            </div>
        )
    }
}

export default Form;