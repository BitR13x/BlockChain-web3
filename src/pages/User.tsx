import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { APIHOST } from '../constants';

const User = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState({});

    useEffect(() => {
        axios(`${APIHOST}/api/blockchain/authenticate`, {
            withCredentials: true,
        })
            .then(({ data }) => {
                const { iat, ...authData } = data; // remove unimportant iat value

                setSession(authData);
            })
            .catch((err) => {
                navigate('/signin');
            });
    }, []);

    async function signOut() {
        await axios(`${APIHOST}/api/logout`, {
            withCredentials: true,
        });

        navigate('/signin');
    };

    return (
        <div>
            <h3>User session:</h3>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <button type="button" onClick={signOut}>
                Sign out
            </button>
        </div>
    );
};

export default User;