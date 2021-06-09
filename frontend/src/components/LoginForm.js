import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { LoginButton } from './LoginButton'
import { makeStyles } from '@material-ui/core/styles'

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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameLoginChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordLoginChange = (event) => {
        setPassword(event.target.value);
    };

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
                    type="password" //To hide the input while typing
                />
                <LoginButton />

            </LoginContainer>

        </form>
        
    );
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