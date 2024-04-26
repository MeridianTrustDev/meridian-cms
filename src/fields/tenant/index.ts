import type { Field } from 'payload/types'
import { isSuperAdmin } from '../../utilities/isSuperAdmin'
import { superAdminFieldAccess } from '../../access/superAdmins'

export const tenant: Field = {
  name: 'tenant',
  type: 'relationship',
  relationTo: 'tenants',
  // don't require this field because we need to auto-populate it, see below
  // required: true,
  // we also don't want to hide this field because super-admins may need to manage it
  // to achieve this, create a custom component that conditionally renders the field based on the user's role
  // hidden: true,
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
