import React, { useCallback, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '../../components/formElements/Input';
import Button from '../../components/formElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../util/validators';

import './RegistrationScreen.css';
import { setNewUser } from '../../redux/actions/usersAction';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState('');

  const users = useSelector((state) => state.users.users);
  const [formState, dispatchReducer] = useReducer(formReducer, {
    inputs: {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      age: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const InputHandler = useCallback(
    (id, value, isValid) => {
      dispatchReducer({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatchReducer]
  );

  const userSubmitHandler = (event) => {
    event.preventDefault();
    let existedUserEmail = undefined;
    let existedUserName = undefined;

    if (users.users) {
      existedUserEmail = users.users.find(
        (u) => u.email === formState.inputs.email.value
      );
    }

    if (users.users) {
      existedUserName = users.users.find(
        (u) => u.name === formState.inputs.name.value
      );
    }

    if (!existedUserEmail && !existedUserName) {
      dispatch(setNewUser(formState.inputs));
      setMessage('');
      history.push('/users', true);
    }

    existedUserEmail && setMessage('The email already exists.');
    existedUserName && setMessage('The name already exists.');
  };

  return (
    <div className="registration-container">
      <form className="form" onSubmit={userSubmitHandler}>
        <h2>Registration Screen</h2>
        <Input
          id="name"
          type="text"
          label="Name"
          validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(10)]}
          errorText="Please enter a valid name"
          onInput={InputHandler}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
          errorText="Please enter a valid email"
          onInput={InputHandler}
        />
        <Input
          id="age"
          type="number"
          label="Age"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid age"
          onInput={InputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD USER
        </Button>
        <h3 className="message">{message}</h3>
      </form>
    </div>
  );
};

export default RegistrationScreen;
