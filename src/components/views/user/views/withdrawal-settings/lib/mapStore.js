import {
  CREATE_WITHDRAWAL_BANK_ACCOUNT,
  DELETE_WITHDRAWAL_BANK_ACCOUNT,
  GET_BANK_ACCOUNTS,
} from 'redux/modules/bankAccounts/constants';

const mapStore = ({async: {metadatas, statuses}, bankAccounts, session}) => ({
  bankAccounts,
  addingBankStatus: statuses[CREATE_WITHDRAWAL_BANK_ACCOUNT],
  deleteBankMetaData: metadatas[DELETE_WITHDRAWAL_BANK_ACCOUNT],
  deleteBankStatus: statuses[DELETE_WITHDRAWAL_BANK_ACCOUNT],
  loading: statuses[GET_BANK_ACCOUNTS] === 'pending',
  session,
});

export default mapStore;
