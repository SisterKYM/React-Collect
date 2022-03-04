import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import apiClient from 'helpers/apiClient';

import {GET_ORG_MEMBERS} from 'redux/modules/orgMembers/constants';
import {asyncConnect} from 'helpers';
import {getOrgMembers, removeOrgMember} from 'redux/modules/orgMembers/actions';

import {MemberTable} from './components';

class MemberTableContainer extends React.PureComponent {
  state = {
    sortConfig: null,
    queryConfig: {},
  };

  updateOrgMembersQuery = partialQueryConfig => {
    this.setState(
      prevState => ({
        queryConfig: {
          ...prevState.queryConfig,
          ...partialQueryConfig,
        },
      }),
      () => {
        this.props.onGetOrgMembers({query: this.state.queryConfig});
      }
    );
  };

  handleSearchByKeyword = searchKeyword => {
    if (searchKeyword !== this.props.searchKeyword) {
      this.updateOrgMembersQuery({search: searchKeyword});
    }
  };

  handleSort = sortKey => {
    this.setState(
      prevState => ({
        sortConfig: {
          key: sortKey,
          direction:
            prevState.sortConfig &&
            sortKey === prevState.sortConfig.key &&
            prevState.sortConfig.direction === 'asc'
              ? 'desc'
              : 'asc',
        },
      }),
      () => {
        this.updateOrgMembersQuery({
          sort: this.state.sortConfig.key,
          direction: this.state.sortConfig.direction,
        });
      }
    );
  };

  handleChangePaginatorPage = page => {
    this.updateOrgMembersQuery({
      page: (page.selected || 0) + 1,
      per_page: this.props.pagination.perPage,
    });
  };

  handleDownloadReport = id => {
    apiClient.fetchAndSave({
      url: `users/exports/account_by_organization.xlsx?user_id=${id}`,
      fileName: `account_by_organization-${id}.xlsx`,
    });
  };

  handleRemoveOrgMember = id => {
    this.props.onRemoveOrgMember({id});
  };

  render() {
    return (
      <MemberTable
        orgMembers={this.props.orgMembers}
        pagination={this.props.pagination}
        initialSearchKeyword={this.props.searchKeyword}
        sortConfig={this.state.sortConfig}
        onSort={this.handleSort}
        onSearchByKeyword={this.handleSearchByKeyword}
        onChangePaginatorPage={this.handleChangePaginatorPage}
        onDownloadReport={this.handleDownloadReport}
        onRemoveOrgMember={this.handleRemoveOrgMember}
      />
    );
  }
}

const enhance = compose(
  asyncConnect([
    {
      key: GET_ORG_MEMBERS,
      promise: getOrgMembers,
    },
  ]),
  connect(
    state => ({
      orgMembers: state.orgMembers.orgMembers || [],
      pagination: state.orgMembers.pagination,
      searchKeyword: state.orgMembers.search,
    }),
    dispatch => ({
      onGetOrgMembers: payload => dispatch(getOrgMembers(payload)),
      onRemoveOrgMember: payload => dispatch(removeOrgMember(payload)),
    })
  )
);

const EnhancedMemberTableContainer = enhance(MemberTableContainer);

export default EnhancedMemberTableContainer;
