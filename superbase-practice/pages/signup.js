import React, {useState} from 'react';
import supabase from "../utils/initSuperbase";
import {useRouter} from "next/router";

export default function SignUp() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const router = useRouter();

    const addUser = async () => {
        const {data_1, error_1} = await supabase
            .from('users_info')
            .insert([
                {
                    phone: phone,
                    first_name: first_name,
                    last_name: last_name,
                    country: country,
                    city: city
                }
            ]);
        const {data_2, error_2} = await supabase
            .from('auth')
            .insert([
                {
                    phone: phone,
                    password: password
                }
            ]);
        router.push('/');
        alert('You were successfully registered!');
    }

    const checkInfo = () => {
        // check if there is no such phone
        if(phone && password === password_2
            && password !== ''
            && first_name && last_name
            && country && city
            && password.length >= 6 && phone >= 6) {
            addUser();
            return;
        }
        alert('There is an empty field or passwords are different');
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
            <input className={'input-field'} style={{
                top: '300px'
            }} placeholder={'Password Again'}
                   type={'password'}
                   value={password_2}
                   onChange={(e) => (setPassword_2(e.target.value))}
            />
            <input className={'input-field'} style={{
                top: '350px'
            }} placeholder={'First Name'}
                   value={first_name}
                   onChange={(e) => (setFirstName(e.target.value))}
            />
            <input className={'input-field'} style={{
                top: '400px'
            }} placeholder={'Last Name'}
                   value={last_name}
                   onChange={(e) => (setLastName(e.target.value))}
            />
            <input className={'input-field'} style={{
                top: '450px'
            }} placeholder={'Country'}
                   value={country}
                   onChange={(e) => (setCountry(e.target.value))}
            />
            <input className={'input-field'} style={{
                top: '500px'
            }} placeholder={'City'}
                   value={city}
                   onChange={(e) => (setCity(e.target.value))}
            />
            <button style={{
                top:'550px'
            }} className={'login-submit-button'} onClick={checkInfo}>Sign Up</button>
        </div>
    );
}