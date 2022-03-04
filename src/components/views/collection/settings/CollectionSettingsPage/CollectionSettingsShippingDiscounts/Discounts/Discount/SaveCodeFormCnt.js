import PropTypes from 'prop-types';
import React, {Children, cloneElement} from 'react';

import {Button} from 'elements';

const SaveCodeFormCnt = ({status, children}) => {
  const [form, toggleForm] = React.useState(false);

  const addCodeClick = React.useCallback(() => {
    toggleForm(true);
  }, []);

  const close = React.useCallback(() => {
    toggleForm(false);
  }, []);

  React.useEffect(() => {
    if (status === 'success') {
      toggleForm(false);
    }
  }, [status]);

  return (
    <div>
      {form ? (
        cloneElement(Children.only(children), {
          close,
        })
      ) : (
        <Button
          small
          colorSet
          backgroundColorSet
          className="gray-600 bg-gray-250"
          onClick={addCodeClick}
        >
          Add Code
        </Button>
      )}
    </div>
  );
};

const EnhancedSaveCodeFormCnt = Object.assign(React.memo(SaveCodeFormCnt), {
  propTypes: {
    children: PropTypes.element,
  },
});

export default EnhancedSaveCodeFormCnt;
