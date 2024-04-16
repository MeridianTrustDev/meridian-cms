import { CollectionConfig } from 'payload/types'
import { superAdmins } from '../../access/superAdmins'
import { tenantAdmins } from './access/tenantAdmins'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: superAdmins,
    read: tenantAdmins,
    update: tenantAdmins,
    delete: superAdmins,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      index: true,
    },
  ],
}
