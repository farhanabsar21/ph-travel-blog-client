import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, initializeLogin } from './loginManager';
import { Link } from 'react-router-dom';
import { userAuthData } from '../../App';

const Register = () => {
    
    // initialize firebase
    initializeLogin();

    // setting the registered user value in state
    const [newMember, setNewMember] = useState(false);

    //setting the auth to the whole app 
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
            const newUserInfo = { ...newMember };
            newUserInfo[e.target.name] = e.target.value;
            setNewMember(newUserInfo);
        }
    }

    //sending data to the firebase and app
    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(newMember.email, newMember.password)
            .then(res => {
                setNewMember(res)
                setUserLog(res);
                // history.replace(from);
            })
    }
    return (
        <div className="Register d-flex justify-content-center align-items-center">
            <div className="row login-container">
                <div className="col-md-6 login-img-container"></div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="login-input-container text-center">
                        <h2>Register with email</h2>
                        <div className="message my-2">
                            <p className="error">{newMember.error}</p>
                            {newMember.success && <p className="success">User Logged in Successful</p>}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="enter your email" onBlur={handleBlur} required/>
                            <input type="password" name="password" placeholder="enter your password" onBlur={handleBlur} required/>
                            <button type="submit" className="mt-2">Send</button>
                        </form>
                        <p className="mt-4">Already registered? <Link to="/login">Log in here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;