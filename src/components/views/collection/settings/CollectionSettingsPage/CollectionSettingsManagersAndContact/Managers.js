import React from 'react';

import {Button, CommonDropdownSelect} from 'elements';
import {Link, useHistory} from 'react-router-dom';
import {GoLinkExternal} from 'react-icons/go';
import {scroller} from 'react-scroll';
import CollectionResource from 'resources/CollectionResource';
import {useInvalidator} from 'rest-hooks';
import useMedia from 'hooks/useMedia';
import {SwitchExpandField} from '../components';
import ManagerList from './ManagerList';

const CollectionSettingsManagers = ({
  collection,
  users, // invited managers to the user, but not sure for this collection
  getManagersStatus,
  remindManagerPending,
  onRemindManager,
  onUpdateManager,
}) => {
  const {notSmall} = useMedia();
  const managers = collection.managers;
  const history = useHistory();
  const onAddManager = () => {
    history.push('/user/managers');
  };

  const invalidateCollection = useInvalidator(CollectionResource.detailShape());

  const handleUpdateManager = (manager) => {
    onUpdateManager(manager);
    invalidateCollection({id: collection.id});
  };

  const handleChangeReceiveMessages = (manager) => {
    handleUpdateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          specific: {
            ...manager.access_scope.collections.specific,
            [collection.id]: {
              id: collection.id,
              receive_messages: true,
            },
          },
        },
      },
    });
  };

  const buttonContent = (
    <div className="flex justify-between">
      <span>Add Manager</span>
      <GoLinkExternal size={16} />
    </div>
  );

  const Managers = (
    <div className="avenir-light dark-grey">
      <div className="pb4 text-14 w-80">
        <span>
          When you add a manager to your collection, you give them access to
          edit, view payments, and receive payment email notifications. Managers
          will not be able to make withdrawals or view bank information.
        </span>
        <br />
        <span className="avenir-heavy">
          You can add new managers and edit manager permissions within{' '}
          <Link target="" to="/collections/managers">
            the Managers section
          </Link>
          .
        </span>
      </div>
      {users?.length ? (
        <>
          <CommonDropdownSelect
            className="mr3-ns bg-gray-250"
            selectClassName="ba br2"
            style={{border: '1px solid #D8DCE6'}}
            width="164px"
            title="Add Manager"
            customBody={
              <Link
                target=""
                to="/collections/managers"
                className="pointer mb3 flex justify-between tint"
              >
                <span>Add New Manager</span>
                <GoLinkExternal size={16} />
              </Link>
            }
            options={[
              ...users.map((c) => ({
                title: c.name,
                value: String(c.id),
                onClick: () => {
                  scroller.scrollTo(c.id, {
                    containerId: 'catalog-items-list-container',
                    smooth: true,
                    duration: 300,
                    offset: -240,
                  });
                  handleChangeReceiveMessages(c);
                },
              })),
            ]}
            dropdownProps={{width: '277px'}}
          />
        </>
      ) : (
        <Button
          small
          backgroundColorSet
          className="mr3 bg-gray-250 gray-600 w-20"
          style={{width: '164px', height: '38px'}}
          onClick={onAddManager}
        >
          {buttonContent}
        </Button>
      )}
      {Boolean(managers?.length) && (
        <div className="w-100 w-80-ns pt3 bt b--gray-300 mt4">
          <ManagerList
            collection={collection}
            getManagersStatus={getManagersStatus}
            remindManagerPending={remindManagerPending}
            managers={managers}
            isAllPermissionsExpanded={false}
            remindManager={onRemindManager}
            onUpdateManager={handleUpdateManager}
            notSmall={notSmall}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <SwitchExpandField
        collection={collection}
        label="Give others access to edit, view payments and receive notifications."
        id="collection-settings-managers"
        input={{
          name: 'managers_enabled',
          value: collection.is_team,
        }}
        body={Managers}
        authority="team"
      />
      <style jsx>{`
        :global(.switch-box-switch) {
          display: none;
        }
      `}</style>
    </>
  );
};

export default CollectionSettingsManagers;
