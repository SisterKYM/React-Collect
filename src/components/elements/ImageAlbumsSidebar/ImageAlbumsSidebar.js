import {withRouter} from 'react-router-dom';
import {ReactComponent as MyAlbum} from 'theme/images/MyAlbum.svg';
import {ReactComponent as CameraIcon} from 'theme/images/CameraIcon.svg';
import React from 'react';
import config from 'config';
import cx from 'classnames';

import NavItem from 'elements/NavItem';

import AlbumNavItemList from './AlbumNavItemList';

const ImageAlbumsSidebar = ({userAlbums, partnerAlbums, match}) => {
  const currentPath = `/media/${match.params.owner}${
    match.params.collection ? `/${match.params.collection}` : ''
  }/images/upload`;

  return (
    <nav className="flex flex-column">
      {partnerAlbums && partnerAlbums.length !== 0 && (
        <div className="bb b--gray-300">
          <AlbumNavItemList
            navItemClassName="sidebar-album-nav-item db"
            activeNavItemClassName="sidebar-album-nav-item"
            active={Number(match.params.album)}
            albums={partnerAlbums}
          />
        </div>
      )}
      <NavItem
        to={currentPath}
        className={cx(
          'pv3 ph4 sidebar-album-nav-item flex items-center',
          !match.params.album && 'nav-item-active'
        )}
      >
        <CameraIcon size={32} fill="#000" />
        <span className="ml3 dark-grey">Upload Photo</span>
      </NavItem>
      {userAlbums && userAlbums.length !== 0 && (
        <AlbumNavItemList
          navItemClassName="sidebar-album-nav-item dark-grey"
          activeNavItemClassName="sidebar-album-nav-item"
          albums={userAlbums}
          active={Number(match.params.album)}
          icon={<MyAlbum size={32} />}
        />
      )}
      <style jsx>{`
        :global(.sidebar-album-nav-item-list:hover) {
          border-radius: 0.25rem;
          background-color: #2c7b9119;
        }
        :global(.nav-item-active) {
          background-color: ${config.colors.lightTint};
        }
      `}</style>
    </nav>
  );
};

const EnhancedImageAlbumsSidebar = withRouter(ImageAlbumsSidebar);

export default EnhancedImageAlbumsSidebar;
