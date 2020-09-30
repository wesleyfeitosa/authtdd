import { createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = async () => {
  await createConnection();
};
