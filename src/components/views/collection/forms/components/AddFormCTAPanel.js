import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

import {ReactComponent as FormPlusSolidIcon} from 'theme/images/form-plus-solid-icon.svg';
import config from 'config';

const AddFormCTAPanel = () => {
  const collection = useSelector(state => state.collections.collection);

  return (
    <div className="mw7 w-100">
      <Link
        to={
          collection
            ? `/collection/${collection.user_id}/${collection.id}/forms/add-form`
            : '/'
        }
      >
        <div className="pa3 br2 shadow-6 bg-white">
          <div className="pa3 pa4-ns tc dark-grey">
            <h2 className="mb3 mb4-ns avenir-light lh-copy">
              Need to collect information?
              <br />
              Add forms to your {config.strings.collection}
            </h2>
            <FormPlusSolidIcon className="w3" fill={config.colors.brand} />
            <style jsx>{`
              img {
                height: 75px;
              }
            `}</style>
          </div>
        </div>
      </Link>
    </div>
  );
};

const EnhancedAddFormCTAPanel = React.memo(AddFormCTAPanel);

export default EnhancedAddFormCTAPanel;
