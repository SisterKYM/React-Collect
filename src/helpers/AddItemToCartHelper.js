const Helper = {
  getErrorBody: err => {
    let body;
    if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors[0]
    ) {
      const responseBody = err.response.data.errors[0];
      const apiError = responseBody.error;
      if (apiError === 'exceeded_available_quantity') {
        const details = responseBody.details;
        const {available} = details;
        let quantityError = 'it is sold out';
        if (available > 0) {
          quantityError = `there ${
            available === 1 ? 'is' : 'are'
          } only ${available} available for sale`;
        }
        body = `Sorry, you requested ${details.requested} of ${details.tab_item_name}, but ${quantityError}.`;
      }
    }
    body = body || 'Something went wrong, please try again later.';

    return body;
  },
};

export default Helper;
