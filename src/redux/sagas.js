import {all} from 'redux-saga/effects';

import bankAccounts from 'redux/modules/bankAccounts/sagas';
import categories from 'redux/modules/categories/sagas';
import collectionDeposits from 'redux/modules/collectionDeposits/sagas';
import collections from 'redux/modules/collections/sagas';
import collectionsHome from 'redux/modules/collectionsHome/sagas';
import contact from 'redux/modules/contact/sagas';
import discounts from 'redux/modules/discounts/sagas';
import fields from 'redux/modules/fields/sagas';
import forms from 'redux/modules/forms/sagas';
import growl from 'redux/modules/growl/sagas';
import invitations from 'redux/modules/invitations/sagas';
import items from 'redux/modules/items/sagas';
import managers from 'redux/modules/managers/sagas';
import memberInvites from 'redux/modules/memberInvites/sagas';
import members from 'redux/modules/members/sagas';
import orgMembers from 'redux/modules/orgMembers/sagas';
import paymentAccounts from 'redux/modules/paymentAccounts/sagas';
import payments from 'redux/modules/payments/sagas';
import recurringPayments from 'redux/modules/recurringPayments/sagas';
import sellersForms from 'redux/modules/sellersForms/sagas';
import session from 'redux/modules/session/sagas';
import stripe from 'redux/modules/stripe/sagas';
import themes from 'redux/modules/themes/sagas';
import withdrawals from 'redux/modules/withdrawals/sagas';

function* rootSaga() {
  yield all([
    forms(),
    growl(),
    items(),
    stripe(),
    themes(),
    fields(),
    contact(),
    session(),
    members(),
    managers(),
    payments(),
    discounts(),
    categories(),
    withdrawals(),
    collections(),
    invitations(),
    bankAccounts(),
    sellersForms(),
    paymentAccounts(),
    collectionsHome(),
    recurringPayments(),
    memberInvites(),
    orgMembers(),
    collectionDeposits(),
  ]);
}

export default rootSaga;
