import React from 'react';
import Form from '../Form/Form';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: 'signin'
        };
    }

    render() {
        const { onRouteChange, loadUser } = this.props;
        return (
            <Form formType={this.state.formType} loadUser={loadUser} onRouteChange={onRouteChange} />
        )
    }
}

export default SignIn;