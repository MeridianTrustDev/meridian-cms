import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { tenants } from './access/tenants'
import { revalidate } from './hooks/revalidate'

export const Headers: CollectionConfig = {
  slug: 'headers',
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
      name: 'secondaryNavigation',
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
    tenant,
  ],
}
