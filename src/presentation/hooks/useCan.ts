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

  if (!isAuthenticated || !user) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}

export { useCan };
