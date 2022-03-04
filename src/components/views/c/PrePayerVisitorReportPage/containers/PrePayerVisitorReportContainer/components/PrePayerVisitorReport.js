import cx from 'classnames';
import React from 'react';
import config from 'config';

import {TextInput, Touchable} from 'elements';

const PrePayerVisitorReport = ({
  className,
  visibleFields,
  submitting,
  validationErrorMessages,
  submitErrorMessage,
  publicCollection,
  value,
  onChangeValue,
  onSubmit,
}) => (
  <div
    className={cx(
      'flex flex-column pa4 items-center bg-white br2 shadow-6',
      className
    )}
  >
    <h2 className="mw-100 mb2 f2 tc lh-copy merriweather gray-600">
      {publicCollection.name}
    </h2>
    <form
      className="mw-100"
      onSubmit={event => {
        event.preventDefault();

        onSubmit();
      }}
    >
      {visibleFields.includes('name') && (
        <TextInput
          name="name"
          className="pv2"
          autoComplete="name"
          autoCapitalize="words"
          placeholder="Name"
          errorMessage={validationErrorMessages.name}
          value={value.name}
          onChange={onChangeValue('name')}
        />
      )}
      {visibleFields.includes('email') && (
        <TextInput
          name="email"
          className="pv2"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={value.email}
          errorMessage={validationErrorMessages.email}
          onChange={onChangeValue('email')}
        />
      )}
      {visibleFields.includes('accessCode') && (
        <TextInput
          name="access-code"
          className="pv2"
          placeholder="Access Code"
          autoComplete="off"
          autoCapitalize="none"
          value={value.accessCode}
          errorMessage={validationErrorMessages.accessCode}
          onChange={onChangeValue('accessCode')}
        />
      )}
      {submitErrorMessage && (
        <div className="mv2 f6 avenir-roman tc brand">{submitErrorMessage}</div>
      )}
      <Touchable
        className={cx(
          'w-100 mv2 white',
          submitting ? 'ba b--brand bg-white' : 'bg-brand'
        )}
        size="EXTRA_LARGE"
        loading={submitting}
        type="submit"
      >
        Enter
      </Touchable>
      {visibleFields.includes('email') && (
        <div className="mt3 f8 avenir-light lh-title tc-ns gray-600">
          By providing your email address, you may receive occasional
          promotional emails. You may unsubscribe at any time.{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={config.links.privacyPolicy}
          >
            Privacy policy
          </a>
        </div>
      )}
    </form>
    <style jsx>{`
      form {
        width: 28rem;
      }
    `}</style>
  </div>
);

const EnhancedPrePayerVisitorReport = React.memo(PrePayerVisitorReport);

export default EnhancedPrePayerVisitorReport;
