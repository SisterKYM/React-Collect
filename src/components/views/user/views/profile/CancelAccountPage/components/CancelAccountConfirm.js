import {Link} from 'react-router-dom';
import React from 'react';

import {Button} from 'elements';

class CancelAccountConfirm extends React.PureComponent {
  render() {
    return (
      <>
        <p className="mt3">Are you sure you want to cancel your account?</p>
        <div className="mv3">
          <ul>
            <li className="lh-copy">
              &bull; Want to change your partner affiliation?
              <br />
              <a
                className="list-item-link"
                href={this.props.changePartnerAffilationUrl}
              >
                Let us know.
              </a>
            </li>
            <li className="mt3 lh-copy">
              &bull; Want to cancel your subscription?
              <br />
              <Link className="list-item-link" to={this.props.billingPath}>
                You can do that here.
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex mt3 justify-start">
          <Button
            small
            backgroundColorSet
            className="mr3 bg-brand"
            onClick={this.props.onKeepAccount}
          >
            Nevermind, keep my account
          </Button>
          <Button
            small
            colorSet
            backgroundColorSet
            className="gray-400 bg-gray-200"
            onClick={this.props.onConfirmDeleteAccount}
          >
            Delete my account
          </Button>
        </div>
        <style jsx>{`
          :global(.list-item-link) {
            margin-left: 16px;
          }
        `}</style>
      </>
    );
  }
}

export default CancelAccountConfirm;
