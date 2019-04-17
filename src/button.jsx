import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

export default function Button({
  mutation,
  refetchQueries,
  update,
  onCompleted,
  onError,
  ignoreResults,
  children,
  variables,
  onClick,
  ...props
}) {
  return (
    <Mutation
      mutation={mutation}
      update={update}
      refetchQueries={refetchQueries}
      onCompleted={onCompleted}
      onError={onError}
      ignoreResults={ignoreResults}
    >
      {action => (
        <button
          type="button"
          {...props}
          onClick={(mouseEvent) => {
            action({ variables });
            onClick(mouseEvent);
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  );
}

MutateButton.propTypes = {
  mutation: PropTypes.object.isRequired,
  variables: PropTypes.object,
  children: PropTypes.node,
  refetchQueries: PropTypes.array,
  onCompleted: PropTypes.func,
  update: PropTypes.func,
  ignoreResults: PropTypes.bool,
  onError: PropTypes.func,
  onClick: PropTypes.func,
};

MutateButton.defaultProps = {
  children: null,
  variables: {
    variables: {},
  },
  update: () => { },
  onCompleted: () => { },
  refetchQueries: [],
  ignoreResults: false,
  onError: () => {},
  onClick: () => {},
};
