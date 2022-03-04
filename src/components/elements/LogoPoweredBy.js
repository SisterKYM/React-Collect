import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import TopNavLogoCubeIcon from 'theme/images/TopNavLogoCube.svg';
import WordMarkIcon from 'theme/images/WordMark.svg';
import config from 'config';

const LogoPoweredBy = ({className, forceWordmarkVisible}) => (
  <>
    <span className="merriweather-i-pt-13 mr2 ml3 ml4-m ml5-l">Powered by</span>
    <Link to="/" style={{marginBottom: '0.1rem', width: '128.17px'}}>
      {config.isCheddarUp ? (
        <div className={cx('flex items-center justify-end', className)}>
          <img alt="" className="db logo-cube mr2" src={TopNavLogoCubeIcon} />
          <img
            alt="Cheddar Up"
            className={cx(
              'word-mark',
              forceWordmarkVisible ? 'db' : 'dn db-ns'
            )}
            src={WordMarkIcon}
          />
        </div>
      ) : (
        <img
          alt="Logo"
          className="db w-auto h-auto mr2"
          src={config.icons.logo}
        />
      )}
    </Link>
    <style jsx>{`
      .merriweather-i-pt-13 {
        font-family: 'Merriweather', serif;
        font-style: italic;
        font-size: 13px;
        white-space: nowrap;
        width: 70px;
      }
      .logo-cube {
        height: 18.75px;
        max-width: calc(23.5% - 0.25rem);
      }
      .word-mark {
        height: 1.125rem;
        max-width: calc(76.5% - 0.25rem);
      }
      img[alt='Logo'] {
        min-width: 10rem;
        min-height: 1.75rem;
        max-height: 2.5rem;
      }
    `}</style>
  </>
);

const EnhancedLogoPoweredBy = React.memo(LogoPoweredBy);

export default EnhancedLogoPoweredBy;
