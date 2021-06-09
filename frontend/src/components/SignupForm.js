import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

import { user } from '../reducers/user'
import { SignupButton } from './SignupButton'

const SIGNUP_URL = 'https://manuel-orozco-login-form.herokuapp.com/users'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const SignupForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validEmail = { pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" };

    const signupError = useSelector((store) => store.user.login.statusMessage);

    const handleSignupSuccess = (signupResponse) => {
        dispatch(user.actions.setUserId({ userId: signupResponse.userId }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Signup success' }));
    };

    const handleSignupFailed = (signupError) => {
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setStatusMessage({ statusMessage: signupError }));
    };

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onSignup = (event) => {

        event.preventDefault();

        fetch(SIGNUP_URL, {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    // eslint-disable-next-line
                    throw "Sorry, could not signup user";
                }
                return response.json();
            })
            .then((json) => handleSignupSuccess(json))
            .catch((err) => handleSignupFailed(err));

            setUsername("") 
            setEmail("") 
            setPassword("") 
    };

    return(
        <form className={classes.root}>
            <SignupContainer>
                <WelcomeContainer>
                        Welcome!
                </WelcomeContainer>

                <TextField
                    id="Username"
                    label="Username"
                    value={username}
                    onChange={onUsernameChange}
                    variant="outlined"
                />

                <TextField
                    required id="standard-default"
                    label="Email"
                    value={email}
                    onChange={onEmailChange}
                    variant="outlined"
                    inputProps={validEmail}
                    helperText={email === "" ? 'Example: user@domain.com' : ' '}
                />

                <TextField
                    id="Password"
                    label="Password"
                    value={password}
                    onChange={onPasswordChange}
                    variant="outlined"
                    type="password" 
                    helperText={password === "" ? 'Min. 5 characters, Max. 12' : ' '}
                />

                <SignupButton />
                {signupError && <p>{signupError}</p>}
            </SignupContainer>
        </form>
    );
};

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
`

const WelcomeContainer = styled.h1`
    color: darkblue;
    margin-top: -10x;
    padding-bottom: 15px;
`