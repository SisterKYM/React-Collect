import {generatePath} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import React from 'react';

import {colors} from 'theme/constants';
import {errorAlert} from 'redux/modules/growl/actions';
import {FullOverlayLayout} from 'layout';
import {ImageAlbumsSidebar} from 'elements';

import {ImageUploadForm} from './components';
import {useAlbums} from '../hooks';

const ImageUploadPage = ({match, history}) => {
  const {userAlbums, partnerAlbums} = useAlbums();

  const dispatch = useDispatch();

  const handleDropRejected = React.useCallback(() => {
    dispatch(
      errorAlert({
        title: 'Error',
        body:
          'This file is too large or the file type is not supported. Pictures with file types JPEG, PNG, or GIF work best.',
      })
    );
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    (values) => {
      const path = generatePath(
        '/media/:owner/:collection?/images/upload/crop',
        {
          owner: match.params.owner,
          collection: match.params.collection,
        }
      );

      history.push(path, {image: values.image});
    },
    [history, match.params]
  );

  return (
    <FullOverlayLayout
      close={{
        color: colors.black,
        to: generatePath('/collection/:owner/:collection?/details', {
          owner: match.params.owner,
          collection: match.params.collection,
        }),
      }}
    >
      <div className="pa3 pa4-ns">
        <div className="pt2 pb3 bb b--gray-300">
          <h1 className="f3 dark-grey">Add a Banner Image</h1>
        </div>
        <div className="flex flex-wrap">
          <div className="sidebar w-100 w-25-ns br-ns bb-0-ns bb b--gray-300">
            <ImageAlbumsSidebar
              userAlbums={userAlbums}
              partnerAlbums={partnerAlbums}
            />
          </div>
          <div className="w-100 w-75-ns pa3 pa5-l">
            <ImageUploadForm
              onDropRejected={handleDropRejected}
              onSubmit={handleSubmit}
            />
            <div className="mt4 tc">
              <span className="dark-grey avenir-light recommendation">
                We recommend at least a 1024 x 340px (3:1 ratio) image that is
                no larger than 10 mb.
                <br /> Images with file types JPEG, PNG, or GIF work best.
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sidebar {
          height: 81vh;
        }
        .recommendation {
          font-size: 14px;
          line-height: 20px;
        }
        @media (max-width: 30em) {
          .sidebar {
            height: initial;
          }
        }
      `}</style>
    </FullOverlayLayout>
  );
};

const EnhancedUploadImagePage = React.memo(ImageUploadPage);

export default EnhancedUploadImagePage;
