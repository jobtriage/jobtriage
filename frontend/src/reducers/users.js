const users = (state = {}, action) => {
  if (action.type === 'ADD_USER') {
    return {
      ...state,
      userId: action.userId,
      email: action.email,
    };
  }

  return state;
};

export default users;
