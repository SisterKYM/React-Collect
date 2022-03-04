import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {Checkbox} from 'elements';

const MembersList = ({members, change}) => {
  const [selectedFilter, switchSelectedFilter] = React.useState(null);
  const usesVisitorReport = useSelector((state) =>
    _.get(state.collections, 'collection.payer_identify')
  );
  const membersWithDisplayName = (members || [])
    .filter((m) => Boolean(m.email))
    .map((m) => {
      m.displayName = m.email;
      if (m.name) {
        m.displayName = `${m.name} (${m.email})`;
      }

      return m;
    });

  const paid = membersWithDisplayName.filter(
    (member) => member.payments.length
  );
  const visitors = membersWithDisplayName.filter(
    (member) => !member.payments.length
  );
  const unpaidInvites = visitors.filter((member) => member.invites.length);
  const usesInvites = unpaidInvites.length > 0;
  let all = membersWithDisplayName;
  if (usesInvites && usesVisitorReport) {
    all = membersWithDisplayName;
  } else if (usesInvites) {
    all = membersWithDisplayName.filter((member) => member.invites.length);
  } else if (!usesVisitorReport) {
    all = paid;
  }

  const visibleMembers = React.useMemo(() => {
    switch (selectedFilter) {
      case 'paid':
        return paid;
      case 'unpaid':
        return unpaidInvites;
      case 'visitors':
        return visitors;
      case 'all':
      default:
        return all;
    }
  }, [all, paid, selectedFilter, unpaidInvites, visitors]);

  const heads = React.useMemo(() => {
    const allBox = {
      checked: false,
      key: 'all',
      label: `All (${all.length})`,
    };
    const paidBox = {
      checked: false,
      key: 'paid',
      label: `Paid (${paid.length})`,
    };
    const unpaidBox = {
      checked: false,
      key: 'unpaid',
      label: `Not Paid (${unpaidInvites.length})`,
    };
    const visitorsBox = {
      checked: false,
      key: 'visitors',
      label: `Visitors (${visitors.length})`,
    };

    if (usesInvites) {
      return [allBox, paidBox, unpaidBox];
    }
    if (usesVisitorReport) {
      return [allBox, paidBox, visitorsBox];
    }

    return [paidBox];
  }, [
    all.length,
    paid.length,
    unpaidInvites.length,
    visitors.length,
    usesInvites,
    usesVisitorReport,
  ]);

  const switchFilter = React.useCallback(
    (key) => {
      switchSelectedFilter(key);
      switch (key) {
        case 'all':
          return all.map((member) => change(`sendTo_${member.id}`, member.id));
        case 'paid':
          paid.map((member) => change(`sendTo_${member.id}`, member.id));

          return _.differenceBy(all, paid, 'id').map((member) =>
            change(`sendTo_${member.id}`, null)
          );
        case 'unpaid':
          unpaidInvites.map((member) =>
            change(`sendTo_${member.id}`, member.id)
          );

          return _.differenceBy(all, unpaidInvites, 'id').map((member) =>
            change(`sendTo_${member.id}`, null)
          );
        case 'visitors':
          visitors.map((member) => change(`sendTo_${member.id}`, member.id));

          return _.differenceBy(all, visitors, 'id').map((member) =>
            change(`sendTo_${member.id}`, null)
          );
        default:
          return all.map((member) => change(`sendTo_${member.id}`, null));
      }
    },
    [all, change, paid, unpaidInvites, visitors]
  );

  return (
    <div className="ba b--gray-300 br2">
      <div className="flex pa3 items-center">
        {heads.map((head, i) => (
          <div className={i ? 'ml3 text-14' : ''} key={i}>
            <Checkbox
              isRadio
              checked={selectedFilter === head.key}
              label={head.label}
              labelStyle={{
                lineHeight: '20px',
              }}
              name="filter"
              onChange={() => switchFilter(head.key)}
            />
          </div>
        ))}
      </div>
      <div className="members-list pa3 overflow-auto bt b--gray-300">
        <ul>
          {visibleMembers.map((member, i) => (
            <li className={`text-14 ${i ? 'mt3' : ''}`} key={i}>
              <Field
                checkedOnValue
                checked={member.checked}
                component={Checkbox}
                label={member.displayName}
                labelStyle={{
                  lineHeight: '20px',
                }}
                // normalize={v => (v ? member.id : null)}
                name={`sendTo_${member.id}`}
              />
            </li>
          ))}
        </ul>
        <style jsx>{`
          .members-list {
            max-height: 165px;
          }
        `}</style>
      </div>
    </div>
  );
};

const EnhancedMembersList = Object.assign(React.memo(MembersList), {
  propTypes: {
    members: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number,
        payments: PropTypes.arrayOf(PropTypes.object),
      })
    ),
  },
});

export default EnhancedMembersList;
