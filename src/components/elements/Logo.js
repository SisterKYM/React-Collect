import React from 'react';
import cx from 'classnames';

import TopNavLogoCubeIcon from 'theme/images/TopNavLogoCube.svg';
import WordMarkIcon from 'theme/images/WordMark.svg';
import config from 'config';

const Logo = ({className, forceWordmarkVisible}) =>
  config.isCheddarUp ? (
    <div className={cx('flex items-center', className)}>
      <img alt="" className="db logo-cube mr2" src={TopNavLogoCubeIcon} />
      <img
        alt={config.strings.name}
        className={cx('word-mark', forceWordmarkVisible ? 'db' : 'dn db-ns')}
        src={WordMarkIcon}
      />
      <style jsx>{`
        @media screen and (min-width: 30em) {
          .logo-cube {
            height: 2rem;
            max-width: calc(23.5% - 0.25rem);
          }
        }
        .word-mark {
          height: 1.125rem;
          max-width: calc(76.5% - 0.25rem);
        }
      `}</style>
    </div>
  ) : (
    <>
      <img
        alt="Logo"
        className="db w-auto h-auto mr2"
        src={config.icons.logo}
      />
      <style jsx>{`
        img {
          min-width: 10rem;
          min-height: 1.75rem;
          max-height: 2.5rem;
        }
      `}</style>
    </>
  );

const EnhancedLogo = React.memo(Logo);

export default EnhancedLogo;
