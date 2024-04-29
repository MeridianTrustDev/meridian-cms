import { CollectionConfig } from 'payload/types'
import { superAdmins } from '../../access/superAdmins'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: superAdmins,
    read: tenants,
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
      type: 'group',
      name: 'domains',
      fields: [
        {
          name: 'cmsDomain',
          label: 'CMS Domain',
          type: 'text',
          index: true,
          required: true,
        },
        {
          name: 'frontendDomain',
          type: 'text',
          index: true,
          required: true,
        },
      ],
    },
  ],
}
