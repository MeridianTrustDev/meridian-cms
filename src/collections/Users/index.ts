import { CollectionConfig, FieldHookArgs } from 'payload/types'
import { superAdminFieldAccess } from '../../access/superAdmins'
import { tenantAdmins } from './access/tenantAdmins'
import { adminsAndSelf } from './access/adminsAndSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    admin: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      access: {
        create: (args) => superAdminFieldAccess(args as FieldHookArgs),
        update: (args) => superAdminFieldAccess(args as FieldHookArgs),
        read: (args) => superAdminFieldAccess(args as FieldHookArgs),
      },
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'tenants',
      type: 'array',
      label: 'Tenants',
      access: {
        create: tenantAdmins,
        update: tenantAdmins,
        read: tenantAdmins,
      },
      fields: [
        {
          name: 'tenant',
          type: 'relationship',
          relationTo: 'tenants',
          required: true,
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ],
        },
      ],
    },
    {
      name: 'sub',
      label: 'sub',
      type: 'text',
      admin: { readOnly: true },
      access: { update: () => false },
    },
  ],
}
