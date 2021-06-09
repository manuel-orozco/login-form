import React from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Wrapper>
          <Route path="/" exact>
            <SignupForm />
          </Route>

          <Route path="/sessions" exact>
            <LoginForm />
          </Route>
        </Wrapper>
      </Switch>
    </BrowserRouter> 
  );
};

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 400px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 5px #999;
  background-color: white;
  `