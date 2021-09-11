import React, {useState} from 'react';
import {useRouter} from "next/router";
import supabase from "../utils/initSuperbase";

export default function Login() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    module.exports = {in: false};

    const goTo = (url) => {
        router.push(url);
    }

    const checkUser = async (e) => {
        e.preventDefault();

        if(!phone || !password) {
            alert('There is an empty field.')
            return;
        }

        const {data} = await supabase
            .from('auth')
            .select()
            .match({phone: phone});

        if(!data.length) {
            alert('Wrong Phone!');
            return;
        }

        if(data[0].password === password) {
            module.exports = {Phone: phone};
            module.exports.in = true;
            goTo('/profile');
            return;
        }
        alert('Wrong password');
    }

    const thisFunc = () => {
        router.push('/test');
    }

    return (
        <div>
            <input className={'input-field'} placeholder={'Phone'}
                   value={phone}
                   onChange={(e) => (setPhone(e.target.value))}
            />
            <input className={'input-field'} style={{
                top: '250px'
            }} placeholder={'Password'}
                   type={'password'}
                   value={password}
                   onChange={(e) => (setPassword(e.target.value))}
            />
            <button className={'login-submit-button'} onClick={checkUser}>Login</button>
        </div>
    );
}
