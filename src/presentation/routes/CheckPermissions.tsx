import * as React from 'react';

// routes
import { useNavigate } from '@/presentation/routes';

// contexts
import { useAuth } from '@/presentation/contexts/authContext';

type CheckPermissionsProps = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

function CheckPermissions({
  children,
  isPrivate = false,
}: CheckPermissionsProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // private
  if (isPrivate) {
    if (!isAuthenticated) {
      navigate({ to: '/' });
    }

    return <>{children}</>;
  }

  // public
  if (!isPrivate) {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }

    return <>{children}</>;
  }
}

export { CheckPermissions };
