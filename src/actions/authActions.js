import actionTypes from '../constants/actionTypes';
const User = require('../components/Users');
//import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data) {
    return async dispatch => {
        return data.then(async (data) => {
            const user = await User.findOne({ username: data.username }).select('name username password');
            if (!user)
                throw 'Authentication failed. User not found.';
          
            const isMatch = await user.comparePassword(data.password); // Use await
          
              if (isMatch) {
                // const userToken = { id: user._id, username: user.username }; // Use user._id (standard Mongoose)
                // const token = jwt.sign(userToken, process.env.SECRET_KEY, { expiresIn: '1h' }); // Add expiry to the token (e.g., 1 hour)
                // res.status(200).json({ success: true, token: 'JWT ' + token });
              } else 
                throw 'Authentication failed. Incorrect password.';
            return data;
        }).then((data) => {
            localStorage.setItem('username', data.username);
            // localStorage.setItem('token', res.token);

            dispatch(userLoggedIn(data.username));
        }).catch((e) => console.log(e));
    }
}

export function submitRegister(data) {
    return async dispatch => {
        try {
            const user = new User({ // Create user directly with the data
              name: data.name,
              username: data.username,
              password: data.password,
            });
        
            await user.save(); // Use await with user.save()

            return data.then((data) => {
                dispatch(submitLogin(data));
            }).catch((e) => console.log(e));
        
          } catch (err) {
            if (err.code === 11000) { // Strict equality check (===)
                console.log('A user with that username already exists.')
            } else {
              console.error(err); // Log the error for debugging
            }
        }
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout())
    }
}