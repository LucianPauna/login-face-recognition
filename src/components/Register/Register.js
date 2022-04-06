import React from 'react';
import Form from '../Form/Form';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: 'register',
        };
    }

    render() {
        const {onRouteChange, loadUser} = this.props;
        return (
            <Form formType={this.state.formType} loadUser={loadUser} onRouteChange={onRouteChange} />
        )
    }
}

export default Register;