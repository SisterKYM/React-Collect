import PropTypes from 'prop-types';
import React from 'react';

import PaymentNoteButtonDropdown from 'elements/PaymentNoteButtonDropdown';

import AddNoteButton from './AddNoteButton';

const NoteEditor = ({
  className,
  form,
  initialValues,
  onSubmit,
  status,
  tooltip,
}) => (
  <PaymentNoteButtonDropdown
    form={form}
    initialValues={initialValues}
    onSubmit={onSubmit}
    right={0}
    status={status}
    top={0}
  >
    <AddNoteButton className={className} tooltip={tooltip} />
  </PaymentNoteButtonDropdown>
);

const EnhancedNoteEditor = Object.assign(React.memo(NoteEditor), {
  propTypes: {
    form: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
    tooltip: PropTypes.string,
  },
});

export default EnhancedNoteEditor;
