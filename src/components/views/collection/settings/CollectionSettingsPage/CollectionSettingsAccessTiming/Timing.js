import 'react-datetime/css/react-datetime.css';
import {IoMdCalendar, IoMdTime} from 'react-icons/io';
import {useFetcher} from 'rest-hooks';
import cx from 'classnames';
import DateTime from 'react-datetime';
import React, {useState} from 'react';

import config from 'config';
import CollectionResource from 'resources/CollectionResource';
import {colors} from 'theme/constants';
import {SwitchExpandField} from '../components';

const CollectionSettingsTiming = ({
  collection,
  collectionHasRecurringItems,
}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());
  const today = React.useMemo(() => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;

    return today;
  }, []);
  const [state, setState] = useState({
    datetime_enabled:
      Boolean(collection.open_datetime) &&
      Boolean(collection.close_datetime) &&
      collection.is_pro,
    open_datetime:
      (collection.open_datetime && new Date(collection.open_datetime)) ||
      new Date(today),
    close_datetime: (() => {
      if (collection.close_datetime) {
        return new Date(collection.close_datetime);
      }
      const openTime =
        (collection.open_datetime && new Date(collection.open_datetime)) ||
        new Date(today);

      return new Date(openTime.getTime() + 60000);
    })(),
    validated:
      !collection.open_datetime ||
      new Date(collection.open_datetime) < new Date(collection.close_datetime),
  });
  const checkValidation = (time, isOpenTime) => {
    if (isOpenTime) {
      setState({
        ...state,
        open_datetime: time,
        validated: time <= state.close_datetime,
      });

      return time <= state.close_datetime;
    }
    setState({
      ...state,
      close_datetime: time,
      validated: time >= state.open_datetime,
    });

    return time >= state.open_datetime;
  };
  const handleChange = (field) => (event) => {
    if (field === 'datetime_enabled') {
      setState({
        ...state,
        [field]: event,
      });
    } else {
      if (field === 'open_datetime') {
        if (!checkValidation(event, true)) {
          return;
        }
        updateCollection(
          {
            id: collection.id,
          },
          {
            id: collection.id,
            open_datetime: event,
            close_datetime: state.close_datetime,
          }
        ).catch((err) => console.error('ERROR:', err));
      } else {
        if (!checkValidation(event, false)) {
          return;
        }
        updateCollection(
          {
            id: collection.id,
          },
          {
            id: collection.id,
            open_datetime: state.open_datetime,
            close_datetime: event,
          }
        ).catch((err) => console.error('ERROR:', err));
      }
    }
  };
  const handleToggle = (event) => {
    if (!event.datetime_enabled) {
      updateCollection(
        {
          id: collection.id,
        },
        {
          id: collection.id,
          open_datetime: null,
          close_datetime: null,
        }
      ).catch((err) => console.error('ERROR:', err));
    } else {
      setState({
        ...state,
        open_datetime: new Date(today),
        close_datetime: new Date(new Date(today).getTime() + 60000),
      });
      updateCollection(
        {
          id: collection.id,
        },
        {
          id: collection.id,
          open_datetime: new Date(today),
          close_datetime: new Date(new Date(today).getTime() + 60000),
        }
      ).catch((err) => console.error('ERROR:', err));
    }
  };

  const TimingContent = (
    <>
      <div className="avenir-light dark-grey">
        <div className="pb2 text-14">
          Control when people can access your collection page. Prior to start
          time, visitors see a snazzy countdown timer.
        </div>
        <div className="flex-l items-center mt2">
          <div className="mw7 text-14 flex-ns w-100">
            <div className="mr5-ns mb2-ns mb4 mr1-s w-30-l w-50-m">
              <span className="text-16">Start:</span>
              <div className="flex">
                <div className="w-100 flex justify-end items-end">
                  <DateTime
                    className="date-time mt3 w-100"
                    value={state.open_datetime}
                    onChange={handleChange('open_datetime')}
                  />
                  <div className="date-time-icons">
                    <IoMdCalendar size={16} />
                    <IoMdTime size={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-30-l w-50-m">
              <span className={cx('text-16', !state.validated && 'brand')}>
                End:
              </span>
              <div className="flex flex-column">
                <div className="w-100 flex justify-end items-end">
                  <DateTime
                    className="date-time mt3 w-100"
                    value={state.close_datetime}
                    onChange={handleChange('close_datetime')}
                  />
                  <div className="date-time-icons">
                    <IoMdCalendar size={16} />
                    <IoMdTime size={16} />
                  </div>
                </div>
                {!state.validated && (
                  <span className="text-12 brand mt1 pre-l">
                    Collection must end after start date and time
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(.date-time input) {
          height: 20px;
          border-width: 0;
          border-bottom-width: 1px;
          border-color: ${colors.gray};
        }
        .date-time-icons {
          position: absolute;
        }
        :global(.date-time .rdtPicker td.rdtActive, .date-time
            .rdtPicker
            td.rdtActive:hover) {
          background-color: #257a91;
        }
      `}</style>
    </>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label={`Set a start and end time for your ${config.strings.collection} page`}
      id="collection-settings-timing"
      input={{
        name: 'datetime_enabled',
        value: state.datetime_enabled && !collectionHasRecurringItems,
        onChange: handleChange('datetime_enabled'),
      }}
      body={TimingContent}
      onToggle={handleToggle}
      authority="pro"
      warning={
        collectionHasRecurringItems
          ? `Please note: this setting not available on ${config.strings.collection}s with recurring payment items`
          : ''
      }
      disableToggle={collectionHasRecurringItems}
    />
  );
};

export default CollectionSettingsTiming;
