import React, {useEffect} from 'react';
import {useRouter} from "next/router";

export default function Profile() {
    const router = useRouter();
    const phone = require('./login');
    const isLogged = require('./login').in;

    const wasReload = () => {
        router.push('/');
    }

    useEffect(() => {
        if (!isLogged)
            wasReload();
    });

    return (
        <div>
            <p>Hi</p>
        </div>
    );
}