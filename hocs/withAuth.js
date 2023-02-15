import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

export const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Or render a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};
