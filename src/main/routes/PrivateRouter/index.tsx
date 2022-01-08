/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

// routes
import { useNavigate } from '@/main/routes';

// hooks
import { useCan } from '@/presentation/hooks/useCan';

type PrivateRouterProps = {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
};

function PrivateRouter({ roles, permissions, children }: PrivateRouterProps) {
  const navigate = useNavigate();

  const userHasPermission = useCan({
    permissions,
    roles,
  });

  if (!userHasPermission) {
    navigate({ to: '/' });
  }

  return <>{children}</>;
}

export { PrivateRouter };
