import {Link} from 'react-router-dom';
import React from 'react';

import {CommonButton} from 'elements';

const CreateCollectionCTA = ({collectionCreatePath}) => (
  <div className="withdraw-content-container bg-light-tint br2 gray-600">
    <h2 className="avenir-roman">Let&apos;s get you some cheddar</h2>
    <div className="flex mt2 mb3 justify-center">
      <div className="mw7 description">
        Create a collection and start collecting. You can withdraw $ directly
        into your bank account.
      </div>
    </div>
    <Link to={collectionCreatePath}>
      <CommonButton className="pt-14 bg-brand white">
        Create a Collection
      </CommonButton>
    </Link>
    <style jsx>{`
      h2 {
        font-size: 18px;
        line-height: 32px;
      }
      .withdraw-content-container {
        display: inline-block;
        padding: 30px 25px;
      }
      .description {
        font-size: 14px;
        line-height: 21px;
      }
    `}</style>
  </div>
);

const EnhancedCreateCollectionCTA = React.memo(CreateCollectionCTA);

export default EnhancedCreateCollectionCTA;
