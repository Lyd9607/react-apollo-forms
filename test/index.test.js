import React from 'react';
import { ApolloProvider } from "react-apollo";
import { mount } from 'enzyme';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { Button } from '../lib';

const client = new ApolloClient({
    link: ApolloLink.from([
        withClientState({
            defaults: {},
        }),
    ]),
    cache: new InMemoryCache({})
});

const mutation = gql`
mutation($name: String!){
    updateName(name: $name){
        name
    }
}
`;

describe('Mount Button', function () {
    it('Mount Button Children', function () {
        let button = mount(
            <ApolloProvider client={client}>
                <Button mutation={mutation}>
                    Barry Allen
                </Button>
            </ApolloProvider>
        );

        expect(button.find('button').text()).toEqual('Barry Allen');
    });
});