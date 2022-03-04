import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {GET_MEMBER_INVITES} from 'redux/modules/memberInvites/constants';
import {asyncConnect} from 'helpers';
import {
  getMemberInvites,
  removeMemberInvite,
  resendMemberInvite,
} from 'redux/modules/memberInvites/actions';

import {MemberInviteTable} from './components';

class MemberInviteTableContainer extends React.PureComponent {
  state = {
    resentInvitations: [],
    sortConfig: null,
    queryConfig: {},
  };

  updateMemberInvitesQuery = partialQueryConfig => {
    this.setState(
      prevState => ({
        queryConfig: {
          ...prevState.queryConfig,
          ...partialQueryConfig,
        },
      }),
      () => {
        this.props.onGetMemberInvites({query: this.state.queryConfig});
      }
    );
  };

  handleSearchByKeyword = searchKeyword => {
    if (searchKeyword !== this.props.searchKeyword) {
      this.updateMemberInvitesQuery({search: searchKeyword});
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
        this.updateMemberInvitesQuery({
          sort: this.state.sortConfig.key,
          direction: this.state.sortConfig.direction,
        });
      }
    );
  };

  handleChangePaginatorPage = page => {
    this.updateMemberInvitesQuery({
      page: (page.selected || 0) + 1,
      per_page: this.props.pagination.perPage,
    });
  };

  handleResendInvitation = invite => {
    this.props.onResendMemberInvite({invite});

    this.setState(prevState => ({
      resentInvitations: [...prevState.resentInvitations, invite],
    }));
  };

  handleResendToAll = () => {
    this.props.onResendToAll(this.state.queryConfig);
  };

  handleRemoveMemberInvite = id => {
    this.props.onRemoveMemberInvite({id});
  };

  render() {
    return (
      <MemberInviteTable
        memberInvites={this.props.memberInvites}
        pagination={this.props.pagination}
        initialSearchKeyword={this.props.searchKeyword}
        resentInvitations={this.state.resentInvitations}
        sortConfig={this.state.sortConfig}
        onSort={this.handleSort}
        onSearchByKeyword={this.handleSearchByKeyword}
        onChangePaginatorPage={this.handleChangePaginatorPage}
        onResendInvitation={this.handleResendInvitation}
        onResendToAll={this.handleResendToAll}
        onRemoveMemberInvite={this.handleRemoveMemberInvite}
      />
    );
  }
}

const enhance = compose(
  asyncConnect([
    {
      key: GET_MEMBER_INVITES,
      promise: getMemberInvites,
    },
  ]),
  connect(
    state => ({
      memberInvites: state.memberInvites.memberInvites || [],
      pagination: state.memberInvites.pagination,
      searchKeyword: state.memberInvites.search,
    }),
    dispatch => ({
      onRemoveMemberInvite: payload => dispatch(removeMemberInvite(payload)),
      onGetMemberInvites: payload => dispatch(getMemberInvites(payload)),
      onResendMemberInvite: payload => dispatch(resendMemberInvite(payload)),
    })
  )
);

const EnhancedMemberInviteTableContainer = enhance(MemberInviteTableContainer);

export default EnhancedMemberInviteTableContainer;
