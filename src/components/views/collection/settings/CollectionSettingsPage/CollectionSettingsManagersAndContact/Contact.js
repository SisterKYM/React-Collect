import React, {useState} from 'react';

import {Button, CommonDropdownSelect} from 'elements';
import {useFetcher} from 'rest-hooks';
import CollectionResource from 'resources/CollectionResource';

import {get} from 'lodash';
import {GoLinkExternal} from 'react-icons/go';
import {Link, useHistory} from 'react-router-dom';
import {scroller} from 'react-scroll';
import {SwitchExpandField} from '../components';

const CollectionSettingsContact = ({collection, managers}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const history = useHistory();
  const organizer = collection.organizer;

  const [contactId, setContactId] = useState(
    get(collection, 'contact_manager_id', false)
  );

  const onAddManager = () => {
    history.push('/collections/managers');
  };

  const buttonContent = (
    <div className="flex justify-between">
      <span>Add Manager</span>
      <GoLinkExternal size={16} />
    </div>
  );

  const Contacts = (
    <div className="avenir-light dark-grey">
      <div className="pb4 text-14 w-80">
        <span>
          Select a manager to receive email inquiries from the contact link on
          your collection page.
        </span>
      </div>

      {managers.filter((manager) => manager.accepted_at).length > 0 ? (
        <CommonDropdownSelect
          className="mr3-ns bg-gray-250"
          selectClassName="ba br2"
          style={{border: '1px solid #D8DCE6'}}
          width="164px"
          title="Main Contact"
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
            ...[
              organizer,
              ...managers.filter((manager) => manager.accepted_at),
            ].map((c, index) => ({
              title: c.name,
              value: String(c.id),
              onClick: () => {
                scroller.scrollTo(c.id, {
                  containerId: 'catalog-items-list-container',
                  smooth: true,
                  duration: 300,
                  offset: -240,
                });
                setContactId(index > 0 ? c.id : null);
                updateCollection(
                  {id: collection.id},
                  {
                    id: collection.id,
                    contact_manager_id: index > 0 ? c.id : null,
                  }
                ).catch((err) => console.error('ERROR:', err));
              },
            })),
          ]}
          dropdownProps={{width: '277px'}}
        />
      ) : (
        <Button
          small
          backgroundColorSet
          className="mr3 bg-gray-250 gray-600"
          style={{width: '164px', height: '38px'}}
          onClick={onAddManager}
        >
          {buttonContent}
        </Button>
      )}
    </div>
  );

  const richLabel = (
    <div>
      Select main contact for payer inquires:
      <span className="ml1 flamingo">
        {contactId
          ? (() => {
              const manager = managers
                .filter((manager) => manager.accepted_at)
                .find((manager) => manager.id === contactId);
              if (manager) {
                return manager.name;
              }

              return organizer.name;
            })()
          : organizer.name}
      </span>
    </div>
  );

  return (
    <>
      <SwitchExpandField
        collection={collection}
        label={
          collection.is_team
            ? richLabel
            : 'Select a manager to receive email inquiries from the contact link on your collection page.'
        }
        id="collection-settings-contact"
        input={{
          name: 'contact_enabled',
          value: collection.is_team,
        }}
        body={Contacts}
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

export default CollectionSettingsContact;
