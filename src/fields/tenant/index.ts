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
  access: {
    create: tenantUserFieldAccess,
    read: () => true,
    update: tenantUserFieldAccess,
  },
}
