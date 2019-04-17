# react-apollo-forms

## Input (type="text")

### APIs

#### Props

- `mutation {Object}`: A mutation gql object
- `defaultValue {Any}`: The value passed to input control
- `variables {Object}`: For gql variables (don't need the top level `variables` key)
- `valuePath {String}`: Point to the variables for changing value inside
- `mutateEvent {String}`: Ex. `blur`/`change`, for indicate which event your want to fire the mutation

## Basic
```
import React from 'react';
import { Input } from 'react-apollo-forms';

import mutation from './update.gql';

export default function Hero() {
  return (
    <Input
      mutation={mutation}
      defaultValue="Barry Allen"
      variables={{
        id: 1,
      }}
      valuePath="name"
      mutateEvent="blur"
    />
  );
}
```