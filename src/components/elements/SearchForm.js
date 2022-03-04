import {IoIosSearch, IoIosClose} from 'react-icons/io';
import {Field, change, formValueSelector, reduxForm} from 'redux-form';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Input} from 'elements';

const SearchForm = ({
  className,
  iconClassName,
  inputStyle,
  inputBorder = true,
  form,
  placeholder,
  initialValues,
  handleSubmit,
  onSubmit,
  noResult = false,
}) => {
  const valueSelector = React.useMemo(() => formValueSelector(form), [form]);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => valueSelector(state, 'term'));
  const [shouldClear, setShouldClear] = React.useState(false);
  const clearSearch =
    shouldClear ||
    (initialValues && initialValues.term && searchTerm === initialValues.term);

  const handleClear = React.useCallback(() => {
    setShouldClear(true);
    dispatch(change(form, 'term', ''));
  }, [form, dispatch]);

  const handleOnSubmit = React.useCallback(
    (values) => {
      if (onSubmit) {
        onSubmit(clearSearch ? {term: ''} : values);
      }
      setShouldClear(false);
    },
    [clearSearch, onSubmit]
  );

  return (
    <>
      <form
        className={cx('flex ba b--gray-300 br2 ', className)}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Field
          small
          border={inputBorder}
          className="flex-auto f7 br-0 bl-0 bt-0 bb-0 br2"
          borderRadius={false}
          style={{
            height: '28px',
            ...inputStyle,
          }}
          placeholder={placeholder}
          name="term"
          component={Input}
        />
        <button
          className={cx(
            'w2 flex pa0 justify-center items-center pointer bg-white br2',
            iconClassName
          )}
        >
          {searchTerm ? (
            <IoIosClose onClick={handleClear} className="text-24 gray-400" />
          ) : (
            <IoIosSearch className="f5 gray-400" />
          )}
        </button>
      </form>
      {Boolean(noResult) && (
        <div
          className="mt2 f-small avenir-roman truncate brand"
          style={{marginBottom: -10}}
        >
          No results found
        </div>
      )}
    </>
  );
};

const enhance = reduxForm();

const EnhancedSearchForm = Object.assign(enhance(SearchForm), {
  form: PropTypes.string,
  onSubmit: PropTypes.func,
});

export default EnhancedSearchForm;
