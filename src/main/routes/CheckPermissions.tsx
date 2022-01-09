import * as React from 'react';

// routes
import { useNavigate } from '@/main/routes';

// contexts
import { useAuth } from '@/presentation/contexts/authContext';

type PrivateRouterProps = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

function CheckPermissions({ isPrivate = false, children }: PrivateRouterProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isPrivate && isAuthenticated) {
    navigate({ to: '/dashboard' });
  }

  if (isPrivate && !isAuthenticated) {
    navigate({ to: '/' });
  }

  return <>{children}</>;
}

export { CheckPermissions };
