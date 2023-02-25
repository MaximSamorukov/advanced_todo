import * as Validator from 'validatorjs';

export const validate = (object, rules) => {

   const validation = new Validator(object, rules);
   return validation.passes();
}