import React from 'react';

import {CollectionObjectFieldValue} from 'elements';

class CollectionObjectFieldListItem extends React.PureComponent {
  handleClickContainer = () => {
    this.props.onEdit(this.props.field);
  };

  handleClickInput = (event) => {
    event.stopPropagation();
  };

  render() {
    const {field} = this.props;

    switch (field.field_type) {
      case 'text':
        return (
          <CollectionObjectFieldValue.OpenText
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
          />
        );
      case 'multiple_choice':
        return (
          <CollectionObjectFieldValue.MultipleChoice
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      case 'checkbox':
        return (
          <CollectionObjectFieldValue.Checkbox
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      case 'date':
        return (
          <CollectionObjectFieldValue.Date
            className="w-third-l"
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      case 'time':
        return (
          <CollectionObjectFieldValue.Time
            className="w-third-l"
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      case 'phone':
        return (
          <CollectionObjectFieldValue.Phone
            className="w-third-l"
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      case 'signature':
        return (
          <CollectionObjectFieldValue.Signature
            sortClassName={this.props.sortClassName}
            field={field}
            small
            onClick={this.handleClickContainer}
            onClickInput={this.handleClickInput}
          />
        );
      default:
        return null;
    }
  }
}

export default CollectionObjectFieldListItem;
