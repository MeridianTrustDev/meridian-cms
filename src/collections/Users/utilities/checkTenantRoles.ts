import type { User } from '@/payload-types'

export const checkTenantRoles = (
  allRoles: NonNullable<User['tenants']>[0]['roles'] = [],
  user: User | undefined = undefined,
  tenant: NonNullable<User['tenants']>[0]['tenant'] | undefined = undefined,
): boolean => {
  if (tenant) {
    const id = typeof tenant === 'string' ? tenant : tenant?.id

    if (
      allRoles.some((role) => {
        return user?.tenants?.some(({ tenant: userTenant, roles }) => {
          const tenantId = typeof userTenant === 'string' ? userTenant : userTenant?.id
          return tenantId === id && roles?.includes(role)
        })
      })
    )
      return true
  }
  return false
}
