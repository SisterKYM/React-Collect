import React from 'react';

import {colors} from 'theme/constants';
import config from 'config';

const GlobalStyles = () => (
  <style jsx global>{`
    .horizontal-flex {
      display: flex;
      flex-direction: row;
    }
    .vertical-flex {
      display: flex;
      flex-direction: column;
    }
    .flex-fill {
      flex: 1;
    }
    .flex-fill-2 {
      flex: 2;
    }
    .top-nav {
      padding: 1rem 1.5rem;
      min-height: 70px; // safari-hotfix
      height: 70px;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 1px 3px #0000000a;
      border: 1px solid #eaedf3;
    }
    .top-nav-item {
      margin-right: 4.5rem;
    }
    .collection {
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 0.875rem;
      position: relative;
    }
    .collection:not(:last-child) {
      margin-bottom: 1rem;
    }
    .collection-image {
      width: 94px;
      height: 94px;
    }
    .collection-image-sm {
      width: 50px;
      height: 50px;
    }
    .collection .collection-checkbox {
      visibility: hidden;
      position: absolute;
      top: calc(50% - 10px);
      left: 26px;
    }
    .collection .collection-checkbox.checked,
    .collection:hover .collection-checkbox,
    .collections-body-mobile .collection .collection-checkbox {
      visibility: visible;
    }
    .collection-image.empty,
    .collection-image-sm.empty {
      color: white;
      background-color: #eeeeee;
      padding: 5px;
    }
    .collection-info {
      margin-left: 1.5rem;
    }
    .collection-info__name {
      font-size: 16px;
      line-height: 24px;
    }
    .collection-amount-action {
    }
    .collection-amount {
      width: 10rem;
    }
    .collection-action {
      margin-right: 1.25rem;
    }
    // colors
    .brand {
      color: ${config.colors.brand};
    }
    .nav-item-highlight {
      background-color: ${config.colors.secondarySidebarNavItem};
    }
    .f18 {
      font-size: 18px;
    }
    .bg-dark-grey {
      background-color: #373737;
    }
    .dark-grey {
      color: #373737;
    }
    .medium-grey {
      color: #9e9e9e;
    }
    .light-grey {
      color: #5e5e5e;
    }
    .vh {
      visibility: hidden;
    }
    .mt21 {
      margin-top: 21px;
    }
    .bg-brand {
      background-color: ${config.colors.brand};
    }
    .b--brand {
      border-color: ${config.colors.brand};
    }
    .accent {
      color: ${config.colors.accent};
    }
    .profile-image-fill-color {
      fill: ${config.colors.lightTint};
    }
    .profile-image-icon-camera-wrapper {
      fill: ${config.colors.tint};
    }
    .bg-accent {
      background-color: ${config.colors.accent};
    }
    .hover-bg-accent:hover {
      background-color: ${config.colors.accent};
    }
    .bg-alert {
      background-color: ${config.colors.alert};
    }
    .hover-bg-alert:hover {
      background-color: ${config.colors.alert};
    }
    .tint {
      color: ${config.colors.tint};
    }
    .bg-tint {
      background-color: ${config.colors.tint};
    }
    .bg-light-tint {
      background-color: ${config.colors.lightTint};
    }
    .b--tint {
      border-color: ${config.colors.tint};
    }
    .bg-flamingo {
      background-color: ${config.isCheddarUp ? '#f36d36' : config.colors.brand};
    }
    .b--flamingo {
      border-color: ${config.isCheddarUp ? '#f36d36' : config.colors.brand};
    }
    .flamingo {
      color: ${config.isCheddarUp ? '#f36d36' : config.colors.brand};
    }
    .bg-flamingo {
      background-color: ${config.isCheddarUp ? '#f36d36' : config.colors.brand};
    }
    .b-standard {
      border-color: #e2e3e4;
    }
    .aqua {
      color: #b0e0e6;
    }
    .bg-aqua {
      background-color: #b0e0e6;
    }
    .bg-jagged-ice {
      background-color: #c4e6ea;
    }
    .light-aqua {
      color: #d7eff2;
    }
    .bg-light-aqua {
      background-color: #d7eff2;
    }
    .b--light-aqua {
      border-color: #d7eff2;
    }
    .gray {
      color: ${colors.gray};
    }
    .gray-100 {
      color: ${colors.gray100};
    }
    .bg-gray-100 {
      background-color: ${colors.gray100};
    }
    .bg-lighter-gray {
      background-color: #f1f2f2;
    }
    .b--gray-100 {
      border-color: ${colors.gray100};
    }
    .gray-200 {
      color: #f2f2f2;
    }
    .bg-gray-200 {
      background-color: #f2f2f2;
    }
    .b--gray {
      border-color: ${colors.gray};
    }
    .b--gray-200 {
      border-color: #f2f2f2;
    }
    .bg-gray-250 {
      background-color: #eeeeee;
    }
    .gray-300 {
      color: ${colors.gray};
    }
    .bg-gray-300 {
      background-color: ${colors.gray};
    }
    .b--gray-300 {
      border-color: ${colors.gray};
    }
    .b--thick-gray {
      border-color: #969696;
    }
    .gray-350 {
      color: #3e3f42;
    }
    .gray-400 {
      color: ${colors.darkGray};
    }
    .bg-gray-400 {
      background-color: ${colors.darkGray};
    }
    .gray-500 {
      color: #777777;
    }
    .bg-gray-500 {
      background-color: #777777;
    }
    .gray-550 {
      color: #4a4a4a;
    }
    .bg-gray-550 {
      background-color: #4a4a4a;
    }
    .b--gray-550 {
      border-color: #4a4a4a;
    }
    .gray-600 {
      color: ${colors.gray600};
    }
    .bg-gray-600 {
      background-color: ${colors.gray600};
    }
    .gray-700 {
      color: #414142;
    }

    @media print {
      .dn-p {
        display: 'none';
      }
    }

    .hover-gray-100:hover {
      background-color: #fafafa;
    }
    .hover-bg-light-aqua:hover {
      background-color: #d7eff2;
    }

    .content-container {
      max-width: 64rem;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    .pointer {
      cursor: pointer;
    }
    .move {
      cursor: move;
    }
    .move {
      cursor: move;
    }
    .not-allowed {
      cursor: not-allowed;
    }
    .cursor-default {
      cursor: default;
    }

    .pointer-events-none {
      pointer-events: none;
    }

    .sortable-drag {
      user-select: none;
      background-color: #d7eff2;
    }

    .modal-shadow {
      box-shadow: 0px 0px 8px #0000004d;
    }
    .shadow-6 {
      box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.2);
    }
    .shadow-light {
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
    }
    .shadow-none {
      box-shadow: none;
    }
    .input-prompt-box {
      box-shadow: 0px 0px 8px #0000004d;
    }
    .card-shadow {
      box-shadow: 0px 1px 3px #0000000a;
    }

    .avenir-medium {
      font-family: 'AvenirLTStd-Medium', sans-serif;
    }
    .avenir-roman {
      font-family: 'AvenirLTStd-Roman', sans-serif;
    }
    .avenir-heavy {
      font-family: 'AvenirLTStd-Heavy', sans-serif;
    }
    .avenir-light {
      font-family: 'AvenirLTStd-Light', sans-serif;
    }
    .avenir-light-oblique {
      font-family: 'AvenirLTStd-LightOblique', sans-serif;
    }
    .open-sans {
      font-family: 'Open Sans', sans-serif;
    }
    .merriweather {
      font-family: 'Merriweather', serif;
    }

    .lh0 {
      line-height: 0;
    }
    .lh1 {
      line-height: 1.5em;
    }
    .lh-normal {
      line-height: normal;
    }

    .markdown {
      line-height: 1.15;
    }
    .markdown p:not(:first-child):not(:last-child) {
      margin-top: 14px;
      margin-bottom: 14px;
    }
    .markdown strong {
      font-family: 'AvenirLTStd-Heavy';
      font-weight: 400;
    }
    .markdown ul,
    ol {
      padding: initial;
      margin: initial;
      margin-top: 1rem;
      margin-bottom: 1rem;
      list-style-position: inside;
    }
    .markdown ul {
      list-style-type: disc;
    }
    .markdown ol {
      list-style-type: decimal;
    }

    .sticky {
      position: sticky;
    }

    .f-large {
      font-size: 1.625rem;
    }
    .f-regular {
      font-size: 1.125rem;
    }
    .f-normal {
      font-size: 1rem;
    }
    .f-small {
      font-size: 0.875rem;
    }
    .f8 {
      font-size: 0.75rem;
    }
    .f9 {
      font-size: 0.6875rem;
    }
    @media (max-width: 30em) {
      .f9-s {
        font-size: 0.6875rem;
      }
    }

    @media (min-width: 30em) {
      .shadow-none-ns {
        box-shadow: none;
      }
      .shadow-6-ns {
        box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.2);
      }
      .sticky-ns {
        position: sticky;
      }
      .f-regular-ns {
        font-size: 1.125rem;
      }
      .bg-tint-ns {
        background-color: ${config.colors.tint};
      }
      .bg-gray-200-ns {
        background-color: #f2f2f2;
      }
      .bg-transparent-ns {
        background-color: transparent;
      }
    }

    @media (min-width: 30em) and (max-width: 60em) {
      .sticky-m {
        position: sticky;
      }
    }

    @media (min-width: 60em) {
      .sticky-l {
        position: sticky;
      }
      .bg-light-tint-l {
        background-color: ${config.colors.lightTint};
      }
    }

    :global(.default-avatar-icon) {
      fill: ${config.siteName === 'PIXIE_LANE'
        ? colors.darkGray
        : config.colors.lightTint} !important;
      stroke: ${config.siteName === 'PIXIE_LANE'
        ? colors.darkGray
        : config.colors.lightTint} !important;
    }

    .public-DraftEditorPlaceholder-root {
      margin: 1px !important;
      border: 1px solid transparent;
    }

    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
      line-height: 24px;
      color: #373737;
    }

    .rich-text-markdown.size-16 .public-DraftStyleDefault-block,
    .rich-text-markdown.size-16 .public-DraftEditorPlaceholder-root {
      font-size: 16px;
      line-height: 24px;
    }

    .public-DraftEditorPlaceholder-inner {
      color: #9e9e9e;
    }
    .public-DraftStyleDefault-block {
      font-size: 14px;
      line-height: 20px;
      color: #373737;
    }

    input::placeholder {
      color: #9e9e9e;
    }

    /* Fallback for Edge */
    @supports (-ms-ime-align: auto) {
      input::-ms-input-placeholder {
        color: #9e9e9e;
      }
    }

    /* Fallback for IE */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      input:-ms-input-placeholder {
        color: #9e9e9e;
      }
    }
    .p-25 {
      padding: 25px;
    }
    .text-9 {
      font-size: 9px;
    }
    .text-10 {
      font-size: 10px;
    }
    .text-12 {
      font-size: 12px;
      line-height: 20px;
    }
    .text-14 {
      font-size: 14px;
      line-height: 20px;
    }
    .line-20 {
      line-height: 20px;
    }
    .text-16 {
      font-size: 16px;
      line-height: 20px;
    }
    .text-18 {
      font-size: 18px;
      line-height: 20px;
    }
    .line-24 {
      line-height: 24px;
    }
    .text-24 {
      font-size: 24px;
      line-height: 44px;
    }
    .text-32 {
      font-size: 32px;
      line-height: 44px;
    }
    .text-capitalize {
      text-transform: capitalize;
    }
    .no-outline {
      outline: none;
    }
    @media (max-width: 30em) {
      .flex.responsive {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }
    }
    .feature-bullet {
      line-height: 18px;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--selected:hover {
      background-color: ${config.colors.tint};
    }
    .react-datepicker__current-month,
    .react-datepicker__day-name {
      color: ${colors.gray600};
    }
    .inline-block {
      display: inline-block;
    }
    .collections-sidebar__container {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background-color: #b0dfe5;
      min-height: calc(100vh - 70px);
    }
    .collections-sidebar {
      position: sticky;
      top: 0;
    }
    .collections-sidebar .link {
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: background-color 0.3s;
    }
    .collections-sidebar .link .icon-box {
      display: inline-flex;
      width: 64px;
      height: 56px;
      padding: 8px;
      justify-content: center;
      align-items: center;
      color: #257a91;
    }
    .collections-sidebar .link.active,
    .collections-sidebar .link:hover {
      background-color: #d7eef1;
    }
    .collections-sidebar .link .text {
      display: inline-block;
      width: 0;
      white-space: nowrap;
      transition: width 0.3s;
      overflow: hidden;
    }
    .collections-sidebar:hover .link .text {
      width: 200px;
    }
    .collections-sidebar-mobile .nav-item {
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: background-color 0.3s;
    }
    .collections-sidebar-mobile .link.bd0 {
      border: none;
    }
    .collections-sidebar-mobile .nav-item .icon-box {
      display: inline-flex;
      width: 64px;
      height: 56px;
      padding: 8px;
      justify-content: center;
      align-items: center;
      color: #257a91;
    }
    .collections-sidebar-mobile .nav-item.active {
      background-color: #d7eef1;
    }
    .collections-sidebar-mobile .nav-item {
      height: 56px;
      border-bottom: 1px solid #eaedf3;
    }
    .collections-sidebar-mobile .nav-item:last-child,
    .collections-sidebar-mobile .nav-item.subnav-item {
      border-bottom: 0;
    }
    .collections-sidebar-mobile .nav-item .text {
      display: inline-flex;
      width: 200px;
      white-space: nowrap;
      transition: width 0.3s;
      overflow: hidden;
    }
    .collections-sidebar-mobile .overlay {
      opacity: 0.4;
      height: 100vh;
      z-index: 15;
    }
    .link:focus {
      outline: none;
    }
    .payment-list-item {
      padding: 22px 15px 16px 40px;
    }
    .payment-row .method {
      width: 8rem;
    }
    .payment-row .amount {
      width: 5rem;
    }
    .payment-row .date {
      width: 6rem;
    }
    .payment-row .actions {
      width: 3.125rem;
    }
    .payment-list-item {
      border-bottom: 1px solid #eaedf3;
    }
    .payment-list-item .info {
      font-size: 16px;
      line-height: 22px;
    }
    .payment-list-item .amount,
    .payment-list-item .method,
    .payment-list-item .date {
      font-size: 14px;
    }
    .payment-list-item .info .recurring {
      margin-top: 0.75rem;
    }
    .payment-list-item .info .recurring .edit,
    .payment-list-item .info .recurring .cancel {
      color: #257a91;
    }
    .payment-list-item .recurring-item:not(:last-child) {
      margin-bottom: 45px;
    }
    .overflow-y--auto {
      overflow-y: auto;
    }
    .overflow-y-visible {
      overflow-y: visible;
    }
    .content .title {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 1.5rem;
    }
    .content .sub-title {
      font-size: 24px;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }
    .content .sub-title.mobile {
      line-height: 30px;
    }
    .content .card {
      background-color: #ffffff;
      box-shadow: 0px 1px 3px #0000000a;
      border: 1px solid #eaedf3;
      border-radius: 4px;
    }
    .empty-collections {
      padding: 0.75rem 0.75rem;
      border-color: #dddddd;
    }
    .empty-collections h4 {
      margin: 2rem 0;
    }
    .pa3-25 {
      padding: 1.25rem;
    }
    .pt3-25 {
      padding-top: 1.25rem;
    }
    .pa3-5 {
      padding: 1.5rem;
    }
    .pt3-5 {
      padding-top: 1.5rem;
    }
    .ph2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .ph3-5 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    .pv3-5 {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    .pl3-5 {
      padding-left: 1.5rem;
    }
    .pa4-25 {
      padding: 2.25rem;
    }
    .pt2-5 {
      padding-top: 0.75rem;
    }
    .ma3-5 {
      margin: 1.5rem;
    }
    .mr3-5 {
      margin-right: 1.5rem;
    }
    .ml3-5 {
      margin-left: 1.5rem;
    }
    .mb3-25 {
      margin-bottom: 1.25rem;
    }
    .mb3-5 {
      margin-bottom: 1.5rem;
    }
    .mb2-5 {
      margin-bottom: 0.75rem;
    }
    .mr2-5 {
      margin-right: 0.75rem;
    }
    .mt2-5 {
      margin-top: 0.75rem;
    }
    .mt3-25 {
      margin-top: 1.25rem;
    }
    .mt3-75 {
      margin-top: 1.75rem;
    }
    .mt3-5 {
      margin-top: 1.5rem;
    }
    .mt4-25 {
      margin-top: 2.25rem;
    }
    .mb4-5 {
      margin-bottom: 2.5rem;
    }
    .mb4-75 {
      margin-bottom: 2.75rem;
    }
    .ml2-5 {
      margin-left: 0.75rem;
    }
    .mt2-5 {
      margin-top: 0.75rem;
    }
    .mv2-5 {
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .mv3-25 {
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .round-social-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .shared-collection-card {
      display: inline-block;
      width: calc((100% - 3rem) / 3);
      border: 1px solid #e2e3e4;
      margin-right: 1.5rem;
    }
    .shared-collection-card > div {
      position: relative;
      padding-bottom: 80%;
    }
    .shared-collection-card > div > div {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .shared-collection-card:nth-child(3n) {
      margin-right: 0;
    }
    .shared-collection-card__image {
      flex: 1;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    @media (max-width: 64rem) {
      .shared-collection-card {
        width: calc((100% - 1.5rem) / 2);
      }
      .shared-collection-card:nth-child(3n) {
        margin-right: 1.5rem;
      }
      .shared-collection-card:nth-child(2n) {
        margin-right: 0;
      }
    }
    @media (max-width: 40rem) {
      .shared-collection-card {
        width: 100%;
      }
      .shared-collection-card {
        margin-right: 0;
      }
    }
    .shared-collections__category-box__header {
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 20px;
    }
    .shared-collection-card__title {
      height: 72px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .hamburger {
      left: 1.25rem;
    }
    .nav-upgrade {
      font-size: 12px;
      font-family: 'AvenirLTStd-Roman', sans-serif;
      padding: 4px 32px;
    }
    .step-modal-container {
      padding: 2.5rem;
      padding-bottom: 1.75rem;
    }
    .step-modal-container .step-modal-title {
      font-size: 25px;
      letter-spacing: 0.2px;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    .step-modal-container .sub-title {
      font-size: 14px;
      letter-spacing: 0.15px;
      text-align: center;
      margin-bottom: 10px;
    }
    .step-modal-container .link {
      letter-spacing: -0.4px;
    }
    .letter--3 {
      letter-spacing: -0.3px;
    }
    .step-modal-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .step-modal-right .description {
      margin-bottom: 29px;
    }
    .step-modal-right .description h1 {
      font-size: 24px;
      margin-left: 1rem;
      margin-bottom: 0.75rem;
    }
    .step-modal-right .description p {
      font-size: 13px;
      margin-left: 5px;
      letter-spacing: 0.15px;
      margin-bottom: 5px;
    }
    .step-modal-right .description .learn-more {
      font-size: 11px;
      margin: 0 auto;
      width: fit-content;
      letter-spacing: -0.1px;
    }
    .step-modal-right .form-footer .save-button {
      width: 156px;
      height: 30px;
    }
    .full-screen-modal {
      margin: 0 !important;
      max-width: unset;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0 !important;
    }
    #CollectionsReportModal {
      top: 70px;
    }
    #CollectionsReportModal .overlay {
      top: 70px;
      background-color: white;
    }
    .account-content input[disabled],
    .account-content div.disabled {
      background-color: #eeeeee;
    }
  `}</style>
);

const EnhancedGlobalStyles = React.memo(GlobalStyles);

export default EnhancedGlobalStyles;
