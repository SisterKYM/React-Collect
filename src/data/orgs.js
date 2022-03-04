import {fromPairs, toPairs} from 'lodash';

import AASLogoImage from 'theme/images/AASLogo.png';
import AmericanHeritageGirlsLogoImage from 'theme/images/American_Heritage_Girls_logo-png.png';
import BSBHlogoImage from 'theme/images/BSBH-logo.png';
import CabiLogoImage from 'theme/images/CabiLogo.png';
import ColoradoRapidsLogoImage from 'theme/images/ColoradoRapidsLogo.png';
import DelawarePTALogoImage from 'theme/images/DelawarePTALogo.png';
import EuropeanPTALogoImage from 'theme/images/EuropeanPTALogo.png';
import GirlScoutsCOLogoImage from 'theme/images/GirlScoutsCOLogo.png';
import GsWcfLogo from 'theme/images/GsWcfLogo.png';
import gsofaklogo from 'theme/images/gsofaklogo.png';
import GirlScoutsWNYLogoImage from 'theme/images/GirlScoutsWNYLogo.png';
import GirlScoutsEMLogoImage from 'theme/images/GirlScoutsEMLogo.png';
import GirlScoutsHornetsNestLogoImage from 'theme/images/GirlScoutsHornetsNestLogo.png';
import GirlScoutsLALogoImage from 'theme/images/GirlScoutsLALogo.png';
import GirlScoutsNIMLogoImage from 'theme/images/GirlScoutsNIMLogo.png';
import Girlscoutscoastalpineslogo from 'theme/images/girlscoutscoastalpines-logo.png';
import GirlscoutsewniLogo from 'theme/images/girlscoutsewni-logo.png';
import GsCentralIndianaLogo from 'theme/images/GsCentralIndianaLogo.png';
import GssiLogo from 'theme/images/gssi-logo.png';
import GsofctLogo from 'theme/images/gsofct-logo.png';
import GSNEOLogo from 'theme/images/GSNEOLogo.png';
import GSCCSLogo from 'theme/images/GSCCSLogo.png';
import PhiBetaChiLogo from 'theme/images/PhiBetaChiLogo.png';
import GsnorcallogoImage from 'theme/images/gsnorcal-logo.png';
import GsAppalachiansLogo from 'theme/images/gsappalachians-logo.png';
import GsGulfCoastLogo from 'theme/images/gsgulfcoast-logo.png';
import GsGenericLogo from 'theme/images/gsgeneric-logo.png';
import IdahoPTALogoImage from 'theme/images/Idaho PTA.jpg';
import IndiaHicksLogoImage from 'theme/images/IndiaHicksLogo.png';
import MJCLogoSquareImage from 'theme/images/MJC-Logo-Square.svg';
import MopsImage from 'theme/images/mops.png';
import NYSPTALogoImage from 'theme/images/NYSPTA.Logo.png';
import NoondayLogoImage from 'theme/images/NoondayLogo.jpg';
import OhioPTALogoImage from 'theme/images/OhioPTALogo.png';
import PixieLaneLogo from 'theme/images/pixielane-logo.png';
import StelladotnewlogoImage from 'theme/images/Stelladot.newlogo.png';
import Wildflowers from 'theme/images/Wildflowers.png';
import Norwex from 'theme/images/Norwex.png';
import TRLLogoImage from 'theme/images/TRL_Logo-1.2A.png';
import ThreadslogoImage from 'theme/images/Threads-logo.png';
import VistageLogoImage from 'theme/images/Vistage-Logo.png';
import YPOLOGOImage from 'theme/images/YPO.LOGO.png';
import TradesOfHopeLogoImage from 'theme/images/TradesOfHopeLogo.png';
import MoneyMinderLogoImage from 'theme/images/MoneyMinderLogo.png';
import GSGATLLogoImage from 'theme/images/GSGATLLogo.png';
import nhPTALogoImage from 'theme/images/nhPTALogoImage.png';
import gssilversageLogoImage from 'theme/images/gssilversageLogoImage.gif';

const ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT =
  'https://player.vimeo.com/video/230275990';

const ORG_TYPES = {
  clubAssociation: {
    label: 'Club / Association',
    value: 'Club / Association',
  },
  individual: {
    label: 'Individual',
    value: 'Individual',
  },
  other: {
    label: 'Other',
    value: 'Other',
  },
  schoolPta: {
    label: 'School / PTA',
    value: 'School / PTA',
  },
  seller: {
    label: 'Seller',
    value: 'Seller',
  },
  sportsTeamLeague: {
    label: 'Sports Team / League',
    value: 'Sports Team / League',
  },
};

const RAW_ORGS = {
  aas: {
    logoSrc: AASLogoImage,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/274002087',
  },
  matildajane: {
    type: ORG_TYPES.seller.value,
    name: 'Matilda Jane',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/274002087',
    logoSrc: MJCLogoSquareImage,
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  indiahicks: {
    type: ORG_TYPES.seller.value,
    name: 'India Hicks',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/169930216',
    logoSrc: IndiaHicksLogoImage,
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  stelladot: {
    type: ORG_TYPES.seller.value,
    name: 'Stella & Dot',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/273994966',
    logoSrc: StelladotnewlogoImage,
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  noonday: {
    type: ORG_TYPES.seller.value,
    name: 'Noonday',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/274758439',
    logoSrc: NoondayLogoImage,
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  ohiopta: {
    type: ORG_TYPES.schoolPta.value,
    name: 'Ohio PTA',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/221507173',
    logoSrc: OhioPTALogoImage,
  },
  idahopta: {
    type: ORG_TYPES.schoolPta.value,
    name: 'Idaho PTA',
    logoSrc: IdahoPTALogoImage,
  },
  nyspta: {
    type: ORG_TYPES.schoolPta.value,
    name: 'New York State PTA',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/233553816',
    logoSrc: NYSPTALogoImage,
  },
  delawarepta: {
    type: ORG_TYPES.schoolPta.value,
    name: 'Delaware PTA',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/233584233',
    logoSrc: DelawarePTALogoImage,
  },
  gsnorcal: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsnorcallogoImage,
  },
  gsofak: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: gsofaklogo,
  },
  gsgeneric: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsGenericLogo,
  },
  gsappalachians: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsAppalachiansLogo,
  },
  gsgulfcoast: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsGulfCoastLogo,
  },
  gswcf: {
    name: 'Girl Scouts of West Central Florida',
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsWcfLogo,
  },
  gsgatl: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GSGATLLogoImage,
  },
  girlscoutsci: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsCentralIndianaLogo,
  },
  gssi: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    logoSrc: GssiLogo,
  },
  gsofct: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GsofctLogo,
  },
  girlscoutsewni: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlscoutsewniLogo,
  },
  girlscoutscoastalpines: {
    type: ORG_TYPES.clubAssociation.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: Girlscoutscoastalpineslogo,
  },
  girlscoutsem: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Eastern Missouri',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/236992289',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlScoutsEMLogoImage,
  },
  girlscoutsco: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Colorado',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/226958020',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlScoutsCOLogoImage,
  },
  gsneo: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of North East Ohio',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GSNEOLogo,
  },
  gsccs: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts Central California South',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GSCCSLogo,
  },
  gswny: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Western New York',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlScoutsWNYLogoImage,
  },
  girlscoutsnim: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Northern Indiana Michiana',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/228736438',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlScoutsNIMLogoImage,
  },
  girlscoutshornetsnest: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Northern Indiana Michiana',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280804200',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
    logoSrc: GirlScoutsHornetsNestLogoImage,
  },
  cabi: {
    type: ORG_TYPES.seller.value,
    name: 'cabi',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/274609280',
    logoSrc: CabiLogoImage,
    faqUrl: 'http://cabisupport.cheddarup.com',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  moneyminder: {
    type: ORG_TYPES.clubAssociation.value,
    logoSrc: MoneyMinderLogoImage,
    partnerBenefitsLink: 'https://moneyminder.com/mystore/',
    url: 'https://moneyminder.com/',
  },
  tradesofhope: {
    type: ORG_TYPES.seller.value,
    logoSrc: TradesOfHopeLogoImage,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/239480202',
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  threadsworldwide: {
    type: ORG_TYPES.seller.value,
    name: 'Threads Worldwide',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280267846',
    logoSrc: ThreadslogoImage,
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  pixielane: {
    type: ORG_TYPES.seller.value,
    name: 'PixieLane',
    logoSrc: PixieLaneLogo,
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280397966',
  },
  blackhawkareacouncil: {
    type: ORG_TYPES.seller.value,
    name: 'Boy Scouts Blackhawk',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280634576',
    partnerBenefitsLink: 'https://www.cheddarup.com/boyscouts/',
    logoSrc: BSBHlogoImage,
  },
  keep: {
    type: ORG_TYPES.seller.value,
    name: 'KEEP',
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280287180',
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  europeanpta: {
    type: ORG_TYPES.schoolPta.value,
    name: 'European PTA',
    logoSrc: EuropeanPTALogoImage,
  },
  coloradorapids: {
    type: ORG_TYPES.sportsTeamLeague.value,
    name: 'Colorado Rapids',
    logoSrc: ColoradoRapidsLogoImage,
  },
  girlscoutsla: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'Girl Scouts of Greater Los Angeles',
    logoSrc: GirlScoutsLALogoImage,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/310203615',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360044123471-Use-our-Girl-Scout-partner-tools',
  },
  wildflowers: {
    name: 'Wildflowers Clothing',
    logoSrc: Wildflowers,
    type: ORG_TYPES.seller.value,
    howItWorksVideoUrl: 'https://player.vimeo.com/video/280397966',
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  phibeta: {
    name: 'Phi Beta Chi',
    logoSrc: PhiBetaChiLogo,
    type: ORG_TYPES.clubAssociation.value,
  },
  norwex: {
    name: 'Norwex',
    logoSrc: Norwex,
    type: ORG_TYPES.seller.value,
    faqUrl:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
    partnerBenefitsLink:
      'https://support.cheddarup.com/hc/en-us/articles/360043466491-Use-our-direct-sales-partner-tools',
  },
  mops: {
    type: ORG_TYPES.clubAssociation.value,
    name: 'MOPS',
    partnerBenefitsLink: 'https://www.cheddarup.com/mops/#anchor-giveaway',
    logoSrc: MopsImage,
  },
  vistage: {
    logoSrc: VistageLogoImage,
  },
  ypo: {
    logoSrc: YPOLOGOImage,
  },
  americanheritagegirls: {
    logoSrc: AmericanHeritageGirlsLogoImage,
    name: 'American Heritage Girls',
  },
  traillifeusa: {
    logoSrc: TRLLogoImage,
    name: 'Trail Life USA',
  },
  nhpta: {
    logoSrc: nhPTALogoImage,
    name: 'New Hampshire PTA',
    type: ORG_TYPES.schoolPta.value,
  },
  gssilversage: {
    logoSrc: gssilversageLogoImage,
    name: 'Girl Scouts of Silver Sage',
    type: ORG_TYPES.clubAssociation.value,
  },
};

const ORGS = fromPairs(
  toPairs(RAW_ORGS).map(([orgKey, org]) => [
    orgKey,
    {
      ...org,
      org: orgKey,
      howItWorksVideoUrl:
        org.howItWorksVideoUrl || ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT,
    },
  ])
);

export {ORGS, ORG_TYPES, ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT};
