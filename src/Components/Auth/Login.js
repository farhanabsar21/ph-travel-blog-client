import React, { useContext, useState } from 'react';
import { initializeLogin, signInUserWithEmailAndPassword } from './loginManager';
import { Link } from 'react-router-dom';
import { userAuthData } from '../../App';

const Login = () => {
    // initialize firebase
    initializeLogin();

    // setting the login user value in state
    const [user, setUser] = useState({
        isSignedIn: false,
        email: "",
        password: "",
        success: false
    })
    const [userLog, setUserLog] = useContext(userAuthData);
    // getting data from the form
    const handleBlur = e => {
        let isFieldValid;

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === "password") {
            const isPassValid = e.target.value.length >= 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPassValid && passHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    //sending data to the firebase and app
    const handleSubmit = e => {
        e.preventDefault();
        signInUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const adminInfo = res;
                fetch('https://ph-travel-blog.herokuapp.com/isAdmin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: res.email })
                })
                .then(res => res.json())
                .then(data => {
                  if(data.length === 1){
                    setUserLog({ ...adminInfo, isAdmin: true });
                  }else{
                    setUserLog({ ...adminInfo, isAdmin: false });
                  }
                })
                setUser(res)
                setUserLog(res)
                // history.replace(from);
            })
    }

    return (
        <div className="Login d-flex justify-content-center align-items-center">
            <div className="row login-container">
                <div className="col-md-6 login-img-container"></div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="login-input-container text-center">
                        <h2>Log in with email</h2>
                        <div className="message my-2">
                            <p className="error">{user.error}</p>
                            {user.success && <p className="success">{userLog.isAdmin ? "Admin logged in" : "User Logged in Successful"}</p>}
                            {user.success && <Link to="/">Go to Home</Link>}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="enter your email" onBlur={handleBlur} required/>
                            <input type="password" name="password" placeholder="enter your password" onBlur={handleBlur} required/>
                            <button type="submit" className="mt-2">Send</button>
                        </form>
                        <p className="mt-4">Not registered? <Link to="/register">Sign up here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;