import {connect} from 'react-redux';
import React from 'react';

import {LandingPage} from 'elements';
import {SignUpFormContainer} from 'containers';

class OrgLandingBasePage extends React.PureComponent {
  handleClickHowItWorks = () => {
    this.props.history.push(`${this.props.location.pathname}/how-it-works`);
  };

  renderSignUpForm = () => (
    <SignUpFormContainer
      includePromo={this.props.location.pathname === '/pta-online-payments'}
      submitButtonWhiteBorder={this.props.heroTextColorWhite}
    />
  );

  render() {
    return (
      <LandingPage
        extraSmall={
          this.props.howItWorksVisible ? this.props.extraSmall : undefined
        }
        heroTextColorWhite={this.props.heroTextColorWhite}
        metaDescriptionNoun={this.props.metaDescriptionNoun}
        backgroundColor={this.props.backgroundColor}
        howItWorksButtonClassName={this.props.howItWorksButtonClassName}
        heading={this.props.heading}
        subheading={this.props.subheading}
        features={this.props.features}
        devicesImageSrc={this.props.devicesImageSrc}
        feedback={this.props.feedback}
        renderSignUpForm={this.renderSignUpForm}
        onClickHowItWorks={
          this.props.howItWorksVisible ? this.handleClickHowItWorks : undefined
        }
      />
    );
  }
}

const enhance = connect(state => ({
  extraSmall: state.browser.is.extraSmall,
}));

const EnhancedOrgLandingBasePage = enhance(OrgLandingBasePage);

export default EnhancedOrgLandingBasePage;
