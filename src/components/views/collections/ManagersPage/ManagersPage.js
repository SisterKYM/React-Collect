import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFetcher} from 'rest-hooks';
import {FaCheck, FaExclamationCircle} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import config from 'config';
import {CommonButton, AddManagerForm} from 'elements';
import {CollectionsLayout, CollectionsMobileLayout} from 'layout';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import ManagerResource from 'resources/ManagerResource';

import {ManagerList} from './components';

const ManagersPage = () => {
  const session = useSelector((state) => state.session);
  const isTeamUser = useMemo(() => session?.isTeamUser, [session]);

  const [managers, setManagers] = useState([]);
  const [fetchCommand, setFetchCommand] = useState(false);

  useEffect(() => {
    setFetchCommand(true);
  }, []);

  const fetchManagers = useFetcher(ManagerResource.listShape());
  useEffect(() => {
    async function fetch() {
      const fetchedManagers = await fetchManagers({});
      setManagers(fetchedManagers);
    }
    if (isTeamUser && fetchCommand) {
      fetch();
      setFetchCommand(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTeamUser, fetchCommand]);
  const dispatch = useDispatch();
  const [inviteManagerFormVisible, setInviteManagerFormVisible] = useState(
    false
  );

  const showInviteManagerForm = useCallback(() => {
    setInviteManagerFormVisible(true);
  }, []);

  const hideInviteManagerForm = useCallback(() => {
    setInviteManagerFormVisible(false);
  }, []);

  const inviteManager = useFetcher(ManagerResource.inviteShape());
  const [inviteManagerStatus, setInviteManagerStatus] = useState('success');
  const handleSubmit = useCallback(
    async (values) => {
      try {
        setInviteManagerStatus('pending');
        const {email, firstName, lastName} = values;
        await inviteManager(
          {},
          {
            invited_email: email,
            name: `${firstName} ${lastName}`,
            access_scope: {
              collections: {
                all: {
                  receive_messages: true,
                },
                type: 'all',
                create: true,
                specific: {},
              },
            },
          }
        );
        dispatch(
          successAlert({
            icon: FaCheck,
            title: 'Invite sent!',
            body: `Manager invite sent to: ${email}`,
          })
        );
        setInviteManagerStatus('success');
        setFetchCommand(true);
        hideInviteManagerForm();
      } catch (e) {
        setInviteManagerStatus('');
        dispatch(
          errorAlert({
            title: 'Sorry!',
            body: `Manager with email ${values.email} is already invited. Please try another email.`,
            icon: FaExclamationCircle,
          })
        );
      }
    },
    [dispatch, hideInviteManagerForm, inviteManager]
  );

  const updateManager = useFetcher(ManagerResource.updateShape());
  const onUpdateManager = useCallback(
    async (payload) => {
      try {
        await updateManager(payload, payload);
      } catch (e) {
        console.log('update error', e);
      }
      setFetchCommand(true);
    },
    [updateManager]
  );

  const remindManager = useFetcher(ManagerResource.remindShape());
  const [remindManagerPending, setRemindManagerPending] = useState(false);
  const onRemindManager = useCallback(
    async (payload) => {
      try {
        setRemindManagerPending(true);
        await remindManager(payload, payload);
        dispatch(
          successAlert({
            icon: FaCheck,
            title: 'Success',
            body: `Invitation re-sent to: ${payload.email}`,
          })
        );
      } catch (e) {
        console.log('remind error', e);
      }
      setRemindManagerPending(false);
      setFetchCommand(true);
    },
    [dispatch, remindManager]
  );

  const removeManager = useFetcher(ManagerResource.removeShape());
  const onDeleteManager = useCallback(
    async (payload) => {
      try {
        await removeManager(payload, payload);
      } catch (e) {
        console.log('remove error', e);
      }
      setFetchCommand(true);
    },
    [removeManager]
  );

  return (
    <>
      <div className="dn db-ns">
        <CollectionsLayout>
          <h1 className="title avenir-roman dark-grey">Managers</h1>
          <h2 className="sub-title avenir-roman gray-700">
            Invite others to help manage {config.strings.collection}s
          </h2>
          <div className="flex-fill horizontal-flex">
            <div className="flex-fill vertical-flex">
              <p className="lh1 light-grey mb4">
                When you add a manager, you give them access to edit, view
                payments, and receive payment email notifications on specific{' '}
                {config.strings.collection}s. If given permission, they can also
                create new {config.strings.collection}s. Managers will not be
                able to make withdrawals or view bank information.
              </p>
              {isTeamUser ? (
                <>
                  <div>
                    <ManagerList
                      remindManagerPending={remindManagerPending}
                      managers={managers}
                      isAllPermissionsExpanded={false}
                      updateManager={onUpdateManager}
                      remindManager={onRemindManager}
                      deleteManager={onDeleteManager}
                    />
                  </div>
                  {inviteManagerFormVisible ? (
                    <div className="pa3 mt3 bg-gray-200">
                      <AddManagerForm
                        form="elements/AddManagerForm/Form"
                        status={inviteManagerStatus}
                        onRemoveForm={hideInviteManagerForm}
                        onSubmit={handleSubmit}
                      />
                    </div>
                  ) : (
                    <div className="mb3">
                      <CommonButton
                        className="bg-tint white pt-14"
                        onClick={showInviteManagerForm}
                      >
                        Add a Manager
                      </CommonButton>
                    </div>
                  )}
                </>
              ) : (
                <div className="mb3">
                  <Link to="/collections/managers/i/plans">
                    <CommonButton className="bg-tint white pt-14">
                      Upgrade to Team
                    </CommonButton>
                  </Link>
                </div>
              )}
            </div>
            <div className="right-side" />
          </div>
        </CollectionsLayout>
      </div>
      <div className="dn-ns">
        <CollectionsMobileLayout>
          <div className="pa4">
            <h1 className="title avenir-roman dark-grey">Managers</h1>
            <h2 className="sub-title mobile avenir-roman gray-700">
              Invite others to help manage {config.strings.collection}s
            </h2>
            <p className="lh1 light-grey mb4">
              When you add a manager, you give them access to edit, view
              payments, and receive payment email notifications on specific{' '}
              {config.strings.collection}s. If given permission, they can also
              create new {config.strings.collection}s. Managers will not be able
              to make withdrawals or view bank information.
            </p>
            <div className="mb4">
              <CommonButton
                className="bg-tint white pt-14"
                onClick={showInviteManagerForm}
              >
                Add a Manager
              </CommonButton>
            </div>
            <ManagerList
              remindManagerPending={remindManagerPending}
              managers={managers}
              isAllPermissionsExpanded={false}
              updateManager={onUpdateManager}
              remindManager={onRemindManager}
              deleteManager={onDeleteManager}
            />
          </div>
        </CollectionsMobileLayout>
      </div>
      <style jsx>{`
        .expand-icon {
          height: 24px;
        }
        .upgrade-image {
          max-width: 700px;
        }
        .right-side {
          width: 20rem;
          margin-left: 1.5rem;
        }
      `}</style>
    </>
  );
};

const EnhancedManagersPage = React.memo(ManagersPage);

export default EnhancedManagersPage;
