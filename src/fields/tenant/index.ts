import type { Field } from 'payload/types'
import { isSuperAdmin } from '../../utilities/isSuperAdmin'
import { superAdminFieldAccess } from '../../access/superAdmins'

export const tenant: Field = {
  name: 'tenant',
  type: 'relationship',
  relationTo: 'tenants',
  index: true,
  admin: {
    position: 'sidebar',
  },
  access: {
    create: superAdminFieldAccess,
    read: () => true,
    update: superAdminFieldAccess,
  },
}
