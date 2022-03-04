import {useHistory, useRouteMatch} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import {RowControls} from 'elements';

const FormListItemControls = ({className, collection, form}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const controls = React.useMemo(
    () => [
      {
        tooltip: 'Edit',
        onClick: () => {
          history.push(
            `/collection/${collection.user_id}/${collection.id}/forms/${form.id}/edit`
          );
        },
      },
      {
        tooltip: 'Delete',
        onClick: () => {
          history.push(
            `/collection/${match.params.owner}/${match.params.collection}/forms/${form.id}/delete`
          );
        },
      },
    ],
    [collection, form.id, history, match.params.collection, match.params.owner]
  );

  return (
    <RowControls className={`${className} dark-grey`} controls={controls} />
  );
};

const EnhancedFormListItemControls = Object.assign(
  React.memo(FormListItemControls),
  {
    propTypes: {
      className: PropTypes.string,
      collection: PropTypes.object,
      form: PropTypes.object.isRequired,
    },
  }
);

export default EnhancedFormListItemControls;
