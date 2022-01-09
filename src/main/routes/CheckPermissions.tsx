/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

// routes
import { useNavigate } from '@/main/routes';

// hooks
import { useCan } from '@/presentation/hooks/useCan';

// contexts
import { useAuth } from '@/presentation/contexts/authContext';

type PrivateRouterProps = {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
  isPrivate?: boolean;
};

function CheckPermissions({
  roles,
  permissions,
  isPrivate = false,
  children,
}: PrivateRouterProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isPrivate && isAuthenticated) {
    navigate({ to: '/dashboard' });
  }

  if (!isPrivate && !isAuthenticated) {
    return <>{children}</>;
  }

  const userHasPermission = useCan({
    permissions,
    roles,
  });

  if (!userHasPermission) {
    navigate({ to: '/' });
  }

  return <>{children}</>;
}

export { CheckPermissions };
