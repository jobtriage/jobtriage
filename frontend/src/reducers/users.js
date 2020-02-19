const users = (state = {}, action) => {
  if (action.type === 'ADD_USER') {
    return {
      ...state,
      userId: action.userId,
      email: action.email,
      name: action.name,
    };
  }

  return state;
};

export default users;
