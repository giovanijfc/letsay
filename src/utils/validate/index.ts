/* eslint-disable no-useless-escape */

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhoneBR = (number: string): boolean => {
  const regexCorrectPhoneBR = /\(\d{2,}\) \d{5,}\-\d{4}/g;
  return regexCorrectPhoneBR.test(String(number));
};
