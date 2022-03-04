import React from 'react';

import {Checkbox, CommonDropdownSelect, SwitchBox} from 'elements';

const ScheduleReminders = ({
  onSchedule,
  initialFrequency,
  initialIncludePastPayers,
}) => {
  const frequencyStringMap = [];
  frequencyStringMap[7] = 'Weekly';
  frequencyStringMap[14] = 'Bi-Weekly';
  frequencyStringMap[30] = 'Monthly';

  const [frequency, setFrequency] = React.useState(initialFrequency);
  const [includePastPayers, setIncludePastPayers] = React.useState(
    initialIncludePastPayers
  );

  const handleSwitch = React.useCallback(
    checked => {
      const newFrequency = checked ? 7 : 0;
      setFrequency(newFrequency);
      onSchedule(newFrequency, includePastPayers);
    },
    [includePastPayers, onSchedule, setFrequency]
  );

  const handleClick = React.useCallback(
    freq => {
      setFrequency(freq);
      onSchedule(freq, includePastPayers);
    },
    [includePastPayers, onSchedule, setFrequency]
  );

  const handleCheck = React.useCallback(() => {
    const newIncludePastPayers = !includePastPayers;
    setIncludePastPayers(newIncludePastPayers);
    onSchedule(frequency, newIncludePastPayers);
  }, [frequency, includePastPayers, onSchedule, setIncludePastPayers]);

  return (
    <div>
      <div className="control-wrapper relative br2 bg-white text-grey">
        <span className="gray-600">Schedule Reminders</span>
        <div className="switch-box-wrapper absolute">
          <SwitchBox
            checked={frequency > 0 ? 'checked' : ''}
            onChange={handleSwitch}
          />
        </div>
      </div>
      {frequency > 0 && (
        <>
          <span className="text-14 gray-600">
            Send a weekly, bi-weekly or monthly reminders.
          </span>
          <div className="control-wrapper w-30">
            <CommonDropdownSelect
              className="w-auto"
              title={frequencyStringMap[frequency]}
              options={frequencyStringMap.map((title, freq) => ({
                title,
                onClick: () => handleClick(freq),
              }))}
            />
          </div>

          <div className="control-wrapper flex items-center">
            <Checkbox
              label="Send reminder even if payment was made in the past"
              checked={includePastPayers}
              onChange={handleCheck}
            />
          </div>
        </>
      )}
      <style jsx>{`
        .schedule-reminders-content-container {
          margin-bottom: -12px;
        }
        .control-wrapper {
          margin-top: 12px;
          margin-bottom: 12px;
        }
        .switch-box-wrapper {
          margin-top: -13px;
          right: 8px;
          top: 50%;
        }
        :global(.checkbox-label) {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

const EnhancedScheduleReminders = React.memo(ScheduleReminders);

export default EnhancedScheduleReminders;
