import {get} from 'lodash';

const propsMapper = props => ({
  ...props,
  bankAccounts: get(props, 'bankAccounts.bankAccounts.banks', []).map(b => ({
    id: b.id,
    imgSrc: null,
    last4: b.last4,
    name: b.nickname || b.bank_name,
  })),
  baStatus: {
    id: get(props, 'deleteBankMetaData.id', ''),
    label: props.deleteBankStatus,
  },
  currentUrl: props.location.pathname,
  isCanadian: get(props, 'session.user.currency', '') === 'cad',
});

export default propsMapper;
