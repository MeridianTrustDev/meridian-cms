import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { tenants } from './access/tenants'
import { revalidate } from './hooks/revalidate'

export const Footers: CollectionConfig = {
  slug: 'footers',
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  hooks: {
    afterChange: [revalidate],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryNavigation',
      type: 'relationship',
      relationTo: 'navigationMenu',
      maxDepth: 5,
      filterOptions: ({ data }) => {
        return {
          tenant: {
            equals: data?.tenant,
          },
        }
      },
    },
    {
      name: 'telephone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'disclaimer',
      type: 'textarea',
    },
    tenant,
  ],
}
