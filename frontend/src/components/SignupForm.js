import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

import { SignupButton } from './SignupButton'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const SignupForm = () => {
    
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validEmail = { pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" };

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
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