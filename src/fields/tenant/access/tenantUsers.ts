import type { FieldAccess } from 'payload'

import { checkUserRoles } from '../../../utilities/checkUserRoles'
import { User } from '@/payload-types'

export const tenantUserFieldAccess: FieldAccess = ({ req: { user }, doc }) => {
  return (
    checkUserRoles(['super-admin'], user as User) ||
    !doc?.tenant ||
    (doc?.tenant &&
      user?.tenants?.some(
        ({ tenant: userTenant, roles }: any) =>
          (typeof doc?.tenant === 'string' ? doc?.tenant : doc?.tenant.id) === userTenant?.id &&
          roles?.includes('admin'),
      ))
  )
}
