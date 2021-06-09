import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const LoginButton = () => {
    return (
        <ButtonContainer>
            <Button
                variant="contained"
                color="secondary"
                type="submit">
                Login
            </Button>
        </ButtonContainer>        
    );
};

const ButtonContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`