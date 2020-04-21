import React, { useState, useContext } from 'react';

const initialState = {
  toast: {
    show: false, message: '', type: 'info',
  },
  user: {},
  loader: false,
};
const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const store = {
    state,
    showToast: (message, type) => {
      state.toast.show = true;
      state.toast.message = message;
      state.toast.type = type;
      setState({ ...state });
    },
    addUser: (userId, email, name, confirmed) => {
      state.user = {
        userId, email, name, confirmed,
      };
      setState({ ...state });
    },
    showLoader: (show) => {
      state.loader = show;
      setState({ ...state });
    },
    closeToast: () => {
      state.toast.show = false;
      setState({ ...state });
    },
  };


  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export const useToast = () => useAppContext().showToast;
export const useUser = () => useAppContext().addUser;
export const useLoader = () => useAppContext().showLoader;
export const ToastConstants = { SUCCESS: 'success', ERROR: 'error' };
export default AppContext;
