export const addUser = ({ userId, email, name, confirmed }) => ({
  type: 'ADD_USER',
  userId,
  email,
  name,
  confirmed,
});

export const test = (x) => x;
