import type { Access } from 'payload/types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

export const tenants: Access = ({ req, data }) => {
  if (req.user) {
    return (
      // individual documents
      (data?.tenant?.id && req.user?.lastLoggedInTenant?.id === data.tenant.id) ||
      (!req.user?.lastLoggedInTenant?.id && isSuperAdmin(req.user)) || {
        // list of documents
        tenant: !isSuperAdmin(req.user)
          ? {
              exists: true,
            }
          : {
              in: req.user?.tenants?.map(
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

  return (
    (data?.tenant?.id && data.tenant.domains.includes(req.host)) || {
      // list of documents
      'tenant.domain': {
        equals: req.host,
      },
    }
  )
}
