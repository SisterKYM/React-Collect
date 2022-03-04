import {Link} from 'react-router-dom';
import _ from 'lodash';
import React from 'react';
import cx from 'classnames';

import CUPLogoRevIcon from 'theme/images/CUPLogo_Rev.svg';

import {bottomLinks, links, social} from './data';

const FooterBig = ({whitelabelFooter}) => {
  if (whitelabelFooter) {
    return (
      <footer className="bg-gray-600">
        <div className="flex-l pv3 pv4-ns justify-between-ns items-center-ns ph4 tc tl-ns">
          <div className="tl" />
          <ul className="flex mt3 mt0-l items-center">
            {bottomLinks.map((bl, idx) => (
              <li
                key={bl.label}
                className={cx('f8 avenir-roman gray-300', idx !== 0 && 'ml3')}
              >
                {bl.url ? (
                  <a
                    className="gray-300 dim"
                    href={bl.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {bl.label}
                  </a>
                ) : (
                  bl.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </footer>
    );
  }

  return (
    <footer className="pb3 bg-gray-600">
      <div className="flex-ns ph4 ph5-l pv3">
        <ul className="flex flex-auto w-100">
          {links.map((link, idx) => {
            const subLinksChunked = _.chunk(link.ul, 6);

            return (
              <li
                key={link.heading}
                className={cx('flex-auto mt4 f6', idx > 1 && 'dn db-l')}
              >
                <p className="f6 avenir-roman ttu white">{link.heading}</p>
                <div className="cf mt3">
                  {subLinksChunked.map((subLinks, jdx) => (
                    <div
                      key={`${idx}-${jdx}`}
                      className={cx('fl', jdx !== 0 && 'ml5')}
                    >
                      {subLinks.map((link, idx) => {
                        const className = 'f6 avenir-light white';

                        return (
                          <p key={idx} className="mt2 dim">
                            {link.link ? (
                              <Link
                                className={className}
                                target={link.target || '_self'}
                                to={link.url}
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <a
                                className={className}
                                href={link.url}
                                target={link.target || '_self'}
                              >
                                {link.label}
                              </a>
                            )}
                          </p>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="dn flex-l">
          {social.map((soc, idx) => {
            const Icon = soc.icon;

            return (
              <li key={soc.url} className={cx('mt4', idx !== 0 && 'ml3')}>
                <a href={soc.url} rel="noopener noreferrer" target="_blank">
                  <Icon className="f3 gray-400 dim" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-l pv3 pb4-ns justify-between-ns items-center-ns ph4 tc tl-ns">
        <div className="tl">
          <a href="https://www.cheddarup.com/">
            <img alt="CheddarUp logo" src={CUPLogoRevIcon} />
          </a>
        </div>
        <ul className="flex mt3 mt0-l items-center">
          {bottomLinks.map((bl, idx) => (
            <li
              key={bl.label}
              className={cx('f8 avenir-roman gray-300', idx !== 0 && 'ml3')}
            >
              {bl.url ? (
                <a
                  className="gray-300 dim"
                  href={bl.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {bl.label}
                </a>
              ) : (
                bl.label
              )}
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        img {
          width: 12rem;
        }
      `}</style>
    </footer>
  );
};

const EnhancedFooterBig = React.memo(FooterBig);

export default EnhancedFooterBig;
