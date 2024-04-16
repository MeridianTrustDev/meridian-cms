import type { Access } from 'payload/types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

export const tenants: Access = ({ req: { user }, data }) => {
  if (user) {
    return (
      // individual documents
      (data?.tenant?.id && user?.lastLoggedInTenant?.id === data.tenant.id) ||
      (!user?.lastLoggedInTenant?.id && isSuperAdmin(user)) || {
        // list of documents
        tenant: {
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

  return true
}
