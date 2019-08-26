// @flow
import * as Yup from 'yup';

const getFieldValidation = fieldName => {
  const validationRules = {
    emailField: Yup.string()
      // .email("Please enter valid email")
      .required('Please enter email'),
    passwordField: Yup.string().required('Please enter password')
  };
  if (fieldName) {
    return validationRules[fieldName];
  } else {
    return validationRules;
  }
};

export const buildSchema = (listOfFields: Array<string>) => {
  const schema = {};
  try {
    listOfFields.forEach(fieldName => {
      schema[fieldName] = getFieldValidation(fieldName);
    });
    return Yup.object().shape(schema);
  } catch (e) {
    return schema;
  }
};

export default buildSchema;
