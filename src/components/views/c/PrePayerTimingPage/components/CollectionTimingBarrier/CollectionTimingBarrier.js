import cx from 'classnames';
import moment from 'moment-timezone';
import React from 'react';

import CoundownCell from './CoundownCell';

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);

      return () => clearInterval(intervalId);
    }

    return undefined;
  }, [delay]);
};

const CollectionTimingBarrier = ({
  className,
  publicCollection,
  onTimingDidPass,
}) => {
  const opensMoment = React.useMemo(
    () => moment(publicCollection.timing.opens),
    [publicCollection.timing.opens]
  );

  const [msLeft, setMsLeft] = React.useState(() => opensMoment.diff(moment()));

  useInterval(() => {
    setMsLeft((prevMsLeft) =>
      prevMsLeft > 0 ? prevMsLeft - 1000 : prevMsLeft
    );
  }, 1000);

  React.useEffect(() => {
    if (msLeft < 1) {
      onTimingDidPass();
    }
  }, [msLeft, onTimingDidPass]);

  const date = React.useMemo(
    () =>
      opensMoment.isSame(moment(), 'day')
        ? 'Today'
        : opensMoment.tz(moment.tz.guess()).format('dddd, MMMM Do YYYY'),
    [opensMoment]
  );
  const time = React.useMemo(
    () => opensMoment.tz(moment.tz.guess()).format('hh:mm a z'),
    [opensMoment]
  );

  const coundownComponents = React.useMemo(() => {
    const duration = moment.duration(msLeft);
    return {
      Days: duration.asDays(),
      Hours: duration.hours(),
      Minutes: duration.minutes(),
      Seconds: duration.seconds(),
    };
  }, [msLeft]);

  return (
    <div className={cx('pa4 br2 bg-white shadow-6', className)}>
      <h2 className="f2 lh-copy merriweather tc gray-600">
        {publicCollection.name}
      </h2>
      <p className="f5 tc mt4 lh-copy dark-grey">
        Starts: {date} at {time}
      </p>
      <div className="countdown-container center flex mt4 justify-between">
        {Object.keys(coundownComponents)
          .filter(
            (title) =>
              title === 'Seconds' ||
              title === 'Minutes' ||
              coundownComponents[title] !== 0
          )
          .map((title) => (
            <CoundownCell
              key={title}
              title={title}
              value={coundownComponents[title]}
            />
          ))}
      </div>
      <style jsx>{`
        .countdown-container {
          max-width: 24rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedCollectionTimingBarrier = React.memo(CollectionTimingBarrier);

export default EnhancedCollectionTimingBarrier;
