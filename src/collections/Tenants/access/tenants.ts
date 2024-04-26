import type { Access } from 'payload/types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'

<<<<<<< HEAD
export const tenants: Access = ({ req, data }) => {
  return true
=======
export const tenants: Access = ({ req: { user }, data }) => {
  console.log(data)
>>>>>>> parent of c4c52b8 (1)
  // If user is logged in, only show documents that belong to the tenants they have access to

  return true

  // if (req.user) {
  //   return (
  //     // individual documents
  //     (data?.id && req.user?.lastLoggedInTenant?.id === data.id) ||
  //     (!req.user?.lastLoggedInTenant?.id && isSuperAdmin(req.user)) || {
  //       // list of documents
  //       id: isSuperAdmin(req.user)
  //         ? {
  //             exists: true,
  //           }
  //         : {
  //             in: req.user?.tenants?.map(
  //               ({
  //                 tenant,
  //               }: {
  //                 tenant: {
  //                   id: string
  //                 }
  //               }) => tenant.id,
  //             ),
  //           },
  //     }
  //   )
  // }

  // // If user is not logged in, only show documents that belong to the tenant that matches the current domain
  // return (
  //   (data?.id && data.domain === req.host) || {
  //     // list of documents
  //     domain: {
  //       equals: req.host,
  //     },
  //   }
  // )
}
