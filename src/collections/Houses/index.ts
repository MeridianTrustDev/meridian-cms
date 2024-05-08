import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { tenants } from './access/tenants'

export const Houses: CollectionConfig = {
  slug: 'houses',
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
      label: 'House Name',
      type: 'text',
      required: true,
    },
    {
      name: 'points',
      label: 'House Points',
      type: 'number',
    },
    {
      name: 'houseColour',
      label: 'House Colour (HEX)',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    tenant,
  ],
}
