import React, { useState } from "react"
import { useSelector } from "react-redux"
import styled from 'styled-components'

import { LogoutButton } from './LogoutButton'

export const UserMessage = () => {
    const [message, setMessage] = useState("");

    const accessToken = useSelector((store) => store.user.login.accessToken);
    const userId = useSelector((store) => store.user.login.userId);

    const AUTH_URL = `https://manuel-orozco-login-form.herokuapp.com/sessions/${userId}/userMessage`;

    fetch(AUTH_URL, {
        method: "GET",
        headers: { Authorization: `${accessToken}` },
    })
        .then((response) => response.json())
        .then((json) => {
            setMessage(json)
        });
    return (
        <>
            <Message>{message}</Message>
            <LogoutButton />
        </>
    );
};

const Message = styled.h1`
    color: darkblue;
    text-align: center;
    padding: 5px;
`