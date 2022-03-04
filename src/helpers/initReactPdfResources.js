import {Font} from '@react-pdf/renderer';

const initReactPdf = () => {
  Font.register({
    family: 'AvenirLTStd-Medium',
    src: `${window.location.origin}/webfonts/338CD6_2_unhinted_0.ttf`,
  });
  Font.register({
    family: 'AvenirLTStd-Roman',
    src: `${window.location.origin}/webfonts/338CD6_4_unhinted_0.ttf`,
  });
  Font.register({
    family: 'AvenirLTStd-Light',
    src: `${window.location.origin}/webfonts/338CD6_5_unhinted_0.ttf`,
  });
  Font.register({
    family: 'AvenirLTStd-Light-Oblique',
    src: `${window.location.origin}/webfonts/338CD6_6_unhinted_0.ttf`,
  });
};

export default initReactPdf;
