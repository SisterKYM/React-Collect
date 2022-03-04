import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import config from 'config';
import cx from 'classnames';
import query from 'query-string';

import {BasicLayout} from 'layout';
import {SIGNUP} from 'redux/modules/session/constants';
import {SignUpForm} from 'views/signup/components';
import {Status} from 'elements';
import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {colors} from 'theme/constants';
import {signUp} from 'redux/modules/session/actions';
import {validate} from 'views/signup/components/lib';

const getCountryByCurrency = currency =>
  ({
    USD: 'United States',
    CAD: 'Canada',
  }[currency]);

class BasePage extends React.PureComponent {
  handleSubmit = data => {
    const errors = validate(data, this.props);

    if (this.props.formCountrySelectDisplayed && !data.country) {
      this.props.clearAlerts();
      this.props.errorAlert({
        title: 'Please select currency.',
      });
    } else if (Object.keys(errors).length !== 0) {
      this.props.clearAlerts();

      this.props.errorAlert({
        title: 'Oops!',
        body: `It looks like we're missing some information. All fields are required.`,
      });
    } else {
      const toSignUp = {
        partner: this.props.org,
        invite_code: this.props.inviteCode,
        ...data,
        profile: {
          ...data.profile,
        },
      };

      if (this.props.defaultBestDescribesYou) {
        toSignUp.profile = {
          ...toSignUp.profile,
          bestDescribesYou: this.props.defaultBestDescribesYou,
        };
      }

      toSignUp.profile.referrer = {
        url: query.parse(window.location.search),
      };
      this.props.signUp(toSignUp);
    }
  };

  render() {
    const {
      backgroundUrl,
      error,
      status,
      heading,
      logoUrl,
      location,
      drawerNav,
      subheading,
      primaryNavbar,
      defaultBestDescribesYou,
      formSubmitButtonColor,
      formCountrySelectDisplayed,
      email,
      firstName,
      lastName,
      currency,
      contentWhite,
    } = this.props;

    return (
      <BasicLayout
        className="cover bg-top"
        style={{backgroundImage: `url(${backgroundUrl})`}}
        drawerMenuNav={drawerNav}
        primaryNavbar={primaryNavbar}
      >
        <div className="content-container">
          <div className="w-100 w-60-ns ph4 ph0-ns pb3 center">
            <div className={cx('tc', logoUrl ? 'pt4' : 'pt5')}>
              {Boolean(logoUrl) && (
                <img className="mt3 mb4" alt="Logo" src={logoUrl} />
              )}
              <h1 className={cx('mt1 mb2', contentWhite && 'white')}>
                {heading}
              </h1>
              <p
                className={cx(
                  'mb4 f-regular avenir-light',
                  contentWhite && 'white'
                )}
              >
                {subheading || (
                  <>
                    Have an account?{' '}
                    <Link to={{pathname: '/login', search: location.search}}>
                      Log in
                    </Link>
                  </>
                )}
              </p>
            </div>
            <SignUpForm
              enableReinitialize
              initialValues={{
                email,
                country: getCountryByCurrency(currency),
                first_name: firstName,
                last_name: lastName,
              }}
              defaultBestDescribesYou={defaultBestDescribesYou}
              onSubmit={this.handleSubmit}
              disabled={status === 'pending'}
              countrySelectDisplayed={formCountrySelectDisplayed}
              submitButtonColor={formSubmitButtonColor}
            />
            <p
              className={cx('mt3 tc f6 avenir-roman', contentWhite && 'white')}
            >
              By continuing, I agree to
              {config.isCheddarUp ? " Cheddar Up's" : ''}{' '}
              <a
                className={cx(contentWhite && 'underline white')}
                target="_blank"
                rel="noopener noreferrer"
                href={config.links.terms}
              >
                Terms of Use
              </a>
              {config.links.privacyPolicy && (
                <>
                  {' '}
                  and{' '}
                  <a
                    className={cx(contentWhite && 'underline white')}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={config.links.privacyPolicy}
                  >
                    Privacy Policy
                  </a>
                </>
              )}
            </p>
            <div className="flex mt4 justify-center">
              <Status
                status={status}
                messages={{failure: get(error, 'data.errors.email', null)}}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          img {
            max-width: 20rem;
            max-height: 8rem;
          }
        `}</style>
      </BasicLayout>
    );
  }
}

const enhance = connect(
  ({async: {statuses, errors}}) => ({
    status: statuses[SIGNUP],
    error: errors[SIGNUP],
  }),
  {
    clearAlerts,
    errorAlert,
    signUp,
  }
);

const EnhancedBasePage = Object.assign(enhance(BasePage), {
  propTypes: {
    org: PropTypes.string,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.node,
    logoUrl: PropTypes.string,
    backgroundUrl: PropTypes.string,
    primaryNavbar: PropTypes.object,
    drawerNav: PropTypes.element,
    formCountrySelectDisplayed: PropTypes.bool,
    formSubmitButtonColor: PropTypes.string,
  },
  defaultProps: {
    formCountrySelectDisplayed: true,
    formSubmitButtonColor: colors.orange,
  },
});

export default EnhancedBasePage;
