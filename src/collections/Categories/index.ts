import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { tenants } from './access/tenants'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  admin: {
    defaultColumns: ['name', 'tenant'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text',
      required: true,
    },
    tenant,
  ],
}
