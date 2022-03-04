import {FaTrash} from 'react-icons/fa';
import {IoIosDownload} from 'react-icons/io';
import React from 'react';
import apiClient from 'helpers/apiClient';
import {capitalize} from 'lodash';

import config from 'config';
import {Paginator, SearchForm, Table} from 'elements';
import {colors} from 'theme/constants';
import {currency} from 'helpers/numbers';

const MEMBERS_PER_PAGE = 50;
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
    sortKey: 'display_name',
    title: 'Organization',
  },
  {
    title: 'Total Collected',
  },
  {
    title: `# of ${capitalize(config.strings.collection)}s`,
  },
  {
    title: 'Report',
  },
  {
    title: 'Remove',
  },
];

class MemberTable extends React.PureComponent {
  handleSubmitSearchForm = (values) => {
    this.props.onSearchByKeyword(values.term);
  };

  render() {
    const {pagination} = this.props;

    return (
      <div className="flex flex-column">
        <div className="flex justify-between">
          <div className="flex justify-between w-third">
            <div className="w-80 mb2">
              <SearchForm
                enableReinitialize
                form="MemberTable-SearchForm"
                initialValues={{term: this.props.initialSearchKeyword}}
                onSubmit={this.handleSubmitSearchForm}
              />
            </div>
          </div>
          <div className="w-10 mb2 justify-end tr">
            <a
              href="#"
              onClick={() => {
                apiClient.fetchAndSave({
                  url: `users/org_members/members.xlsx`,
                  fileName: `members.xlsx`,
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
          cells={this.props.orgMembers.map((orgMember) => {
            const handleClickDownloadReport = () => {
              this.props.onDownloadReport(orgMember.id);
            };
            const handleClickRemove = () => {
              this.props.onRemoveOrgMember(orgMember.id);
            };

            return {
              id: orgMember.id,
              data: [
                {title: orgMember.first_name},
                {title: orgMember.last_name},
                {title: orgMember.email},
                {
                  title:
                    typeof orgMember.display_name === 'string'
                      ? orgMember.display_name
                      : '-',
                },
                {
                  title: orgMember.collector_stats
                    ? currency(orgMember.collector_stats.total_payments)
                    : '-',
                },
                {
                  title: orgMember.collector_stats
                    ? orgMember.collector_stats.number_collections
                    : 0,
                },
                {
                  title: (
                    <span
                      className="tc tint pointer"
                      onClick={handleClickDownloadReport}
                    >
                      download
                    </span>
                  ),
                },
                {
                  title: (
                    <div className="tc">
                      <FaTrash
                        className="gray-400 pointer"
                        onClick={handleClickRemove}
                      />
                    </div>
                  ),
                },
              ],
            };
          })}
          onSort={this.props.onSort}
        />
        {pagination.total > MEMBERS_PER_PAGE && (
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

export default MemberTable;
