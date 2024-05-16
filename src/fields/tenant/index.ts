import type { Field } from 'payload/types'
import { isSuperAdmin } from '../../utilities/isSuperAdmin'
import { superAdminFieldAccess } from '../../access/superAdmins'
import { tenantUserFieldAccess } from './access/tenantUsers'

export const tenant: Field = {
  name: 'tenant',
  type: 'relationship',
  relationTo: 'tenants',
  index: true,
  admin: {
    position: 'sidebar',
  },
  required: true,
  hooks: {
    beforeChange: [
      ({ req: { user }, value }) => {
        console.log(user?.tenants)

        if (user?.tenants?.length === 1) {
          return typeof user?.tenants[0]?.tenant === 'string'
            ? user?.tenants[0]?.tenant
            : user?.tenants[0]?.tenant?.id
        }
      },
    ],
  },
  access: {
    create: tenantUserFieldAccess,
    read: () => true,
    update: tenantUserFieldAccess,
  },
}
