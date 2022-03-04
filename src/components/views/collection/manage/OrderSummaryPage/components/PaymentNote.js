import React from 'react';

import {PaymentNoteButtonDropdown} from 'elements';

const PaymentNote = ({updatePaymentStatus, note, onSubmitNote}) => (
  <div>
    {note && <div className="mt3 f6 lh-copy avenir-light-oblique">{note}</div>}
    <PaymentNoteButtonDropdown
      form="PaymentNoteForm"
      top={45}
      initialValues={{note}}
      status={updatePaymentStatus}
      onSubmit={onSubmitNote}
    >
      <div className="f6 line-20 tint pointer">
        {note ? 'Edit Note' : 'Add Note'}
      </div>
    </PaymentNoteButtonDropdown>
  </div>
);

const EnhancedPaymentNote = React.memo(PaymentNote);

export default EnhancedPaymentNote;
