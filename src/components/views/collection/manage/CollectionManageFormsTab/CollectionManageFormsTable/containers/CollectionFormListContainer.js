import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {Status} from 'elements';

import {NoForms, CollectionFormRow} from '../components';

class CollectionFormListContainer extends React.PureComponent {
  renderForm = (form) => (
    <CollectionFormRow
      key={form.id}
      browser={this.props.browser}
      userBasic={this.props.userBasic}
      form={form}
      collection={this.props.collection}
      history={this.props.history}
    />
  );

  render() {
    const {forms, collection, getFormsStatus} = this.props;

    if (!getFormsStatus || getFormsStatus !== 'success') {
      return (
        <div className="flex w-100 pa5 justify-center">
          <Status
            status={getFormsStatus || 'pending'}
            messages={{
              failure: 'Cannot load forms, please try again.',
            }}
          />
        </div>
      );
    }

    if (forms?.length) {
      return forms.map(this.renderForm);
    }
    return <NoForms collection={collection} />;
  }
}

const enhance = compose(
  connect((state) => ({
    browser: state?.browser,
    userBasic:
      !state?.session ||
      (!state.session.isTeamUser && !state.session.isProUser),
  }))
);

const EnhancedCollectionFormListContainer = enhance(
  CollectionFormListContainer
);

export default EnhancedCollectionFormListContainer;
