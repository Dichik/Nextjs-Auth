import React, {useEffect, useState} from 'react';
import supabase from "../utils/initSuperbase";
import {useRouter} from "next/router";

export default function Home() {
    const [todo, setToDo] = useState("");
    const [allUsers, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchUsers()
        const mySubscription = supabase
            .from('users_info')
            .on('*', () => {
                console.log('something happened....')
                fetchUsers()
            })
            .subscribe()
        return () => supabase.removeSubscription(mySubscription)
    }, []);

    async function fetchUsers() {
        const {data, error} = await supabase
            .from('users_info')
            .select();
        setUsers(data);
    }

    async function addUser() {
        const {data} = await supabase
            .from('users_info')
            .insert([
                {
                    phone: '485',
                    first_name: 'Ostap',
                    last_name: 'op',
                    country: 'Ukraine',
                    city: 'Kiev',
                    doc_url: 'sdfjh'
                }
            ]);
        console.log(todo + " was added");
    }

    async function deleteUser() {
        if (!todo) return;

        const {data} = await supabase
            .from('users_info')
            .delete()
            .match({first_name: 'Ostap'});
    }

    return (
        <div>
            {/*<input*/}
            {/*    type={"text"}*/}
            {/*    value={todo}*/}
            {/*    onChange={(e) => setToDo(e.target.value)}*/}
            {/*/>*/}
            {/*<button onClick={addUser}>Add ToDo</button>*/}
            {/*<button onClick={deleteUser}>Delete User</button>*/}
        </div>
    );
}
