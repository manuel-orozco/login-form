import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'



import { user } from '../reducers/user'
import { LoginButton } from './LoginButton'
import { UserMessage } from './UserMessage'
import { GoBack } from './GoBack'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const LoginForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const LOGIN_URL = 'https://manuel-orozco-login-form.herokuapp.com/sessions'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const accessToken = useSelector((store) => store.user.login.accessToken);   
    const loginError = useSelector((store) => store.user.login.statusMessage);

    const handleLoginSuccess = (loginResponse) => {
        dispatch(
            user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Login success' }));
    };

    const handleLoginFailed = (loginFailed) => {
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setStatusMessage({ statusMessage: loginFailed }));
    };


    const onUsernameLoginChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordLoginChange = (event) => {
        setPassword(event.target.value);
    };

    const onLogin = (event) => {
        event.preventDefault();

        fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw "Sorry, could not login user";
                }
                return response.json();
            })
            .then((json) => handleLoginSuccess(json))
            .catch((err) => handleLoginFailed(err));
        
        setUsername("")
        setPassword("")
    }

    if (!accessToken) {

        return (
            <form className={classes.root} onSubmit={onLogin} noValidate autoComplete="off">
                <LoginContainer>
                    <WelcomeContainer>
                        Please login
                    </WelcomeContainer>

                    <TextField
                        id="UsernameLogin"
                        label="Username"
                        value={username}
                        onChange={onUsernameLoginChange}
                        variant="outlined"
                    />

                    <TextField
                        id="PasswordLogin"
                        label="Password"
                        value={password}
                        onChange={onPasswordLoginChange}
                        variant="outlined"
                        type="password" 
                    />
                    <LoginButton />
                    {loginError && <p>{loginError}</p>}
                    <GoBack />
                </LoginContainer>
            </form>           
        );
    } 
    else {
        return <UserMessage /> 
    }
};

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
`

const WelcomeContainer = styled.span`
    color: darkblue;
    margin-top: -10x;
    padding-bottom: 15px;
`