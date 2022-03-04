import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import NavItem from 'elements/NavItem';

const AlbumNavItemList = ({
  navItemClassName,
  activeNavItemClassName,
  match,
  albums,
  icon,
  active,
}) => {
  const renderAlbum = React.useCallback(
    (album, idx) => {
      const url = `/media/${match.params.owner}${
        match.params.collection ? `/${match.params.collection}` : ''
      }/images/albums/${album.id}`;

      return (
        <NavItem
          key={idx}
          to={url}
          className={cx(
            'pv3 ph4',
            icon && 'flex items-center',
            active === album.id && 'nav-item-active',
            navItemClassName,
            match.url === url && activeNavItemClassName
          )}
        >
          {icon}
          <span className={cx(icon && 'ml3')}>{album.name}</span>
        </NavItem>
      );
    },
    [activeNavItemClassName, match, navItemClassName, icon, active]
  );

  return <div>{albums.map((x, idx) => renderAlbum(x, idx))}</div>;
};

const enhance = compose(withRouter, React.memo);

const EnhancedAlbumNavItemList = Object.assign(enhance(AlbumNavItemList), {
  propTypes: {
    albums: PropTypes.array,
  },
});

export default EnhancedAlbumNavItemList;
