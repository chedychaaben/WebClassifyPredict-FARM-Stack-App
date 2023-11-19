import axios from 'axios';
import jwt_decode from "jwt-decode";

export const authStart = () => {
    return {
        type: 'AUTH_START'
    }
}

export const authSuccess = token => {
    return {
        type: 'AUTH_SUCCESS',
        token: token
    }
}

export const authFail = error => {
    return {
        type: 'AUTH_FAIL',
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: 'AUTH_LOGOUT'
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.access_token;
            const decoded_jwt_token = jwt_decode(token) 
            const expirationDate = new Date(parseInt(decoded_jwt_token['expires']) * 1000); // Seconds passed since epoch to date 
            const secondsToStayAlive = (expirationDate - Date.now() ) / 1000
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(secondsToStayAlive)); // Action To set a timeout that will deconnect later
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (nom, prenom, username, email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/auth/signup/', {
            nom         : nom ,
            prenom      : prenom ,
            username    : username ,
            email       : email ,
            password   : password,
        })
        .then(res => {
            const token = res.data.access_token;
            const decoded_jwt_token = jwt_decode(token) 
            const expirationDate = new Date(parseInt(decoded_jwt_token['expires']) * 1000); // Seconds passed since epoch to date 
            const secondsToStayAlive = (expirationDate - Date.now() ) / 1000
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(secondsToStayAlive)); // Action To set a timeout that will deconnect later
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

// expirationDate is wrong ghere to do later
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}