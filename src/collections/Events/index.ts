import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { tenants } from './access/tenants'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  admin: {
    defaultColumns: ['title', 'start', 'end', 'tenant'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'start',
          type: 'group',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
              validate: (value: { start: string; end: string }) => {
                if (value.start > value.end) {
                  return 'End date must be after start date.'
                } else {
                  return true
                }
              },
            },
            {
              name: 'time',
              type: 'text',
              required: true,
              validate: (value: string) => {
                if (!value.match(/^(?:[01]\d|2[0-3]):[0-5]\d$/)) {
                  return 'Invalid time format. Please use HH:MM in 24-hour format.'
                } else {
                  return true
                }
              },
            },
          ],
        },
        {
          type: 'group',
          name: 'end',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
              validate: (value: { start: string; end: string }) => {
                if (value.start > value.end) {
                  return 'End date must be after start date.'
                } else {
                  return true
                }
              },
            },
            {
              name: 'time',
              type: 'text',
              required: true,
              validate: (value: string) => {
                if (!value.match(/^(?:[01]\d|2[0-3]):[0-5]\d$/)) {
                  return 'Invalid time format. Please use HH:MM in 24-hour format.'
                } else {
                  return true
                }
              },
            },
          ],
        },
      ],
    },
    tenant,
  ],
}
