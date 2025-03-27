export enum LoginError {
   none = '',
   Err401 = 'Invalid email or password',
   Err500 = 'Server error',
}

export enum ValidationError {
   none = '',
   email = 'Please enter your email',
   password = 'Please enter your password',
   passwordLength = 'Password must be at least 5 characters',
   firstName = 'Please enter your first name',
   lastName = 'Please enter your last name',
   all = 'Please enter required information',
}