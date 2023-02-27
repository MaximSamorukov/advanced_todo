import * as Validator from 'validatorjs';

export const validate = (object, rules) => {

   const validation = new Validator(object, rules);
   return validation.passes();
}

export const getCurrentTodoTypes = (items) => items.reduce((acc, i) => {
   if (!acc.includes(i.sphere)) {
      acc.push(i.sphere);
      return acc;
   }
   return acc;
}, []);