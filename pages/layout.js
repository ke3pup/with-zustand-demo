import { useStore } from './store';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

export default function Layout({ children }) {
  const { loading, email, setEmail, setLoading, checkUserSession } = useStore();
  const router = useRouter();

  useEffect(() => {
    // check user has session on app start
    const session = async () => await checkUserSession();
    session();
  }, [checkUserSession]);

  useEffect(() => {
    // If path isn't /login and user has no email then redirect to /login
    if (router.pathname !== '/login' && !loading && !email) {
      router.replace({
        pathname: '/login',
      });

      // redirect to home if user is already "logged in"
    } else if (email && router.pathname === '/login') {
      router.replace({
        pathname: '/',
      });
    }
  }, [router, loading, email]);

  return (
    <div className="flex flex-col items-center h-full">
      <div id="mainSection" className="flex-1 px-8 max-w-7xl">
        <React.Fragment>{children}</React.Fragment>
      </div>
    </div>
  );
}
