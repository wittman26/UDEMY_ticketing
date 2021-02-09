import axios from 'axios'
import { useState } from 'react';

/**
 * url: endpoint to request
 * method: get, post, put, delete
 * body: the payload
 */
export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            
            // If onsuccess, it will be returned
            // sending the data just in case
            if(onSuccess) {
                onSuccess(response.data)
            }
            
            return response.data;
        } catch (error) {
            const errors = error.response.data.errors;
            setErrors(
                <div className="alert alert-danger">
                    <h4>Errors....</h4>
                    <ul className="my-0">
                        {errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    };

    return { doRequest, errors };
}