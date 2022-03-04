const promiseStripeToken = (data = {}, type = 'card') =>
  window.StripeInstance.createToken(type, data);

export default promiseStripeToken;
