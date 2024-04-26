import type { Access } from 'payload/types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

export const tenants: Access = ({ req: { user, host }, data }) => {
  if (user) {
    return (
      // individual documents
      (data?.id && user.tenants.includes(data.id)) ||
      isSuperAdmin(user) || {
        // list of documents
        id: isSuperAdmin(user)
          ? {
              exists: true,
            }
          : {
              in: user?.tenants?.map(
                ({
                  tenant,
                }: {
                  tenant: {
                    id: string
                  }
                }) => tenant.id,
              ),
            },
      }
    )
  }

  // // If user is not logged in, only show documents that belong to the tenant that matches the current domain
  return (
    (data?.id && data.domain === host) || {
      // list of documents
      domain: {
        equals: host,
      },
    }
  )
}
