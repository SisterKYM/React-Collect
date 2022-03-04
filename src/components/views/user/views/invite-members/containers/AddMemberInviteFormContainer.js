import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';
import React from 'react';

import {ADD_MEMBER_INVITES} from 'redux/modules/memberInvites/constants';
import {addMemberInvites} from 'redux/modules/memberInvites/actions';

import {AddMemberForm} from '../components';

class AddMemberInviteFormContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (
      this.props.addMemberInvitesStatus === 'success' &&
      this.props.addMemberInvitesStatus !== prevProps.addMemberInvitesStatus
    ) {
      this.props.onClose();
    }
  }

  handleSubmit = value => {
    this.props.onAddMemberInvites({profiles: [value]});
  };

  render() {
    return (
      <AddMemberForm
        className={this.props.className}
        lessThanMedium={this.props.lessThanMedium}
        addMemberInvitesStatus={this.props.addMemberInvitesStatus}
        country={this.props.country}
        onSubmit={this.handleSubmit}
        onClose={this.props.onClose}
      />
    );
  }
}

const getFormValue = formValueSelector(AddMemberForm.formName);

const enhance = connect(
  state => ({
    lessThanMedium: state.browser.lessThan.medium,
    addMemberInvitesStatus: state.async.statuses[ADD_MEMBER_INVITES],
    country: getFormValue(state, 'country') || 'US',
  }),
  dispatch => ({
    onAddMemberInvites: payload => dispatch(addMemberInvites(payload)),
  })
);

const EnhancedAddMemberInviteFormContainer = enhance(
  AddMemberInviteFormContainer
);

export default EnhancedAddMemberInviteFormContainer;
