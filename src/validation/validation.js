export function checkName(name) {
  const isValidName = /^[a-zA-Z\s-]+$/;
  const minLength = 2;
  const maxLength = 30;

  if (name.length < minLength || name.length > maxLength) {
    return name == '' ? '' : `Name must be between ${minLength} and ${maxLength} characters long.`;
  } else if (!isValidName.test(name) && name !== '') {
    return 'Name must contain only letters, spaces, and hyphens.';
  } else {
    return '';
  }
}
