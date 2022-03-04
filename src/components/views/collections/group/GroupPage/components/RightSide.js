import React from 'react';
import {useSelector} from 'react-redux';
import cx from 'classnames';

import {CommonButton} from 'elements';
import {Link} from 'react-router-dom';

const RightSide = ({
  sharedCollections,
  openAddCollectionsModal,
  openShareLinkModal,
}) => {
  const session = useSelector((state) => state.session);
  const isNotTeamUser = !session?.isTeamUser;
  const mePageLink = `/me/${session?.user?.id}`;
  const hasShareCollections = sharedCollections.length;

  return (
    <>
      <div className="right-side">
        <div className="side-element card">
          <div className="dark-grey">
            <div className="f8 lh1 avenir-roman medium-grey mb2">
              PREVIEW AND SHARE
            </div>
            <div className="text-14 lh1 avenir-light withdraw-amount dark-grey mb3">
              {isNotTeamUser ? (
                <>
                  Preview your Group Page to see your customizations.&nbsp;
                  <Link to="/collections/group/i/plans">
                    <span className="tint">
                      Upgrade to TEAM to publish and share your page.
                    </span>
                  </Link>
                </>
              ) : hasShareCollections ? (
                <>Preview and share your Group Page.</>
              ) : (
                <>
                  Preview your Group Page to see your customizations.&nbsp;
                  <span
                    className="tint pointer"
                    onClick={openAddCollectionsModal}
                  >
                    Add collections to publish and share your page.
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="horizontal-flex">
            <div className="flex-fill">
              <Link to={mePageLink} target="_blank">
                <CommonButton className="pt-14 bg-tint white w-100 mr1">
                  Preview
                </CommonButton>
              </Link>
            </div>
            <div className="flex-fill ml2-5">
              {isNotTeamUser ? (
                <Link to="/collections/group/i/plans">
                  <CommonButton
                    className="pt-14 bg-brand white w-100"
                    onClick={null}
                  >
                    Upgrade
                  </CommonButton>
                </Link>
              ) : (
                <CommonButton
                  className={cx(
                    'pt-14 bg-brand w-100',
                    hasShareCollections ? 'white' : 'medium-grey'
                  )}
                  onClick={openShareLinkModal}
                  disabled={!hasShareCollections}
                >
                  Share
                </CommonButton>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .right-side {
          width: 20rem;
        }
        .side-element {
          display: inline-block;
          max-width: 100%;
          width: 20rem;
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
      `}</style>
    </>
  );
};

export default React.memo(RightSide);
