import type { Access } from 'payload'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

export const tenants: Access = ({ req: { user, host }, data }) => {
  if (user) {
    return (
      // individual documents
      (data?.id && user.tenants?.includes(data.id)) ||
      isSuperAdmin(user) || {
        // list of documents
        id: isSuperAdmin(user)
          ? {
              exists: true,
            }
          : {
              in: user?.tenants?.map(({ tenant }: any) => tenant.id),
            },
      }
    )
  }

  // // If user is not logged in, only show documents that belong to the tenant that matches the current domain
  return (
    (data?.domains && data.domains.cmsDomain === host) || {
      // list of documents
      'domains.cmsDomain': {
        equals: host,
      },
    }
  )
}
