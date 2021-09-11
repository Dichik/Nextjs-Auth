import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import supabase from "../utils/initSuperbase";

export default function Profile() {
    const router = useRouter();
    const phone = require('./login').Phone;
    const isLogged = require('./login').in;
    const [edit, setEdit] = useState('');
    const [loading, setLoading] = useState(true);
    const [disableButton, setDisableButton] = useState(true);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    let info;

    const [new_first_name, setNewFirstName] = useState('');
    const [new_last_name, setNewLastName] = useState('');
    const [new_country, setNewCountry] = useState('');
    const [new_city, setNewCity] = useState('');

    const wasReload = () => {
        router.push('/');
    }

    const fetchUserData = async () => {
        const {data} = await supabase
            .from('users_info')
            .select()
            .match({phone: phone});

        if (data.length) {
            setFirstName(data[0].first_name);
            setLastName(data[0].last_name);
            setCountry(data[0].country);
            setCity(data[0].city);

            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) {
            fetchUserData();
        }
        if (!isLogged)
            wasReload();

        if (new_last_name !== '' || new_city !== '' || new_country !== '' || new_first_name !== '') {
            setDisableButton(false);
        } else setDisableButton(true);
    });

    const updateUserInfo = async () => {
        const {data} = await supabase
            .from('users_info')
            .update({
                first_name: (new_first_name !== '') ? new_first_name : first_name,
                last_name: (new_last_name !== '') ? new_last_name : last_name,
                country: (new_country !== '') ? new_country : country,
                city: (new_city !== '') ? new_city : city
            }).match({phone: phone});
        alert('Updated successfully!');
    }

    const deleteUserInfo = async () => {
        const {data_1} = await supabase
            .from('users_info')
            .delete()
            .match({phone: phone});

        const {data_2} = await supabase
            .from('auth')
            .delete()
            .match({phone: phone});
        router.push('/');
        alert('Your account was successfully deleted!');
    }

    return (
        <div>
            <div className={'welcome'}>
                {!loading ? (
                    <div>
                        <h1 style={{
                            position: 'absoulte',
                            top: '60px',
                            left: '590px'
                        }}>Welcome, {first_name}!</h1>
                        <label style={{
                            position: 'absolute',
                            top: '150px',
                            left: '570px'
                        }} className={'label-item'}><b>First Name</b></label>
                        <input className={'input-field'} placeholder={first_name}
                               value={new_first_name} onChange={
                            (e) => (setNewFirstName(e.target.value))
                        }/>

                        <label style={{
                            position: 'absolute',
                            top: '250px',
                            left: '570px'
                        }} className={'label-item'}><b>Last Name</b></label>
                        <input style={{
                            position: 'absolute',
                            top: '300px'
                        }} className={'input-field'} placeholder={last_name}
                               value={new_last_name} onChange={
                            (e) => (setNewLastName(e.target.value))
                        }/>

                        <label style={{
                            position: 'absolute',
                            top: '350px',
                            left: '570px'
                        }} className={'label-item'}><b>Country</b></label>
                        <input style={{
                            position: 'absolute',
                            top: '400px'
                        }} className={'input-field'} placeholder={country}
                               value={new_country} onChange={
                            (e) => (setNewCountry(e.target.value))
                        }/>

                        <label style={{
                            position: 'absolute',
                            top: '450px',
                            left: '570px'
                        }} className={'label-item'}><b>City</b></label>
                        <input style={{
                            position: 'absolute',
                            top: '500px'
                        }} className={'input-field'} placeholder={city}
                               value={new_city} onChange={
                            (e) => (setNewCity(e.target.value))
                        }/>
                        {disableButton ? <button className={'button-update'} disabled={true}>Update</button>
                            : <button className={'button-update'} onClick={updateUserInfo}>Update</button>}
                        <button style={{
                            position: 'absolute',
                            top: '650px',
                            background: 'rgba(246, 0, 16, 0.59)',
                            color: 'black',
                            border: 'black'
                        }} className={'button-update'} onClick={deleteUserInfo}>Delete</button>
                    </div>
                ) : <p style={{
                    position: 'absolute',
                    top: '200px',
                    left: '590px'
                }}>Loading...</p>}
            </div>
        </div>
    );
}