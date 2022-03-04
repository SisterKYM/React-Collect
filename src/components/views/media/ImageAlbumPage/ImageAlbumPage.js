import {generatePath} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import {Button, ImageAlbumsSidebar, SelectImageForm, Status} from 'elements';
import {FullOverlayLayout} from 'layout';
import {colors} from 'theme/constants';
import HeaderResource from 'resources/HeaderResource';

import {useAlbums} from '../hooks';

const ImageAlbumPage = ({location, history, match, status}) => {
  const {userAlbums, partnerAlbums} = useAlbums();
  const deleteHeader = useFetcher(HeaderResource.deleteShape());

  const currentAlbumHeaders = React.useMemo(() => {
    const albums = [...userAlbums, ...partnerAlbums];
    const currentAlbum = albums.find(
      ({id}) => Number(match.params.album) === id
    );

    return (currentAlbum && currentAlbum.images) || [];
  }, [userAlbums, partnerAlbums, match.params.album]);

  React.useEffect(() => {
    if (!match.params.album) {
      const allAlbums = [...partnerAlbums, ...userAlbums];
      const albumId = allAlbums.length !== 0 ? allAlbums[0].id : null;

      if (albumId) {
        const path = generatePath(
          '/media/:owner/:collection?/images/albums/:album?',
          {
            owner: match.params.owner,
            collection: match.params.collection,
            album: albumId,
          }
        );

        history.replace(path, location.state);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params]);

  const selectImageFormRef = React.useRef(null);

  const dismissPath = generatePath('/collection/:owner/:collection?/details', {
    owner: match.params.owner,
    collection: match.params.collection,
  });

  return (
    <FullOverlayLayout
      close={{
        color: colors.black,
        to: dismissPath,
      }}
      fixedBottom={
        <div className="flex pa3 justify-end items-center bt b--gray-300">
          <div className="pr3">
            <Status status={status} />
          </div>
          <Button
            backgroundColorSet
            className="bg-brand"
            disabled={status === 'pending'}
            onClick={() => {
              selectImageFormRef.current.submit();
            }}
          >
            Select
          </Button>
        </div>
      }
    >
      <div className="pa3 pa4-ns">
        <div className="pt2 pb3 bb b--gray-300">
          <h1 className="f3 dark-grey">Add a Banner Image</h1>
        </div>
        <div className="flex flex-wrap overflow-hidden">
          <div className="sidebar w-100 w-25-ns br-ns bb-0-ns bb b--gray-300">
            <ImageAlbumsSidebar
              partnerAlbums={partnerAlbums}
              userAlbums={userAlbums}
            />
          </div>
          <div className="w-100 w-75-ns pv4 pa3-ns pv0-ns">
            {currentAlbumHeaders.length !== 0 && (
              <SelectImageForm
                ref={selectImageFormRef}
                images={currentAlbumHeaders}
                owner={match.params.owner}
                onDelete={(header) => {
                  deleteHeader({id: header.id});
                }}
                onSubmit={(values) => {
                  history.push({
                    pathname: dismissPath,
                    state: {
                      headerId: values.image.id,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .sidebar {
          height: 81vh;
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

export default ImageAlbumPage;
