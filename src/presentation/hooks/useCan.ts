// contexts
import { useAuth } from '@/presentation/contexts/authContext';

// utils
import { validateUserPermissions } from '@/presentation/common/utils/auth';

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuth();

  // user not authenticated
  if (!isAuthenticated) {
    return false;
  }

  // user need to have permission or role
  if (permissions?.length || roles?.length) {
    return validateUserPermissions({
      user,
      permissions,
      roles,
    });
  }

  // user authenticated and has no permissions or roles
  if (isAuthenticated) {
    return true;
  }

  return false;
}

export { useCan };
