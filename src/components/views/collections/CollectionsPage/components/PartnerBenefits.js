import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import _ from 'lodash';

import {ORGS} from 'data/orgs';
import {CommonButton} from 'elements';
import cx from 'classnames';
import MatildaJaneLogoImage from 'theme/images/MatildaJaneLogo.png';

const PartnerBenefits = ({className}) => {
  const organization = useSelector(
    (state) => state.session && state.session.organization
  );
  const orgLogoSrc = _.get(ORGS, `${organization}.logoSrc`);
  const orgPartnerBenefitsLink = _.get(
    ORGS,
    `${organization}.partnerBenefitsLink`
  );

  const location = useLocation();

  return orgLogoSrc ? (
    <div className={cx('card', className)}>
      <div className="dark-grey">
        <div className="f8 lh1 avenir-roman medium-grey mb2">PARTNER</div>
        <img
          className="org-logo db"
          alt="Org logo"
          src={
            organization === 'matildajane' ? MatildaJaneLogoImage : orgLogoSrc
          }
        />
        <a
          href={
            orgPartnerBenefitsLink ||
            `${location.pathname}/i/orgs/${organization}/how-it-works`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <CommonButton className="pt-14 bg-tint white">
            Your Partner Benefits
          </CommonButton>
        </a>
      </div>
      <style jsx>{`
        .side-element {
          display: inline-block;
          max-width: 100%;
          width: 20rem;
          min-height: 10.625rem;
          padding: 1.6875rem;
        }
        .card {
          background-color: #ffffff;
          box-shadow: 0px 1px 3px #0000000a;
          border: 1px solid #eaedf3;
          border-radius: 4px;
        }
        .right-side .side-element.card:not(:last-child) {
          margin-bottom: 0.75rem;
        }
        .org-logo {
          margin-bottom: 20px;
          max-height: 70px;
        }
      `}</style>
    </div>
  ) : null;
};

export default React.memo(PartnerBenefits);
