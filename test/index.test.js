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
            resolvers: {
                Query: {
                    getName: (_, variables, { cache }) => {
                        const name = cache.readFragment({ fragment: gql`
                            fragment Hero @client{
                            name
                            }
                        ` });

                        return name;
                    },
                },
                Mutation: {
                    updateName: (_, { name }, { cache }) => {
                        cache.writeData({
                          data: {
                            name
                          },
                        });

                        return name;
                    }
                },
            },
        }),
    ]),
    cache: new InMemoryCache({})
});

const mutation = gql`
mutation($name: String!) {
    updateName(name: $name) @client
}
`;

describe('Mount Button', function () {
    it('Mount Button Children', function () {
        const button = mount(
            <ApolloProvider client={client}>
                <Button
                    mutation={mutation}
                    variables={{ name: 'Oliver Queen' }}
                    onCompleted={({ updateName })=>{
                        expect(updateName).toEqual('Oliver Queen');
                    }}
                >
                    Barry Allen
                </Button>
            </ApolloProvider>
        );

        expect(button.find('button').text()).toEqual('Barry Allen');
        button.simulate('click');
    });
});