import React from 'react';

import {
  borderColor,
  borderWidth,
  colors,
  fontFamily,
  inputHeight,
} from 'theme/constants';
import config from 'config';

const DefaultStyles = () => (
  <style jsx global>{`
    * {
      box-sizing: border-box;
    }
    *:disabled {
      cursor: not-allowed;
    }
    html,
    body {
      margin: 0px;
      padding: 0px;
      font-family: ${fontFamily};
      font-style: normal;
      font-weight: normal;
      background-color: ${colors.gray100};
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0px;
      font-style: normal;
      font-weight: normal;
      font-family: AvenirLTStd-Roman, sans-serif;
    }
    a {
      color: ${config.colors.tint};
      text-decoration: none;
    }
    p {
      margin: 0px;
    }
    input[type='text'],
    input[type='number'],
    input[type='password'],
    input[type='search'],
    input[type='email'] {
      font-family: ${fontFamily};
      width: 100%;
      outline: none;
      color: ${colors.gray600};
      height: ${inputHeight}px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      background-color: #ffffff;
    }
    textarea {
      font-family: ${fontFamily};
      border-radius: 5px;
      width: 100%;
      border-width: 0px;
      height: 100%;
      outline: none;
      padding: 0.5rem;
      font-size: 1rem;
    }
    input::placeholder,
    textarea::placeholder {
      color: ${colors.darkGray};
    }
    select {
      font-family: ${fontFamily};
      border-style: solid;
      border-radius: 0.25rem;
      width: 100%;
      border-width: 0px;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: ${inputHeight};
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      background-color: white;
    }
    hr {
      border-top-color: ${borderColor};
      border-top-width: ${borderWidth}px;
      border-top-style: solid;
      border-bottom: 0px;
    }
    button {
      margin: 0px;
      border: 0px;
      font-family: ${fontFamily};
      outline: none;
      cursor: pointer;
      white-space: nowrap;
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 13px;
      padding-right: 13px;
      -webkit-appearance: none;
    }
    ul {
      margin: 0px;
      padding-left: 0px;
      list-style-type: none;
    }
    label {
      font-size: 0.875rem;
      font-family: AvenirLTStd-Roman, sans-serif;
    }
    #livechat-full,
    #launcher,
    #webWidget,
    #livechat-compact-container {
      left: 1rem !important;
    }
    #beacon-container,
    .Beacon,
    #HSBeaconFabButton,
    #HSBeaconContainerFrame {
      left: 100px !important;
    }
    @media (max-width: 30em) {
      #livechat-full,
      #launcher,
      #webWidget,
      #livechat-compact-container {
        display: none !important;
      }
      #beacon-container,
      .Beacon,
      #HSBeaconFabButton,
      #HSBeaconContainerFrame {
        display: none !important;
      }
    }
    @media only screen and (max-width: 60em) and (-webkit-min-device-pixel-ratio: 1) {
      #livechat-full,
      #launcher,
      #webWidget,
      #livechat-compact-container {
        display: none !important;
      }
      #beacon-container,
      .Beacon,
      #HSBeaconFabButton,
      #HSBeaconContainerFrame {
        display: none !important;
      }
    }
    @media print {
      html,
      body {
        -webkit-print-color-adjust: exact;
      }
      #livechat-full,
      #launcher,
      #webWidget,
      #livechat-compact-container {
        display: none;
      }
      #beacon-container,
      .Beacon,
      #HSBeaconFabButton,
      #HSBeaconContainerFrame {
        display: none;
      }
    }
  `}</style>
);

const EnhancedDefaultStyles = React.memo(DefaultStyles);

export default EnhancedDefaultStyles;
