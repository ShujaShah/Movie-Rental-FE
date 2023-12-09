export const registerInitialState = {
  email: '',
  password: '',
  name: '',
};

export const SignupReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'RESET':
      return registerInitialState;
    default:
      return state;
  }
};
