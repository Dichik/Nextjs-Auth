import '../styles/globals.css';
import React, {useState} from "react";

function MyApp({Component, pageProps}) {
    const userLogin = require('./login').in;

    return (
        <div>
            <header className={'Menu-Buttons'}>
                <div className={'menu'}><a href={'/'}>Home</a></div>
                {!userLogin ?
                    <div className={'menu'}><a href={'/login'}>Login</a></div>
                    : <div style={{color: 'grey'}} className={'menu'}>Login</div> }
                {!userLogin ?
                    <div className={'menu'}><a href={'/signup'}>SignUp</a></div>
                    : null
                }

                {userLogin ? <div className={'menu'}><a href={'/'}>Log Out</a></div> : null}
            </header>
            <hr className={'hr-1'} />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp
