import type { Access } from 'payload/config'
import type { FieldAccess } from 'payload/types'

import { checkUserRoles } from '../utilities/checkUserRoles'
import { User } from '@/payload-types'

export const superAdmins: Access = ({ req: { user } }) =>
  checkUserRoles(['super-admin'], user as User)

export const superAdminFieldAccess: FieldAccess = ({ req: { user } }) =>
  checkUserRoles(['super-admin'], user as User)
