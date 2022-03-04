import React from 'react';
import ReactSortable from 'react-sortablejs';
import shortid from 'shortid';

import {sortableOptions} from 'theme/sortable';

import CollectionObjectFieldChoiceListItem from './CollectionObjectFieldChoiceListItem';

const sortClassName = shortid.generate();

class CollectionObjectFieldChoiceList extends React.PureComponent {
  handleFocusInput = choice => {
    const choicePosition = this.props.choices.findIndex(
      ({id}) => id === choice.id
    );

    if (choicePosition !== this.props.choices.length - 1) {
      return;
    }

    this.props.onChange([
      ...this.props.choices,
      {
        id: shortid.generate(),
        value: '',
      },
    ]);
  };

  handleChangeChoice = (newValue, choiceToChange) => {
    const nextChoices = [...this.props.choices];
    const choiceToChangePosition = this.props.choices.findIndex(
      choice => choice.id === choiceToChange.id
    );

    nextChoices.splice(choiceToChangePosition, 1, {
      id: choiceToChange.id,
      value: newValue,
    });

    this.props.onChange(nextChoices);
  };

  handleRemoveChoice = choiceToRemove => {
    if (this.props.choices.length === 1) {
      return;
    }

    this.props.onChange(
      this.props.choices.filter(choice => choice.id !== choiceToRemove.id)
    );
  };

  handleChangeOrder = order => {
    const nextChoices = order.map(orderId =>
      this.props.choices.find(choice => choice.id === orderId)
    );

    this.props.onChange(nextChoices);
  };

  renderChoice = (choice, idx, choices) => {
    const required =
      choices.filter(choice => Boolean(choice.value)).length === 0;

    return (
      <div
        key={choice.id}
        className="mv3 w-100 w-two-thirds-ns"
        data-id={choice.id}
      >
        <CollectionObjectFieldChoiceListItem
          sortingHandleClassName={sortClassName}
          checkboxVisible={this.props.checkboxVisible}
          removable={idx !== 0 || this.props.choices.length > 1}
          choice={choice}
          required={required && !idx}
          onFocusInput={this.handleFocusInput}
          onChangeChoice={this.handleChangeChoice}
          onRemoveChoice={this.handleRemoveChoice}
        />
      </div>
    );
  };

  render() {
    return (
      <ReactSortable
        options={{
          ...sortableOptions,
          handle: `.${sortClassName}`,
        }}
        onChange={this.handleChangeOrder}
      >
        {this.props.choices.map(this.renderChoice)}
      </ReactSortable>
    );
  }
}

export default CollectionObjectFieldChoiceList;
