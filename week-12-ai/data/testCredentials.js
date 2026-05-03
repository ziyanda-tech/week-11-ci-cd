function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set in .env`);
  }
  return value;
}

export const credentials = {
  get validEmail() { return requireEnv('DELEK_EMAIL'); },
  get validPassword() { return requireEnv('DELEK_PASSWORD'); },
  registrationPassword: process.env.DELEK_REG_PASSWORD ?? 'StrongPass1!',
  nonExistentEmail: 'nonexistent_user_xyz@fakeemail.com',
  wrongPassword: 'WrongPassword999!',
  weakPassword: '123',
  malformedEmail: 'not-an-email',
};
