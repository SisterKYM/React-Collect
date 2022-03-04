import {compose, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import pluralize from 'pluralize';
import React from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';

import {asyncConnect} from 'helpers';
import {colors} from 'theme/constants';
import {
  CommonButton,
  CommonDropdownSelect,
  Paginator,
  Panel,
  SearchForm,
  VerificationPrompt,
} from 'elements';
import {
  deleteInvite,
  getInvites,
  inviteMembers,
  remindInvite,
  sendTest,
} from 'redux/modules/members/actions';
import {GET_INVITES, INVITE_MEMBERS} from 'redux/modules/members/constants';

import FollowersList from './FollowersList';
import InviteForm, {displayName} from './InviteForm';

const INVITES_PER_PAGE = 25;

const STATUS_ORDER = ['delivered', 'open', 'click'];
const sorts = [
  {
    name: 'Activity',
    id: 'status',
  },
  {
    name: 'Status',
    id: 'paid',
  },
];

const ShareInvite = ({
  inviteMembers,
  collectionId,
  status,
  invites,
  handleSendTest,
  deleteInviteStatus,
  remindInvite,
  deleteInvite,
  onClickReminders,
  onClickSendMessage,
}) => {
  const recaptchaRef = React.useRef(null);
  const formRef = React.useRef(null);

  const [captchaToken, setCaptchaToken] = React.useState(null);
  const [sortBy, setSortBy] = React.useState({
    name: 'Sort',
    id: '',
  });
  const [page, setPage] = React.useState(0);
  const [followers, setFollowers] = React.useState(invites);
  const [inviteCount, setInviteCount] = React.useState(invites.length);
  const [inviteStatus, setInviteStatus] = React.useState(undefined);
  const [sentCount, setSentCount] = React.useState(0);
  const [searchBy, setSearchBy] = React.useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState('');
  const [invite, setInvite] = React.useState({});

  const hideDeleteConfirm = React.useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const openDeleteConfirm = React.useCallback((invite) => {
    setInvite(invite);
    setShowDeleteConfirm(true);
  }, []);

  const executeRecaptcha = (event) => {
    event.preventDefault();

    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    } else {
      handleInviteFormSubmit();
    }
  };

  const handleInviteFormSubmit = React.useCallback(() => {
    const formValues = get(formRef.current, 'values', {});
    const {message, emails} = formValues;
    if (!emails) {
      return;
    }
    let filteredEmails = emails
      .split('\n')
      .map((email) => email.split(',').map((emailPart) => emailPart.trim()))
      .reduce((a, b) => a.concat(b))
      .filter(
        (email, index, array) => array.findIndex((e) => e === email) === index
      )
      .map((email) => ({email}));
    const allCount = filteredEmails.length;

    filteredEmails = filteredEmails.filter(
      (item) => invites.findIndex((invite) => invite.email === item.email) < 0
    );

    inviteMembers({
      message,
      collection: collectionId,
      emailCollection: filteredEmails,
      duplicateCount: allCount - filteredEmails.length,
      captchaToken,
    });

    recaptchaRef.current.reset();
  }, [captchaToken, collectionId, inviteMembers, invites]);

  React.useEffect(() => {
    if (captchaToken) {
      handleInviteFormSubmit();
    }
  }, [captchaToken]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setFollowers(
      invites
        .filter((invite) => !searchBy || invite.email.includes(searchBy))
        .sort((a, b) => {
          if (sortBy.id === 'paid') {
            if (a.paid === b.paid) {
              return 0;
            }

            return a.paid ? 1 : -1;
          }
          if (sortBy.id === 'status') {
            const statusOrderIdx = STATUS_ORDER.indexOf(a.status);

            if (statusOrderIdx !== -1) {
              return statusOrderIdx + 1;
            }
          }

          return a.sentAt > b.sentAt ? 1 : a.sentAt < b.sentAt ? -1 : 0;
        })
    );
  }, [invites, searchBy, sortBy]);

  React.useEffect(() => {
    if (status === undefined) {
      setInviteCount(invites.length);
    } else if (inviteStatus === 'pending' && status === 'success') {
      setSentCount(invites.length - inviteCount);
      setInviteCount(invites.length);
    }
    setInviteStatus(status);
  }, [inviteCount, inviteStatus, invites, status]);

  const deleteFollowUp = React.useCallback(() => {
    if (invite) {
      deleteInvite({
        collection: collectionId,
        invite: invite.id,
      });
      setInvite({});
      hideDeleteConfirm();
    }
  }, [invite, deleteInvite, collectionId, hideDeleteConfirm]);

  const sendFollowUp = React.useCallback(
    (invite) => {
      if (invite) {
        remindInvite({
          collection: collectionId,
          invite: invite.id,
        });
      }
    },
    [collectionId, remindInvite]
  );

  return (
    <Panel heading="Share with a Cheddar Up invite">
      <p className="f5 avenir-light gray-350">
        Send a friendly email with an invitation to view your collection page.
      </p>
      <InviteForm
        ref={formRef}
        className="mt3"
        onSendTest={handleSendTest}
        onSubmit={executeRecaptcha}
        status={status !== 'success' || sentCount > 0 ? status : false}
        statusMessages={{
          pending: 'Sending invites...',
          success: `${pluralize('invite', sentCount, true)} sent!`,
          failure: 'Failed to send invites.',
        }}
      />

      {Boolean(invites) && invites.length !== 0 && (
        <div className="invite-list-container mt4 bg-white ba b--gray-300 br2-ns overflow-x-scroll">
          <div className="list-header-container ph4 flex items-center bb b--gray-300">
            <p className="f6 avenir-roman dark-grey">Invites Sent</p>
            <div className="ml3 w4">
              <CommonDropdownSelect
                className="header-control-height"
                titleClassName="f7"
                title={sortBy.name}
                borderColor={colors.gray}
                options={sorts.map((c) => ({
                  title: c.name,
                  value: c.id,
                  onClick: () => {
                    setSortBy(c);
                  },
                }))}
              />
            </div>
            <div className="flex-auto mw5 ml3 relative self-stretch flex">
              <SearchForm
                className="header-control-height self-center"
                iconClassName="gray-400"
                form="ShareInviteListForm"
                initialValues={{term: searchBy}}
                onSubmit={({term}) => {
                  setSearchBy(term);
                }}
              />
              {searchBy.length !== 0 && followers.length === 0 && (
                <p className="absolute no-results-label mt1 f7 avenir-roman truncate brand">
                  No results found
                </p>
              )}
            </div>
            <div className="flex-auto" />
            <CommonButton
              backgroundColorSet
              className="header-control-height ph4 white bg-tint avenir-roman"
              onClick={onClickReminders}
            >
              <span className="f7 avenir-roman">Reminders</span>
            </CommonButton>
            <CommonButton
              backgroundColorSet
              className="ml2 header-control-height ph4 dark-grey bg-gray-250"
              onClick={onClickSendMessage}
            >
              <span className="f7 avenir-roman">Send a Message</span>
            </CommonButton>
          </div>
          <div className="pv2 bb b--gray-300 ph4 flex gray-600 f8">
            <div className="w-30 mr4">Recipient</div>
            <div className="w-10 mr5">Activity</div>
            <div className="w-20">Status</div>
          </div>
          <FollowersList
            status={deleteInviteStatus}
            fromSearch={Boolean(searchBy)}
            followers={followers.slice(
              page * INVITES_PER_PAGE,
              (page + 1) * INVITES_PER_PAGE
            )}
            onFollowUpSend={sendFollowUp}
            onFollowUpDelete={openDeleteConfirm}
          />
          {followers.length > INVITES_PER_PAGE && (
            <div className="flex pv3 ph4 justify-end bg-white">
              <Paginator
                page={page}
                perPage={INVITES_PER_PAGE}
                total={followers.length}
                onPageChange={({selected}) => setPage(selected)}
              />
            </div>
          )}
        </div>
      )}
      <Recaptcha
        ref={recaptchaRef}
        size="invisible"
        badge="bottomright"
        sitekey="6LdqOlMUAAAAAGEUIK5jzFytOGxS-sHfvQiIhFjn"
        onResolved={setCaptchaToken}
      />
      {showDeleteConfirm && (
        <VerificationPrompt
          flexibleHeight
          onDismiss={hideDeleteConfirm}
          title="Are you sure?"
          description={`You are going to delete ${invite.email} from the invited list. This cannot be undone.`}
          okButtonLabel="Delete"
          onOkButtonClick={deleteFollowUp}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={hideDeleteConfirm}
        />
      )}
      <style jsx>{`
        .invite-list-container {
          min-width: 44rem;
        }
        .list-header-container {
          height: 6rem;
        }
        .no-results-label {
          bottom: 0.5rem;
        }
        :global(.header-control-height) {
          height: 1.875rem;
        }
      `}</style>
    </Panel>
  );
};

const enhance = compose(
  asyncConnect((props) => [
    {
      payload: {
        collection: props.collectionId,
      },
      promise: getInvites,
      type: GET_INVITES,
    },
  ]),
  connect(
    ({form, async: {statuses}, members: {invites}}) => ({
      invites,
      formValues: get(form[displayName], 'values', {}),
      status: statuses[INVITE_MEMBERS],
    }),
    {
      sendTest,
      inviteMembers,
      deleteInvite,
      remindInvite,
    }
  ),
  withHandlers({
    handleSendTest: (props) => (event) => {
      event.preventDefault();
      const {message} = props.formValues;
      props.sendTest({message, collectionId: props.collection.id});
    },
  })
);

const EnhancedShareInvite = enhance(ShareInvite);

export default EnhancedShareInvite;
