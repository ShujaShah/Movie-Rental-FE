import useUpdateUser from '../../hooks/useUpdateUser';

export const updateInitialState = async () => {
  const { initialUser } = await useUpdateUser();
  if (!initialUser) return;
  console.log('here is the initial user', initialUser);
  const showData = {
    email: initialUser?.profile?.email || '',
    name: initialUser?.profile?.name || '',
    phone: initialUser?.profile?.phone || '',
  };
  console.log('here is the show:', showData);
  return showData;
};

export const UpdateUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
