import { User } from '@/payload-types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'
import type { Access } from 'payload'

// @ts-expect-error i hate this
export const adminsAndSelf: Access = ({ req: { user } }) => {
  if (user) {
    const isSuper = isSuperAdmin(user)

    // allow super-admins through only if they have not scoped their user via `lastLoggedInTenant`
    if (isSuper) {
      return true
    }

    // allow users to read themselves and any users within the tenants they are admins of
    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },

        {
          'tenants.tenant': {
            in:
              user?.tenants
                ?.map(
                  ({
                    tenant,
                    roles,
                  }: {
                    tenant: NonNullable<User['tenants']>[0]['tenant']
                    roles: NonNullable<User['tenants']>[0]['roles']
                  }) =>
                    roles.includes('admin')
                      ? typeof tenant === 'string'
                        ? tenant
                        : tenant.id
                      : null,
                )
                .filter(Boolean) || [],
          },
        },
      ],
    }
  }
}
