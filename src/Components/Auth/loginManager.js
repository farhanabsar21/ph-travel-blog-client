import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const initializeLogin = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

// register
export const createUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = "";
            updateUserInfo(email);
            return newUserInfo;
        })
        .catch(err => {
            const newUserInfo = {};
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

// log in
export const signInUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = "";
            return newUserInfo;
            //   console.log("sign in user info", res.user)
        })
        .catch(err => {
            const newUserInfo = {};
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

// update user
const updateUserInfo = email => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: email
    }).then(() => {
        console.log("updated successfully")
    }).catch(err => {
        console.log(err)
    })
}