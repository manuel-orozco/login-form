import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

export const SignupButton = () => {
    return (
        <ButtonContainer>
            <Button
                variant="contained"
                color="secondary"
                type="submit">
                Sign up
            </Button>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
`