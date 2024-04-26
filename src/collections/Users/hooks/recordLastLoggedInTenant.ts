import { CollectionAfterLoginHook } from 'payload/types'

export const recordLastLoggedInTenant: CollectionAfterLoginHook = async ({ req, user }) => {
  try {
    const relatedOrg = await req.payload
      .find({
        collection: 'tenants',
        where: {
          domain: {
            equals: req.host,
          },
        },
        depth: 0,
        limit: 1,
      })
      ?.then((res) => res.docs?.[0])

    await req.payload.update({
      id: user.id,
      collection: 'users',
      data: {
        lastLoggedInTenant: relatedOrg?.id || null,
      },
      req,
    })
  } catch (error) {
    req.payload.logger.error(`Error recording last logged in tenant for user ${user.id}: ${error}`)
  }
}
