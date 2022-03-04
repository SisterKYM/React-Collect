import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';
import removeMarkdown from 'remove-markdown';

import {colors} from 'theme/constants';

import PaymentHeader from './PaymentHeader';
import PaymentObjectFieldViewRow from './PaymentObjectFieldViewRow';

const styles = StyleSheet.create({
  tabObjectNameWrapper: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.gray,
  },
  tabObjectName: {
    fontSize: 12,
    fontFamily: 'AvenirLTStd-Light',
    color: colors.black,
  },
  description: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontSize: 10,
    fontFamily: 'AvenirLTStd-Light-Oblique',
    color: colors.black,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray,
  },
  fieldViewListContainer: {
    marginVertical: 8,
  },
});

class PaymentItem extends React.PureComponent {
  renderItemFieldView = itemFieldView => (
    <PaymentObjectFieldViewRow
      key={itemFieldView.id}
      fieldView={itemFieldView}
    />
  );

  render() {
    const {paymentItem, tabMember} = this.props;
    const tabObject = paymentItem.tab_item || paymentItem.tab_form;
    const description = removeMarkdown(tabObject.description);

    return (
      <>
        <PaymentHeader
          collectionName={this.props.collectionName}
          tabMember={tabMember}
        />
        <View style={styles.tabObjectNameWrapper}>
          <Text style={styles.tabObjectName}>{tabObject.name}</Text>
        </View>
        {Boolean(description) && (
          <View>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.separator} />
          </View>
        )}
        <View style={styles.fieldViewListContainer}>
          {paymentItem.item_field_views.map(this.renderItemFieldView)}
        </View>
      </>
    );
  }
}

export default PaymentItem;
