export const addUser = ({ userId, email, name }) => ({
  type: 'ADD_USER',
  userId,
  email,
  name,
});

export const test = (x) => x;
