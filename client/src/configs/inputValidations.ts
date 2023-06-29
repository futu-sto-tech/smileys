export const nameInputValidation = {
  required: { value: true, message: 'Name cannot be empty' },
  minLength: { value: 1, message: 'Name must be at least 4 characters' },
  maxLength: { value: 20, message: 'Name cannot be longer than 18 characters' },
}
