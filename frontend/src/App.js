import React from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'
import {LoginHere} from './components/LoginHere'
import {user} from './reducers/user'

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Wrapper>
            <Route path="/" exact>
              <SignupForm />
                <LoginHere />
            </Route>

            <Route path="/sessions" exact>
              <LoginForm />
            </Route>
          </Wrapper>
        </Switch>
      </BrowserRouter>
    </Provider>
     
  );
};

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 5px #999;
  background-color: white;
  `