import {FaTrash} from 'react-icons/fa';
import {IoIosDownload} from 'react-icons/io';
import React from 'react';
import apiClient from 'helpers/apiClient';

import {Button, Paginator, SearchForm, Table} from 'elements';
import {colors} from 'theme/constants';

const MEMBER_INVITES_PER_PAGE = 50;
const HEADER_CELLS = [
  {
    sortKey: 'first_name',
    title: 'First Name',
  },
  {
    sortKey: 'last_name',
    title: 'Last Name',
  },
  {
    sortKey: 'email',
    title: 'Email Address',
  },
  {
    sortKey: 'created_user_id',
    title: 'Active',
  },
  {
    sortKey: 'status',
    title: 'Email Status',
  },
  {
    title: 'Resend',
  },
  {
    title: 'Remove',
  },
];

const getFriendlyStatus = invite => {
  const statusMap = {
    open: 'Opened',
    delivered: 'Delivered',
    bounce: 'Bounced',
    sent: 'Sending',
    processed: 'Sent',
    click: 'Read',
    dropped: 'Failed',
  };

  return invite.status ? statusMap[invite.status] || 'Unknown' : 'Unknown';
};

class MemberInviteTable extends React.PureComponent {
  handleSubmitSearchForm = values => {
    this.props.onSearchByKeyword(values.term);
  };

  render() {
    const {resentInvitations, pagination} = this.props;

    return (
      <div className="flex flex-column">
        <div className="flex justify-between">
          <div className="flex justify-between w-third">
            <div className="w-80 mb2">
              <SearchForm
                enableReinitialize
                form="MemberInviteTable-SearchForm"
                initialValues={{term: this.props.initialSearchKeyword}}
                onSubmit={this.handleSubmitSearchForm}
              />
            </div>
            {this.props.onResendToAll && (
              <div className="w-20 ml2 mb2">
                <Button
                  small
                  disabled={resentInvitations.length !== 0}
                  onClick={this.props.onResendToAll}
                  type="Submit"
                >
                  Resend To All
                </Button>
              </div>
            )}
          </div>
          <div className="w-10 mb2 justify-end tr">
            <a
              href="#"
              onClick={() => {
                apiClient.fetchAndSave({
                  url: `users/org_member_invites/invites.xlsx`,
                  fileName: `invites.xlsx`,
                });
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IoIosDownload
                className="pa2 br2 bg-tint"
                size={40}
                color={colors.white}
              />
            </a>
          </div>
        </div>
        <Table
          className="mt2"
          sortConfig={this.props.sortConfig}
          headerCells={HEADER_CELLS}
          cells={this.props.memberInvites.map(memberInvite => {
            const inviteAccepted = Boolean(memberInvite.created_user_id);

            const handleClickResend = () => {
              this.props.onResendInvitation(memberInvite.id);
            };
            const handleClickRemove = () => {
              this.props.onRemoveMemberInvite(memberInvite.id);
            };

            return {
              id: memberInvite.id,
              data: [
                {title: memberInvite.profile.first_name},
                {title: memberInvite.profile.last_name},
                {title: memberInvite.profile.email},
                {title: inviteAccepted ? 'Yes' : '-'},
                {title: getFriendlyStatus(memberInvite)},
                {
                  title: (
                    <div className="tc">
                      {inviteAccepted ||
                      resentInvitations.includes(memberInvite.id) ? (
                        '-'
                      ) : (
                        <span
                          className="tint pointer"
                          onClick={handleClickResend}
                        >
                          Resend
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  title: (
                    <div className="tc">
                      {inviteAccepted ? (
                        '-'
                      ) : (
                        <FaTrash
                          className="gray-400 pointer"
                          onClick={handleClickRemove}
                        />
                      )}
                    </div>
                  ),
                },
              ],
            };
          })}
          onSort={this.props.onSort}
        />
        {pagination.total > MEMBER_INVITES_PER_PAGE && (
          <div className="flex mt6 justify-end">
            <Paginator
              onPageChange={this.props.onChangePaginatorPage}
              page={pagination.page - 1}
              perPage={pagination.perPage}
              total={pagination.total}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MemberInviteTable;
