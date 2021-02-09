import { useState } from 'react';
import Router from 'next/router'
import useRequest from '../../hooks/use-request';

// useState to use hooks
export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Use the error handling in use-request
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        // from next/router: allows to navigate
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="from-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control" />
            </div>
            <div className="from-group">
                <label>Password </label>
                <input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control" />
            </div>
            {/* Errors provided by use-request */}
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};