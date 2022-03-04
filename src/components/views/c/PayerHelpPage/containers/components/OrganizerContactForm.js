import React from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';

import {TextInput, Touchable} from 'elements';

const OrganizerContactForm = ({
  userLoggedIn,
  loading,
  value,
  onChangeValue,
  onSubmit,
}) => {
  const recaptchaRef = React.useRef(null);

  const [captchaToken, setCaptchaToken] = React.useState(null);

  React.useEffect(() => {
    if (captchaToken) {
      onSubmit(captchaToken);
    }
  }, [captchaToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form
      className="cf"
      onSubmit={event => {
        event.preventDefault();

        if (recaptchaRef.current) {
          recaptchaRef.current.execute();
        } else {
          onSubmit();
        }
      }}
    >
      <TextInput
        className="fl w-100"
        label="Name"
        placeholder="Your name"
        value={value.name}
        onChange={event => {
          onChangeValue({
            ...value,
            name: event.target.value,
          });
        }}
      />
      <TextInput
        className="fl w-100 mt3"
        label="Email"
        placeholder="Your email"
        value={value.email}
        onChange={event => {
          onChangeValue({
            ...value,
            email: event.target.value,
          });
        }}
      />
      <TextInput
        multiline
        className="fl w-100 mt3"
        label="Message"
        value={value.message}
        onChange={event => {
          onChangeValue({
            ...value,
            message: event.target.value,
          });
        }}
      />
      <Touchable
        className="fl mt3 white bg-tint"
        size="MEDIUM"
        type="submit"
        disabled={
          value.name.length === 0 ||
          value.email.length === 0 ||
          value.message.length === 0
        }
        loading={loading}
      >
        Send
      </Touchable>
      {!userLoggedIn && (
        <Recaptcha
          ref={recaptchaRef}
          size="invisible"
          badge="bottomright"
          sitekey="6LdqOlMUAAAAAGEUIK5jzFytOGxS-sHfvQiIhFjn"
          onResolved={setCaptchaToken}
        />
      )}
    </form>
  );
};

const EnhancedOrganizerContactForm = React.memo(OrganizerContactForm);

export default EnhancedOrganizerContactForm;
