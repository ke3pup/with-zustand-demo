import { useLayoutEffect } from 'react';
import { createTrackedSelector } from 'react-tracked';
import create, { UseStore } from 'zustand';
import createContext from 'zustand/context';

let store;
const zustandContext = createContext();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const createStore = () =>
  create((set, get) => ({
    loading: true,
    email: '',

    setEmail: (email) => {
      localStorage.setItem('user-has-session', true);
      set({ email });
    },
    setLoading: (loading) => set({ loading }),

    // A dummy function
    checkUserSession: async () => {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('user-has-session')) {
          setTimeout(() => {
            set({
              email: 'bla@bla.com',
              loading: false,
            });

            resolve(true);
          }, 1000);
        } else {
          set({
            loading: false,
          });

          resolve(true);
        }
      });
    },
  }));

export const UseHydrate = (initialState) => {
  const _store = store ?? createTrackedSelector(createStore());

  // For SSR & SSG, always use a new store.
  if (typeof window !== 'undefined') {
    // For CSR, always re-use same store.
    if (!store) {
      store = _store;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (initialState && store !== null) {
        store.setState({
          ...store.getState(),
          ...initialState,
        });
      }
    }, [initialState]);
  }

  return _store;
};
