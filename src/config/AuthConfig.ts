export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: '10h',
  },
};
