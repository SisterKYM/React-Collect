import {useDispatch, useSelector} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import {successAlert} from 'redux/modules/growl/actions';
import PublicCollectionResource from 'resources/PublicCollectionResource';

import {OrganizerContactForm} from './components';

const OrganizerContactFormContainer = ({
  collectionSlug,
  onDidContactOrganizer,
}) => {
  const contactOrganizer = useFetcher(PublicCollectionResource.contactShape());
  const dispatch = useDispatch();

  const userLoggedIn = useSelector(state =>
    Boolean(state.session && state.session.user)
  );

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async captchaToken => {
    try {
      setLoading(true);

      await contactOrganizer(
        {slug: collectionSlug},
        {
          name: value.name,
          email: value.email,
          message: value.message,
          captchaToken,
        }
      );

      dispatch(
        successAlert({
          title: 'Success!',
          body:
            'Email sent to organizer. A confirmation has also been sent to the email address you provided.',
        })
      );

      onDidContactOrganizer();
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrganizerContactForm
      userLoggedIn={userLoggedIn}
      loading={loading}
      value={value}
      onChangeValue={setValue}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedOrganizerContactFormContainer = React.memo(
  OrganizerContactFormContainer
);

export default EnhancedOrganizerContactFormContainer;
