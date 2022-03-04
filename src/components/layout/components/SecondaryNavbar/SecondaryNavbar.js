import {Link, withRouter} from 'react-router-dom';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import truncate from 'truncate';
import {Tooltip} from 'elements';

import {zIndex as drawerMenuZIndex} from 'layout/components/DrawerMenu';

import SecondaryNavbarNav from './SecondaryNavbarNav';

const vh = 5;
const minHeight = 60;
const zIndex = drawerMenuZIndex;

const SecondaryNavbar = ({collection}) => {
  const rawCollectionName = get(collection, 'name', 'Untitled');
  const collectionName = truncate(get(collection, 'name', 'Untitled'), 40);
  const truncated = rawCollectionName.length > 40;

  return (
    <div className="flex">
      <div className="relative flex-auto flex dn-p items-center f6 shadow-4 bg-gray-550 white">
        <div className="secondary-navbar-content-container flex w-100 ph3 justify-center justify-between-ns items-center f5 f4-m f3-l avenir-roman">
          <div className="dn db-ns f4">
            {truncated ? (
              <Tooltip style={{left: 0, top: -50}} text={rawCollectionName}>
                {collectionName}
              </Tooltip>
            ) : (
              collectionName
            )}
          </div>
          <div className="flex justify-center">
            <SecondaryNavbarNav collection={collection} />
          </div>
        </div>
        <div className="dn flex-ns justify-end">
          {collection && collection.slug && (
            <Link
              target="_blank"
              to={`/c/${collection.slug}`}
              className="white bg-tint"
            >
              <div className="open-in-new-container flex ph3 preview-btn-padding justify-center items-center f4 avenir-roman">
                Preview
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="dn-ns flex">
        {collection && collection.slug && (
          <Link
            target="_blank"
            to={`/c/${collection.slug}`}
            className="white bg-tint"
          >
            <div className="open-in-new-container flex ph3 preview-btn-padding justify-center items-center f4 avenir-roman">
              Preview
            </div>
          </Link>
        )}
      </div>
      <style jsx>{`
        .secondary-navbar-content-container {
          min-height: ${minHeight}px;
          max-height: ${minHeight}px;
        }
        .open-in-new-container {
          min-height: ${minHeight}px;
          max-height: ${minHeight}px;
        }
        .arrow-wrapper {
          z-index: ${zIndex};
          height: 30px;
          width: 30px;
        }
        .preview-btn-padding {
          padding-left: 23;
          padding-right: 31;
        }
        @media (max-width: 30em) {
          .secondary-navbar-content-container {
            z-index: ${zIndex};
          }
        }
      `}</style>
    </div>
  );
};

const EnhancedSecondaryNavbar = Object.assign(withRouter(SecondaryNavbar), {
  vh,
  minHeight,
  propTypes: {
    collection: PropTypes.object,
  },
});

export default EnhancedSecondaryNavbar;
