import {Helmet} from 'react-helmet';
import {animateScroll} from 'react-scroll';
import React from 'react';
import config from 'config';
import cx from 'classnames';

import Button from './Button';
import Logo from './Logo';
import NavigationBar from './NavigationBar';

const PAGE_OFFSET = 64;

class LandingPage extends React.Component {
  handleGetStartedClick = () => {
    animateScroll.scrollToTop({duration: 400});
  };

  renderFeatureBlock = ({title, subtitle, iconSrc}) => (
    <div
      key={title}
      className="flex-0-auto flex flex-column flex-wrap ph4 mb4 items-center"
    >
      <div className="feature-icon-wrapper mb3">
        <img className="feature-icon" alt="Feature" src={iconSrc} />
      </div>
      <div className="feature-text-container flex flex-column flex-wrap items-center">
        <h4 className="mb3 tc avenir-heavy">{title}</h4>
        <p className="tc lh-copy avenir-light gray-500">{subtitle}</p>
      </div>
      <style jsx>{`
        .flex-0-auto {
          flex: 0 1 auto;
        }
        .feature-icon-wrapper {
          height: 92px;
        }
        .feature-icon {
          width: 92px;
        }
        .feature-text-container {
          width: 260px;
        }
      `}</style>
    </div>
  );

  render() {
    const {heroTextColorWhite, metaDescriptionNoun} = this.props;

    return (
      <>
        <Helmet defer={false}>
          <meta
            name="description"
            content={`The easiest way to move payments and forms online for your ${metaDescriptionNoun}.`}
          />
          <meta property="og:site_name" content={config.strings.name} />
          <meta property="og:locale" content="en_US" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@cheddarup" />
          <meta property="twitter:creator" content="@cheddarup" />
          <meta property="fb:app_id" content="413118622200717" />
        </Helmet>
        <NavigationBar title={<Logo />} />
        <div className="landing-page-container absolute left-0 right-0 bottom-0">
          <div className="landing-page-content-container flex flex-column bg-white">
            <div
              className="introduction-container flex flex-wrap justify-center pb3"
              style={{
                backgroundColor: this.props.backgroundColor,
              }}
            >
              <div className="flex-0-auto measure ph3 ph4-ns">
                <h2
                  className={cx(
                    'f1 avenir-medium',
                    heroTextColorWhite && 'white'
                  )}
                >
                  {this.props.heading}
                </h2>
                <p
                  className={cx(
                    'introduction-text-subheading pv3 f3 lh-copy avenir-light',
                    heroTextColorWhite && 'white'
                  )}
                >
                  {this.props.subheading}
                </p>
              </div>
              <div className="flex-0-auto pv3 ph3 ph4-ns">
                {this.props.renderSignUpForm()}
                <p
                  className={cx(
                    'mt3 tc f6 avenir-roman',
                    heroTextColorWhite ? 'white' : 'gray-400'
                  )}
                >
                  By continuing, I agree to {config.strings.name}&apos;s{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={config.links.terms}
                  >
                    Terms of Use
                  </a>
                </p>
              </div>
            </div>
            <div className="flex mb3 justify-center">
              <div className="flex w-100 justify-center items-center overflow-hidden">
                <img
                  className="devices-swoosh-img w-100 h-auto"
                  alt=""
                  src={this.props.devicesImageSrc}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {this.props.features.map(this.renderFeatureBlock)}
            </div>
            {this.props.onClickHowItWorks && (
              <div className="flex flex-column flex-wrap mv3 items-center">
                <Button
                  backgroundColorSet={Boolean(
                    this.props.howItWorksButtonClassName
                  )}
                  className={this.props.howItWorksButtonClassName}
                  onClick={this.props.onClickHowItWorks}
                >
                  See how it works
                </Button>
              </div>
            )}
            <div className="separator mv5 bg-gray-400" />
            <div className="citation-container flex flex-column flex-wrap items-center">
              <h3 className="mb3 f2 tc avenir-roman">
                {this.props.feedback.heading}
              </h3>
              <p className="tc f4 lh-copy avenir-light">
                {this.props.feedback.text}
              </p>
              <img
                className="cite-avatar mv3"
                alt="Avatar"
                src={this.props.feedback.avatarSrc}
              />
              <p className="tc f6 ttu avenir-heavy">
                {this.props.feedback.author}
              </p>
              <Button
                backgroundColorSet
                className="mt5 bg-brand"
                onClick={this.handleGetStartedClick}
              >
                <span className="ph5">Get started for FREE</span>
              </Button>
            </div>
          </div>
          <style jsx>{`
            .flex-0-auto {
              flex: 0 1 auto;
            }
            .landing-page-container {
              top: ${NavigationBar.height}px;
            }
            .landing-page-content-container {
              padding-bottom: ${PAGE_OFFSET}px;
            }
            .introduction-text-subheading {
              max-width: 480px;
            }
            .separator {
              height: 1px;
              margin-left: 10%;
              margin-right: 10%;
            }
            .citation-container {
              margin-left: 10%;
              margin-right: 10%;
            }
            .cite-avatar {
              width: 60px;
            }
            .introduction-container {
              padding-top: ${PAGE_OFFSET}px;
            }
            @media (max-width: 30em) {
              .introduction-container {
                padding-top: ${PAGE_OFFSET / 2}px;
              }
              .devices-swoosh-img {
                width: 200%;
              }
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default LandingPage;
