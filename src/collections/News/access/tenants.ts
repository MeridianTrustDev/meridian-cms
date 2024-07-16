import type { Access } from 'payload'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

export const tenants: Access = ({ req, data }) => {
  // If user is logged in, only show documents that belong to the tenants they have access to
  if (req.user) {
    return (
      // individual documents
      (data?.tenant?.id && req.user.tenants?.includes(data.tenant.id)) ||
      isSuperAdmin(req.user) || {
        // list of documents
        tenant: isSuperAdmin(req.user)
          ? {
              exists: true,
            }
          : {
              in: req.user?.tenants?.map(({ tenant }: any) => tenant.id),
            },
      }
    )
  }

  // If user is not logged in, only show documents that belong to the tenant that matches the current domain
  return (
    (data?.tenant?.domains.cmsDomain && data.tenant.domains.cmsDomain === req.host) || {
      // list of documents
      'tenant.domains.cmsDomain': {
        equals: req.host,
      },
    }
  )
}
