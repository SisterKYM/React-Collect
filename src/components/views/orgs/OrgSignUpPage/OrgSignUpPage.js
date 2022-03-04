import {Redirect} from 'react-router-dom';
import {compose, mapProps, branch, renderComponent} from 'recompose';
import React from 'react';
import queryString from 'query-string';

import {BasePage} from 'components/views/signup/components';
import {ORGS} from 'data/orgs';
import AASLandingPageBkgdImage from 'theme/images/AAS.LandingPage.Bkgd.png';
import BSBHLandingPageBkgdImage from 'theme/images/BSBH.LandingPageBkgd.jpg';
import CabiBackgroundImage from 'theme/images/CabiBackground.jpg';
import ColoradoRapidsBackgroundImage from 'theme/images/ColoradoRapidsBackground.jpg';
import EuropeanPTABackgroundImage from 'theme/images/EuropeanPTABackground.png';
import GirlScoutsCOBackgroundImage from 'theme/images/GirlScoutsCOBackground.png';
import GirlScoutsEMBackgroundImage from 'theme/images/GirlScoutsEMBackground.png';
import GirlScoutsLABackgroundImage from 'theme/images/GirlScoutsLABackground.png';
import GirlScoutsNIMBackgroundImage from 'theme/images/GirlScoutsNIMBackground.png';
import IndiaHicksBackgroundImage from 'theme/images/IndiaHicksBackground.jpeg';
import KeepLandingPageBkgdImage from 'theme/images/Keep.LandingPageBkgd.png';
import PixielaneBkgdImage from 'theme/images/Pixielane.LandingPageBkgd.jpg';
import MJCBackgroundTwirlImage from 'theme/images/MJC_1250X800.Background.Twirl.jpg';
import NoondayBackgroundImage from 'theme/images/NoondayBackground.jpg';
import OhioPTABackgroundImage from 'theme/images/OhioPTABackground.png';
import StellaDotBackgroundImage from 'theme/images/StellaDotBackground.png';
import ThreadsLandingPageBkgdImage from 'theme/images/Threads.LandingPageBkgd.png';
import TradesOfHopeLandingPageBkgdImage from 'theme/images/TradesOfHopeBackground.jpg';
import VistageLandingPageBkgdImage from 'theme/images/Vistage.LandingPageBkgd.png';
import YPOLandingPageBkgdImage from 'theme/images/YPO.LandingPageBkgd.png';

import {PrimaryNav, DrawerNav, RightNav, CenterNav} from './components';

const orgsPagesProps = {
  aas: {
    heading: 'Collecting from Your Team Made Easy',
    subheading:
      'Move team payments and forms online in minutes with built-in tracking and reminding.',
    logoUrl: ORGS.aas.logoSrc,
    backgroundUrl: AASLandingPageBkgdImage,
  },
  indiahicks: {
    heading: 'IS IT VINTAGE YET?',
    subheading: (
      <span>
        Sell your past season items to anyone looking for a{' '}
        <span className="nowrap">sold-out favorite.</span>
      </span>
    ),
    logoUrl: ORGS.indiahicks.logoSrc,
    backgroundUrl: IndiaHicksBackgroundImage,
    formCountrySelectDisplayed: false,
    formSubmitButtonColor: 'black',
  },
  ohiopta: {
    heading: 'Dues Collection Made Easy',
    subheading: 'Move your collections online and grow your community!',
    logoUrl: ORGS.ohiopta.logoSrc,
    backgroundUrl: OhioPTABackgroundImage,
  },
  idahopta: {
    heading: 'Easy online payments for your PTA',
    subheading: 'Move your collections online and grow your community!',
    logoUrl: ORGS.idahopta.logoSrc,
  },
  delawarepta: {
    heading: 'Dues Collection Made Easy',
    subheading: 'Move your collections online and grow your community!',
    logoUrl: ORGS.delawarepta.logoSrc,
    backgroundUrl: OhioPTABackgroundImage,
  },
  europeanpta: {
    heading: 'Dues Collection Made Easy',
    subheading: 'Move your collections online and grow your community!',
    logoUrl: ORGS.europeanpta.logoSrc,
    backgroundUrl: EuropeanPTABackgroundImage,
  },
  nhpta: {
    heading: 'Dues Collection Made Easy',
    subheading: 'Move your collections online and grow your community!',
    logoUrl: ORGS.nhpta.logoSrc,
  },
  noonday: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum',
    logoUrl: ORGS.noonday.logoSrc,
    backgroundUrl: NoondayBackgroundImage,
    formCountrySelectDisplayed: false,
  },
  wildflowers: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    formCountrySelectDisplayed: false,
    logoUrl: ORGS.wildflowers.logoSrc,
  },
  moneyminder: {
    logoUrl: ORGS.moneyminder.logoSrc,
  },
  tradesofhope: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Quickly create custom sales for your on-hand inventory.',
    formCountrySelectDisplayed: false,
    formSubmitButtonColor: '#f98c79',
    logoUrl: ORGS.tradesofhope.logoSrc,
    backgroundUrl: TradesOfHopeLandingPageBkgdImage,
  },
  norwex: {
    heading: 'Extra Inventory Sales Made Easy',
    subheading:
      'Create an online sale in minutes with built-in product catalogs.',
    logoUrl: ORGS.norwex.logoSrc,
  },
  stelladot: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    logoUrl: ORGS.stelladot.logoSrc,
    backgroundUrl: StellaDotBackgroundImage,
  },
  coloradorapids: {
    heading: 'Team Collecting Made Easy',
    subheading: 'Track and manage your team payments and forms with ease.',
    logoUrl: ORGS.coloradorapids.logoSrc,
    backgroundUrl: ColoradoRapidsBackgroundImage,
    formCountrySelectDisplayed: false,
    formSubmitButtonColor: '#99012d',
  },
  girlscoutsco: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.girlscoutsco.logoSrc,
    backgroundUrl: GirlScoutsCOBackgroundImage,
    formCountrySelectDisplayed: false,
  },
  girlscoutsem: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.girlscoutsem.logoSrc,
    backgroundUrl: GirlScoutsEMBackgroundImage,
    formCountrySelectDisplayed: false,
  },
  girlscoutsnim: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.girlscoutsnim.logoSrc,
    backgroundUrl: GirlScoutsNIMBackgroundImage,
    formCountrySelectDisplayed: false,
  },
  girlscoutsla: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.girlscoutsla.logoSrc,
    backgroundUrl: GirlScoutsLABackgroundImage,
    formCountrySelectDisplayed: false,
  },
  girlscoutshornetsnest: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.girlscoutshornetsnest.logoSrc,
    backgroundUrl: GirlScoutsNIMBackgroundImage,
    formCountrySelectDisplayed: false,
  },
  gsgatl: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    logoUrl: ORGS.gsgatl.logoSrc,
    backgroundUrl: GirlScoutsLABackgroundImage,
    formCountrySelectDisplayed: false,
  },
  matildajane: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    logoUrl: ORGS.matildajane.logoSrc,
    backgroundUrl: MJCBackgroundTwirlImage,
    formCountrySelectDisplayed: false,
    contentWhite: true,
  },
  mops: {
    heading: 'Collecting from your MOPS group made easy',
    subheading: 'Online payments and forms in minutes with built-in tracking.',
    logoUrl: ORGS.mops.logoSrc,
    formCountrySelectDisplayed: true,
  },
  nyspta: {
    heading: 'Online Collections Made Easy',
    subheading: 'Move your payments and forms online and grow your community.',
    logoUrl: ORGS.nyspta.logoSrc,
    backgroundUrl: EuropeanPTABackgroundImage,
    formCountrySelectDisplayed: false,
  },
  vistage: {
    heading: 'Collecting from Your Vistage Group Made Easy',
    subheading:
      'Move payments and forms online in minutes with built-in tracking and reminding.',
    backgroundUrl: VistageLandingPageBkgdImage,
    logoUrl: ORGS.vistage.logoSrc,
  },
  ypo: {
    heading: 'Collecting from Your YPO Group Made Easy',
    subheading:
      'Online payments and forms in minutes with built-in tracking and reminding.',
    backgroundUrl: YPOLandingPageBkgdImage,
    logoUrl: ORGS.ypo.logoSrc,
  },
  cabi: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    backgroundUrl: CabiBackgroundImage,
    logoUrl: ORGS.cabi.logoSrc,
    formSubmitButtonColor: '#373737',
  },
  keep: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    backgroundUrl: KeepLandingPageBkgdImage,
    logoUrl: ORGS.keep.logoSrc,
    formSubmitButtonColor: '#e96651',
  },
  pixielane: {
    heading: `The online marketplace for consultants' inventory sales`,
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    backgroundUrl: PixielaneBkgdImage,
    logoUrl: ORGS.pixielane.logoSrc,
    formSubmitButtonColor: '#ff46a3',
  },
  threadsworldwide: {
    heading: 'Sample Sales Made Easy',
    subheading: 'Custom sales in minutes with built-in tracking and momentum.',
    formSubmitButtonColor: '#470048',
    backgroundUrl: ThreadsLandingPageBkgdImage,
    logoUrl: ORGS.threadsworldwide.logoSrc,
    formCountrySelectDisplayed: false,
  },
  blackhawkareacouncil: {
    heading: 'Collections Made Easy',
    subheading: 'Custom payment pages and forms for your troop.',
    formSubmitButtonColor: '#CE1126',
    backgroundUrl: BSBHLandingPageBkgdImage,
    logoUrl: ORGS.blackhawkareacouncil.logoSrc,
    formCountrySelectDisplayed: false,
  },
  americanheritagegirls: {
    heading: 'Collecting from your troop made easy',
    subheading: 'Easy online payments and forms with built-in tracking.',
    logoUrl: ORGS.americanheritagegirls.logoSrc,
  },
  traillifeusa: {
    heading: 'Collecting from your troop made easy',
    subheading: 'Easy online payments and forms with built-in tracking.',
    logoUrl: ORGS.traillifeusa.logoSrc,
  },
};

const OrgSignUpPage = (props) => (
  <BasePage
    {...props}
    defaultBestDescribesYou={ORGS[props.org] ? ORGS[props.org].type : ''}
    primaryNavbar={{
      className: 'bg-white',
      rightComponent: <RightNav location={props.location} />,
      centerComponent: <CenterNav org={props.org} />,
      leftComponent: <PrimaryNav org={props.org} />,
    }}
    drawerNav={<DrawerNav org={props.org} />}
  />
);

const enhance = compose(
  branch(
    (props) => typeof orgsPagesProps[props.match.params.org] === 'undefined',
    renderComponent(() => <Redirect to="/signup" />)
  ),
  mapProps((props) => {
    const queryParams = queryString.parse(props.location.search);

    return {
      org: props.match.params.org,
      inviteCode: queryParams.invite_code,
      firstName: queryParams.first_name,
      lastName: queryParams.last_name,
      email: queryParams.email,
      currency: queryParams.currency,
      location: props.location,
      ...orgsPagesProps[props.match.params.org],
    };
  }),
  React.memo
);

const EnhancedOrgSignUpPage = enhance(OrgSignUpPage);

export default EnhancedOrgSignUpPage;
