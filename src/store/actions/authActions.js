import * as actionType from './types/authActionTypes';
import { firebaseConnector } from '../../firebase';
import * as storageManager from './localStorageManager';

export const loginUser = (user, pwd) => {
    return dispatch => {
        dispatch(loginUserStart());
        const auth = firebaseConnector.auth();
        auth.signInWithEmailAndPassword(user, pwd)
            .then(resp => {
                const currentUser = auth.currentUser.toJSON();
                dispatch(loginUserSuccess(currentUser.uid, currentUser.stsTokenManager.accessToken, currentUser.stsTokenManager.expirationTime))
                storageManager.writeLocalStorage(currentUser.stsTokenManager.accessToken, currentUser.uid, currentUser.stsTokenManager.expirationTime)
            })
            .catch(err => dispatch(loginUserFail(err.message)))
    }
}

export const signUpUser = (email, pwd) => {
    return dispatch => {
        dispatch(signUpUserStart());
        const auth = firebaseConnector.auth();
        auth.createUserWithEmailAndPassword(email, pwd)
            .then(resp => {
                const currentUser = auth.currentUser.toJSON();
                // currentUser.sendEmailVerification({
                //     url: `https://localhost:3000/?idToken=${currentUser.stsTokenManager.accessToken}`
                // });
                storageManager.writeLocalStorage(currentUser.stsTokenManager.accessToken, currentUser.uid, currentUser.stsTokenManager.expirationTime)
                dispatch(signUpUserSuccess(currentUser.uid, currentUser.stsTokenManager.accessToken, currentUser.stsTokenManager.expirationTime))
            })
            .catch(err => dispatch(signUpUserFail(err)))
    }
}

export const checkAuthenticatedUser = () => {
    return dispatch => {
        const user = storageManager.readLocalStorage();
        if (user.idToken) {
            const expDate = user.expDate;
            if (expDate > new Date().getTime()) {
                dispatch(loginUserSuccess(user.uid, user.idToken, user.expDate))
            } else {
                dispatch(logoutUser())
            }
        }
        return;
    }
}

export const logoutUser = () => {
    storageManager.clearLocalStorage();
    return {
        type: actionType.LOGOUT
    }
}

const loginUserStart = () => {
    return {
        type: actionType.LOGIN_START
    }
}

const loginUserSuccess = (uid, idToken, expDate) => {
    return {
        type: actionType.LOGIN_SUCCESS,
        user: {
            uid: uid,
            idToken: idToken,
            expDate: expDate
        }
    }
}

const loginUserFail = (err) => {
    return {
        type: actionType.LOGIN_FAIL,
        error: err
    }
}

const signUpUserStart = () => {
    return {
        type: actionType.SIGNUP_START
    }
}

const signUpUserSuccess = (uid, idToken, expDate) => {
    return {
        type: actionType.SIGNUP_SUCCESS,
        user: {
            uid: uid,
            idToken: idToken,
            expDate: expDate
        }
    }
}

const signUpUserFail = (err) => {
    return {
        type: actionType.SIGNUP_FAIL,
        error: err
    }
}