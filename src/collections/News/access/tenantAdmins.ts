import type { Access } from 'payload'
import { checkUserRoles } from '../../../utilities/checkUserRoles'
import { User } from '@/payload-types'

export const tenantAdmins: Access = ({ req: { user } }) => {
  if (checkUserRoles(['super-admin'], user as User)) {
    return true
  }

  return {
    tenant: {
      in:
        user?.tenants
          ?.map(
            ({
              tenant,
              roles,
            }: {
              tenant: NonNullable<User['tenants']>[0]['tenant']
              roles: NonNullable<User['tenants']>[0]['roles']
            }) =>
              roles.includes('admin') ? (typeof tenant === 'string' ? tenant : tenant.id) : null,
          )
          .filter(Boolean) || [],
    },
  }
}
