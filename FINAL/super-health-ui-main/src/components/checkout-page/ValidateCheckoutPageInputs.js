import moment from 'moment';

/**
 * @name validate
 * @description validates delivery data and billing data.
 * @param billingAddress the customers billing address
 * @param deliveryAddress customers address to be delivered to
 * @param checked same billing address
 * @return errors
 */

const validate = (deliveryData, billingData, checked) => {
  const errors = {};

  //  Validaiton for Delivery first name
  if (!deliveryData.firstName) {
    errors.firstName = 'This field is required.';
  } else if (deliveryData.firstName.trim().length < 3) {
    errors.firstName = 'First name must have at least three characters';
  } else if (!/^[A-Za-z'-\s]+$/.test(deliveryData.firstName.trim())) {
    errors.firstName = 'Dashes ( - ) and apostrophes ( \' ) are the only special characters allowed.';
  } else if (deliveryData.firstName[0].includes(' ') || deliveryData.firstName.endsWith(' ')) {
    errors.firstName = 'First name must not contain any leading or trailing white space.';
  } else if (/^.*[ ]{2}.*$/.test(deliveryData.firstName.trim())) {
    errors.firstName = 'First name may not have multiple spaces in a row.';
  }
  //  Validation for delivery middle initial
  if (deliveryData.Mi.length > 0 && (!/(^[A-Za-z.]{1,2}$)/.test(deliveryData.Mi.trim()))) {
    errors.Mi = 'Please enter your middle initial.';
  } else if (deliveryData.Mi.length > 0 && (deliveryData.Mi[0].includes(' ') || deliveryData.Mi.endsWith(' '))) {
    errors.Mi = 'Middle Initial must not contain any leading or trailing white space.';
  }
  //  Validation for delivery last name
  if (!deliveryData.lastName.trim()) {
    errors.lastName = 'This field is required.';
  } else if (deliveryData.lastName.trim().length < 3) {
    errors.lastName = 'Last name must have at least three characters';
  } else if (!/^[A-Za-z'-\s]+$/.test(deliveryData.lastName.trim())) {
    errors.lastName = 'Dashes ( - ) and apostrophes ( \' ) are the only special characters allowed.';
  } else if (deliveryData.lastName[0].includes(' ') || deliveryData.lastName.endsWith(' ')) {
    errors.lastName = 'Last name must not contain any leading or trailing white space.';
  } else if (/^.*[ ]{2}.*$/.test(deliveryData.lastName.trim())) {
    errors.lastName = 'Last name may not have multiple spaces in a row.';
  }

  //  Validaiton for delivery street
  if (!deliveryData.street.trim()) {
    errors.street = 'This field is required.';
  } else if (deliveryData.street[0].includes(' ') || deliveryData.street.endsWith(' ')) {
    errors.street = 'Street name must not contain any leading or trailing white space.';
  } else if (deliveryData.street.length > 200) {
    errors.street = 'No more than 200 characters allowed.';
  } else if (/^.*[ ]{2}.*$/.test(deliveryData.street.trim())) {
    errors.street = 'Street name may not have multiple spaces in a row.';
  }

  //  Validaiton for delivery street
  if (/[  ]$/.test(deliveryData.street2)) {
    errors.street2 = 'Street name may not have multiple spaces in a row.';
  } else if (deliveryData.street2 && (deliveryData.street2[0].includes(' ') || deliveryData.street2.endsWith(' '))) {
    errors.street2 = 'Street name must not contain any leading or trailing white space.';
  } else if (deliveryData.street2.length > 200) {
    errors.street2 = 'No more than 200 characters allowed.';
  } else if (/^.*[ ]{2}.*$/.test(deliveryData.street2.trim())) {
    errors.street2 = 'Street name may not have multiple spaces in a row.';
  }
  //  Validatuion for delivery city
  if (!deliveryData.city.trim()) {
    errors.city = 'This field is required.';
  } else if (deliveryData.city.length < 3) {
    errors.city = 'city name must have at least three characters';
  } else if (!/^[A-Za-z'!@#$%^.,`~":;\]&-\\()+={}0-9\s]+$/.test(deliveryData.city.trim())) {
    errors.city = 'Dashes ( - ) and apostrophes ( \' ) are the only special characters allowed.';
  } else if (deliveryData.city[0].includes(' ') || deliveryData.city.endsWith(' ')) {
    errors.city = 'City name must not contain any leading or trailing white space.';
  } else if (/^.*[ ]{2}.*$/.test(deliveryData.city.trim())) {
    errors.city = 'City name may not have multiple spaces in a row.';
  }

  //  Validation for delivery state
  if (deliveryData.state === undefined || deliveryData.state === 'Select state') {
    errors.state = 'Please select a state.';
  }

  //  Validation for delivery zip first box
  if (!deliveryData.zip.trim()) {
    errors.zip = 'This field is required.';
  } else if (!/(^\d{5}$)/.test(deliveryData.zip)) {
    errors.zip = 'Zipcode must be either five or nine digits.';
  }

  //  Validation for delivery zip second box
  if (/[  ]$/.test(deliveryData.zip2)) {
    errors.zip2 = 'Zipcode may not have multiple spaces in a row.';
  } else if (deliveryData.zip2.trim() && !/(^\d{4}$)/.test(deliveryData.zip2)) {
    errors.zip2 = 'Zipcode must be either five or nine digits.';
  }
  if (!checked) {
    //  Validation for billing state
    if (billingData.billingState === undefined || billingData.billingState === 'Select state') {
      errors.billingState = 'Please select a state.';
    }
    //  Validation for billing street
    if (!billingData.billingStreet.trim()) {
      errors.billingStreet = 'This field is required.';
    } else if (billingData.billingStreet[0].includes(' ') || billingData.billingStreet.endsWith(' ')) {
      errors.billingStreet = 'Street name must not contain any leading or trailing white space.';
    } else if (billingData.billingStreet.length > 200) {
      errors.billingStreet = 'No more than 200 characters allowed.';
    } else if (/^.*[ ]{2}.*$/.test(billingData.billingStreet.trim())) {
      errors.billingStreet = 'Street name may not have multiple spaces in a row.';
    }
    //  Validation for billing street2
    if (/[  ]$/.test(billingData.billingStreet2)) {
      errors.billingStreet2 = 'Street name may not have multiple spaces in a row.';
    } else if (billingData.billingStreet2 && (billingData.billingStreet2[0].includes(' ') || billingData.billingStreet2.endsWith(' '))) {
      errors.billingStreet2 = 'Street name must not contain any leading or trailing white space.';
    } else if (billingData.billingStreet2.length > 200) {
      errors.billingStreet2 = 'No more than 200 characters allowed.';
    } else if (/^.*[ ]{2}.*$/.test(billingData.billingStreet2.trim())) {
      errors.billingStreet2 = 'Street name may not have multiple spaces in a row.';
    }

    //  Validation for billing city
    if (!billingData.billingCity.trim()) {
      errors.billingCity = 'This field is required.';
    } else if (billingData.billingCity.length < 3) {
      errors.billingCity = 'city name must have at least three characters';
    } else if (!/^[A-Za-z'!@#$%^.,`~":;\]&-\\()+={}0-9\s]+$/.test(billingData.billingCity.trim())) {
      errors.billingCity = 'Dashes ( - ) and apostrophes ( \' ) are the only special characters allowed.';
    } else if (billingData.billingCity[0].includes(' ') || billingData.billingCity.endsWith(' ')) {
      errors.billingCity = 'City name must not contain any leading or trailing white space.';
    } else if (/^.*[ ]{2}.*$/.test(billingData.billingCity.trim())) {
      errors.billingCity = 'City name may not have multiple spaces in a row.';
    }

    //  Validation for billing zip
    if (!billingData.billingZip.trim()) {
      errors.billingZip = 'This field is required.';
    } else if (!/(^\d{5}$)/.test(billingData.billingZip)) {
      errors.billingZip = 'Zipcode must be either five or nine digits.';
    }

    //  Validation for billing zip second box
    if (/[  ]$/.test(billingData.billingZip2)) {
      errors.billingZip2 = 'Zipcode may not have multiple spaces in a row.';
    } else if (billingData.billingZip2.trim() && !/(^\d{4}$)/.test(billingData.billingZip2)) {
      errors.billingZip2 = 'Zipcode must be either five or nine digits.';
    }
  }
  //  Validation for email
  if (!billingData.email.trim()) {
    errors.email = 'This field is required.';
  } else if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+\.[A-Za-z]{2,4}$/.test(billingData.email.trim())) {
    errors.email = 'Email must follow format: username@domain.com.';
  }

  //  Validation for phone
  if (!billingData.phoneA.trim() || !billingData.phoneB.trim() || !billingData.phoneC.trim()) {
    errors.phoneA = 'This field is required.';
  } else if (!/(^\d{3}$)/.test(billingData.phoneA) || (!/(^\d{3}$)/.test(billingData.phoneB)) || (!/(^\d{4}$)/.test(billingData.phoneC))) {
    errors.phoneA = 'Phone number must contain only 10 consecutive digits.';
  }

  //  Validaiton for credit card number
  if (!billingData.creditCard.trim()) {
    errors.creditCard = 'This field is required.';
  } else if (!/(^\d{16}$)/.test(billingData.creditCard.trim())) {
    errors.creditCard = 'Card number must be a valid Visa or Mastercard number.';
  }

  //  Validation for cvv
  if (!billingData.cvv.trim()) {
    errors.cvv = 'This field is required.';
  } else if (!/^[0-9]{3}$/.test(billingData.cvv.trim())) {
    errors.cvv = 'CVV must be three consecutive digits';
  }

  //  Validaiton for expiry year
  if (billingData.expirationY === undefined || billingData.expirationY === 'YY') {
    errors.expirationY = 'Please select a Year.';
  }

  //  Validation for expirty month
  if (billingData.expirationM === undefined || billingData.expirationM === 'MM') {
    errors.expirationM = 'Please select a Month.';
  } else if ((billingData.expirationM < moment(new Date()).format('MM') && billingData.expirationY === moment(new Date()).format('YY')) && (billingData.expirationY !== undefined || billingData.expirationY !== 'MM')) {
    errors.expirationM = 'Card is expired.';
  }

  //  Validation for cardholer name
  if (!billingData.cardholder.trim()) {
    errors.cardholder = 'This field is required.';
  } else if (!/^[A-Za-z.'-\s]+$/.test(billingData.cardholder.trim())) {
    errors.cardholder = 'Dashes ( - ) dots ( . ) and apostrophes ( \' ) are the only special characters allowed.';
  } else if (billingData.cardholder[0].includes(' ') || billingData.cardholder.endsWith(' ')) {
    errors.cardholder = 'Cardholder name must not contain any leading or trailing white space.';
  } else if (/^.*[ ]{2}.*$/.test(billingData.cardholder.trim())) {
    errors.cardholder = 'Cardholder name may not have multiple spaces in a row.';
  } else {
    const nameArray = billingData.cardholder.trim().split(' ');

    if (nameArray.length !== 2 && nameArray.length !== 3) {
      errors.cardholder = 'Cardholder name be First M Last or First Last';
    }
  }
  return errors;
};

export default validate;
