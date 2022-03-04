import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {BasicLayout} from 'layout';
import {LoginSignupNav} from 'elements';
import {
  PrimaryNavLinksContainer,
  UserDrawerContainer,
  WithdrawButtonContainer,
} from 'containers';
import {SEND_CONTACT_MESSAGE} from 'redux/modules/contact/constants';
import {sendContactMessage} from 'redux/modules/contact/actions';
import config from 'config';

import {ContactUsForm} from './components';

const ContactPage = ({location}) => {
  const dispatch = useDispatch();

  const submitMessageStatus = useSelector(
    (state) => state.async.statuses[SEND_CONTACT_MESSAGE]
  );
  const browser = useSelector((state) => state.browser);
  const session = useSelector((state) => state.session || {});

  const handleSubmitForm = React.useCallback(
    (values) => {
      dispatch(
        sendContactMessage({
          ..._.omit(values, ['firstName', 'lastName']),
          name: `${values.firstName} ${values.lastName}`,
        })
      );
    },
    [dispatch]
  );

  const handleOpenLiveChat = React.useCallback(() => {
    if (window && window.zE) {
      window.zE('webWidget', 'open');
    }
  }, []);

  return (
    <BasicLayout
      className="ph3"
      primaryNavbar={{
        leftComponent: <PrimaryNavLinksContainer />,
        rightComponent: (!session || !session.user) && (
          <LoginSignupNav location={location} />
        ),
      }}
      drawerMenuNav={<UserDrawerContainer />}
    >
      <div className="flex-ns flex-row-reverse-ns pv4">
        <div className="w-two-thirds-ns ml3-ns">
          <h1 className="mt3">Contact us</h1>
          <p className="mt3">
            Drop us a note, ask us a question, feed us some feedback.
            <br />
            We&#8217;re at the ready!
          </p>
          <div className="mw6 mt3">
            <ContactUsForm
              browser={browser}
              status={submitMessageStatus}
              onSubmit={handleSubmitForm}
            />
          </div>
        </div>
        <ul className="w-third-ns mt4 mt0-ns">
          {config.isCheddarUp && (
            <li className="dn db-ns mw5 pa3 bg-aqua">
              <p>Chat with us:</p>
              <p className="mt3">
                Monday-Friday
                <br />
                9am-5pm (MT)
                <br />
                <span className="tint pointer" onClick={handleOpenLiveChat}>
                  Chat now
                </span>
              </p>
            </li>
          )}
          <li className="mw5 pa3 mt3 bg-light-tint">
            Check out our{' '}
            <a
              className="tint pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={config.links.supportPage}
            >
              FAQs
            </a>
          </li>
        </ul>
      </div>
    </BasicLayout>
  );
};

const EnhancedContactPage = React.memo(ContactPage);

export default EnhancedContactPage;
