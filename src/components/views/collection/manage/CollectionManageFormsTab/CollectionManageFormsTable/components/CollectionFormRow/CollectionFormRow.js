import React from 'react';

import {generatePath} from 'react-router-dom';
import config from 'config';

import FormActionsDropdown from './FormActionsDropdown';

class CollectionFormRow extends React.PureComponent {
  handleEditForm = () => {
    const {history, collection, form} = this.props;
    const path = generatePath(
      '/collection/:owner/:collection/manage/forms/:form/edit',
      {
        owner: collection.user_id,
        collection: collection.id,
        form: form.id,
      }
    );

    history.push(path);
  };

  render() {
    const {collection, form} = this.props;
    const reportFormTo = generatePath(
      '/collection/:owner/:collection/forms-report',
      {
        owner: collection.user_id,
        collection: collection.id,
      }
    );

    return (
      <div className="collection-form-row-container relative-ns pv3 bb b--gray-300 ph3 gray-600">
        <div className="flex items-center pl3">
          <div className="w-30 lh-copy">
            <h4 className="f6 f5-ns avenir-roman pointer truncate">
              {form.name}
            </h4>
          </div>
          <div className="w-30 flex items-end">
            <div className="w-100 w-40-ns tl f6 f5-ns lh-copy avenir-light gray-600 truncate">
              <span>{form?.options?.isWaiver ? 'Waiver' : 'Form'}</span>
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-40-ns tl f6 f5-ns lh-copy avenir-light gray-600">
              <span>{form?.respondents || 0}</span>
            </div>
          </div>
          <div className="flex w-10 items-center justify-end ml-auto">
            <FormActionsDropdown
              className="ml3-ns"
              onEditForm={this.handleEditForm}
              reportFormTo={reportFormTo}
            />
          </div>
        </div>
        <style jsx>{`
          :global(.profile-icon) {
            width: 40px;
            height: 40px;
          }
          .checkbox-align-block {
            height: 21px;
          }
          .collection-form-row-container :global(#default-avatar-icon) {
            fill: ${config.siteName === 'PIXIE_LANE'
              ? config.colors.tint
              : config.colors.lightTint} !important;
            stroke: ${config.colors.lightTint} !important;
          }
        `}</style>
      </div>
    );
  }
}

export default CollectionFormRow;
