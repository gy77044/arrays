export const validAlphaNumeric =  new RegExp(/^[a-zA-Z0-9_]*$/);
export const validEmail= new RegExp(/^([\w-!#$%&\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
export const validationEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
export const validMobile = /^[6-9]\d{9}$/;
export const specialChars = /[@]/;
export const trueSet = /^true$/i;

export const isTrueSet = (value:string) =>trueSet.test(value);
export function isNumberValidate<T extends HTMLInputElement>(event: React.KeyboardEvent<T>,min?: number | string,max?: number | string): void {
    const eTarget = event.target as HTMLInputElement,text = eTarget.value,charCode = event.which;
    if ((Number(text) <= Number(min)) && (charCode !== 46 || text.includes('.')) && (charCode < 48 || charCode > 57) && (charCode !== 0 && charCode !== 8)) {
      event.preventDefault();
    };
    //handle negative value
    if (eTarget.className.includes('positiveInt') && charCode === 45) {
      event.preventDefault();
    }
    // Limit to two decimal places if class contains 'twoDecimal'
    if (eTarget.className.includes('twoDecimal')) {
      if (text.includes('.') && text.substring(text.indexOf('.')).length > 2 && (charCode !== 0 && charCode !== 8)) {
        event.preventDefault();
      };
    };
    // Limit to three decimal places if class contains 'threeDecimal'
    if (eTarget.className.includes('threeDecimal')) {
      if (text.includes('.') && text.substring(text.indexOf('.')).length > 3 && (charCode !== 0 && charCode !== 8)) {
        event.preventDefault();
      };
    };
  };
