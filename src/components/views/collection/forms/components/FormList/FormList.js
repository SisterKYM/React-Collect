import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import ReactSortable from 'react-sortablejs';

import {sortForms} from 'redux/modules/forms/actions';
import {sortableOptions} from 'theme/sortable';

import FormListItem from './FormListItem';

const FormList = () => {
  const dispatch = useDispatch();

  const collection = useSelector(state => state.collections.collection);
  const forms = useSelector(state => state.forms.forms);

  const handleSort = React.useCallback(
    order => {
      dispatch(
        sortForms({
          type: 'forms',
          order: order.map(idx => Number(idx)),
          collection: collection.id,
        })
      );
    },
    [collection, dispatch]
  );

  return (
    <div className="pa3 br2 shadow-6 bg-white">
      <ReactSortable
        className={forms.length === 0 ? 'pv3' : ''}
        options={{
          ...sortableOptions,
          group: 'forms',
        }}
        onChange={handleSort}
      >
        {forms.map((form, idx) => (
          <div
            key={form.id}
            data-id={form.id}
            className={idx !== 0 ? 'mt21' : ''}
          >
            <FormListItem collection={collection} form={form} />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

const EnhancedFormList = React.memo(FormList);

export default EnhancedFormList;
