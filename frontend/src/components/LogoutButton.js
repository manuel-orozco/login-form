import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const LogoutButton = () => {
    return (
        <ButtonContainer>
            <Button
                variant="contained"
                color="secondary"
                type="submit">
                Logout
            </Button>
        </ButtonContainer>        
    );
};

const ButtonContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid black;
`