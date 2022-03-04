import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as reduxFormReducer} from 'redux-form';

import appHistory from 'appHistory';

import accountReducer from './modules/account';
import asyncReducer from './modules/async';
import bankAccountsReducer from './modules/bankAccounts';
import browserReducer from './modules/browser';
import categoriesReducer from './modules/categories';
import collectionDepositsReducer from './modules/collectionDeposits';
import collectionsHomeReducer from './modules/collectionsHome';
import collectionsReducer from './modules/collections';
import discountsReducer from './modules/discounts';
import drawerMenuReducer from './modules/drawerMenu';
import folderReducer from './modules/folder';
import formsReducer from './modules/forms';
import growlReducer from './modules/growl';
import invitationsReducer from './modules/invitations';
import itemsReducer from './modules/items';
import managersReducer from './modules/managers';
import memberInvitesReducer from './modules/memberInvites';
import membersReducer from './modules/members';
import orgMembersReducer from './modules/orgMembers';
import paymentAccountsReducer from './modules/paymentAccounts';
import paymentsReducer from './modules/payments';
import recurringPaymentsReducer from './modules/recurringPayments';
import sellersFormsReducer from './modules/sellersForms';
import sessionReducer from './modules/session';
import stripeReducer from './modules/stripe';
import themesReducer from './modules/themes';
import withdrawalsReducer from './modules/withdrawals';

const routerReducer = connectRouter(appHistory);

const createReducer = () =>
  combineReducers({
    form: reduxFormReducer,
    forms: formsReducer,
    async: asyncReducer,
    growl: growlReducer,
    items: itemsReducer,
    themes: themesReducer,
    stripe: stripeReducer,
    session: sessionReducer,
    members: membersReducer,
    browser: browserReducer,
    managers: managersReducer,
    payments: paymentsReducer,
    router: routerReducer,
    discounts: discountsReducer,
    categories: categoriesReducer,
    drawerMenu: drawerMenuReducer,
    withdrawals: withdrawalsReducer,
    collections: collectionsReducer,
    invitations: invitationsReducer,
    bankAccounts: bankAccountsReducer,
    sellersForms: sellersFormsReducer,
    paymentAccounts: paymentAccountsReducer,
    collectionsHome: collectionsHomeReducer,
    recurringPayments: recurringPaymentsReducer,
    memberInvites: memberInvitesReducer,
    orgMembers: orgMembersReducer,
    collectionDeposits: collectionDepositsReducer,
    folder: folderReducer,
    account: accountReducer,
  });

export default createReducer;
