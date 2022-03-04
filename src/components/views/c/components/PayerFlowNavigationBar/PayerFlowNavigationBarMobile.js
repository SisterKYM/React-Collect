import {FaChevronRight} from 'react-icons/fa';
import {generatePath, Link} from 'react-router-dom';
import {IoIosMenu} from 'react-icons/io';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import {Modal} from 'elements';
import CheddarupLogo from 'theme/images/cheddarup-logo.svg';
import config from 'config';

const NavLi = ({className, noBorder, to, onClick, children}) => (
  <li className={noBorder ? '' : 'bb b--gray-300'}>
    <Link
      replace
      className={cx('dib w-100 h-100 pa3 f6 avennir-roman gray-600', className)}
      to={to || '#'}
      onClick={onClick}
    >
      {children}
    </Link>
  </li>
);

const PoseContainer = posed.div();

const PayerFlowNavigationBarMobile = ({
  collectionSlug,
  categories = [],
  smallLandscape,
  onChangeCategoryPath,
  rightElement,
  collectionHasFormsOnly,
  coBranding,
  partnerSlug,
  partnerLogo,
  partnerUrl,
}) => {
  const [menuState, setMenuState] = React.useState('HIDDEN');
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  return (
    <nav
      className={`flex ${
        smallLandscape ? '' : 'dn-ns'
      } items-center justify-between w-100 border-box pa3 bb b--gray-300 bg-white`}
    >
      <div>
        <IoIosMenu
          className="f2 gray-600 dim"
          onClick={(event) => {
            event.preventDefault();

            setMenuState('INITIAL');
          }}
        />
      </div>
      {coBranding && partnerSlug && partnerLogo && (
        <a
          className="dtc v-mid link dim flex-auto"
          style={{maxWidth: '50%'}}
          href={partnerUrl || '/'}
        >
          <div className="flex">
            <img
              alt="Org logo"
              style={{objectFit: 'contain'}}
              src={partnerLogo}
            />
          </div>
        </a>
      )}
      {!collectionHasFormsOnly && <div>{rightElement}</div>}
      {menuState !== 'HIDDEN' && (
        <PoseGroup>
          <PoseContainer key={menuState}>
            <Modal
              className="flex flex-column"
              contentContainerClassName="payer-menu-modal-content-container"
              animationType="SLIDE"
              onDismiss={() => {
                setMenuState('HIDDEN');
              }}
            >
              <div className="flex-auto overflow-scroll">
                <nav>
                  <ul>
                    {menuState === 'SUBCATEGORIES_VISIBLE' ? (
                      <>
                        <NavLi
                          noBorder
                          onClick={(event) => {
                            event.preventDefault();

                            setMenuState('INITIAL');
                          }}
                        >
                          {'< Back'}
                        </NavLi>
                        <NavLi
                          noBorder
                          className="bg-light-gray"
                          onClick={(event) => {
                            event.preventDefault();

                            setMenuState('HIDDEN');
                            onChangeCategoryPath([selectedCategory.id]);
                          }}
                        >
                          {selectedCategory.name}
                        </NavLi>
                        {(selectedCategory.options.subcategories || []).map(
                          (subcategory) => (
                            <NavLi
                              noBorder
                              key={subcategory.uuid}
                              onClick={(event) => {
                                event.preventDefault();
                                setMenuState('HIDDEN');
                                onChangeCategoryPath([
                                  selectedCategory.id,
                                  subcategory.uuid,
                                ]);
                              }}
                            >
                              {subcategory.name}
                            </NavLi>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        <NavLi
                          className="ttu"
                          to={generatePath('/c/:collection', {
                            collection: collectionSlug,
                          })}
                          onClick={() => {
                            setMenuState('HIDDEN');
                            onChangeCategoryPath([]);
                          }}
                        >
                          Home
                        </NavLi>
                        {categories.length !== 0 && (
                          <ul className="bg-light-gray">
                            <NavLi
                              noBorder
                              onClick={(event) => {
                                event.preventDefault();

                                setMenuState('HIDDEN');
                                onChangeCategoryPath([]);
                              }}
                            >
                              Shop All
                            </NavLi>
                            {categories.map((category) => {
                              const subcategories =
                                category.options.subcategories || [];

                              return (
                                <NavLi
                                  noBorder
                                  key={category.id}
                                  className="flex items-center"
                                  onClick={(event) => {
                                    event.preventDefault();

                                    if (subcategories.length !== 0) {
                                      setMenuState('SUBCATEGORIES_VISIBLE');
                                      setSelectedCategory(category);
                                    } else {
                                      setMenuState('HIDDEN');
                                      onChangeCategoryPath([category.id]);
                                    }
                                  }}
                                >
                                  <div className="flex-auto">
                                    {category.name}
                                  </div>
                                  {subcategories.length !== 0 && (
                                    <FaChevronRight className="db flex-shrink-0 f6 gray-400" />
                                  )}
                                </NavLi>
                              );
                            })}
                          </ul>
                        )}
                        <NavLi
                          className="ttu"
                          to={generatePath('/c/:collection/share', {
                            collection: collectionSlug,
                          })}
                          onClick={() => {
                            setMenuState('HIDDEN');
                          }}
                        >
                          Share
                        </NavLi>
                        <NavLi
                          className="ttu"
                          to={generatePath('/c/:collection/help', {
                            collection: collectionSlug,
                          })}
                          onClick={() => {
                            setMenuState('HIDDEN');
                          }}
                        >
                          Help
                        </NavLi>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              {config.isCheddarUp && (
                <footer className="ph3 bg-gray-200">
                  <img alt="CheddarUp logo" src={CheddarupLogo} />
                </footer>
              )}
            </Modal>
          </PoseContainer>
        </PoseGroup>
      )}
      <style jsx>{`
        footer {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
        :global(.payer-menu-modal-content-container) {
          max-width: 70%;
          bottom: 0;
          top: 0;
          margin: 0rem !important;
        }
        :global(.flex-shrink-0) {
          flex-shrink: 0;
        }
      `}</style>
    </nav>
  );
};

export default PayerFlowNavigationBarMobile;
