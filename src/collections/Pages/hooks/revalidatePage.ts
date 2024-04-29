import type { CollectionAfterChangeHook } from 'payload/types'

import { revalidatePath } from '../../../utilities/revalidate'

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidatePage: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: doc.tenant,
  })

  if (!tenant) {
    throw new Error('Tenant not found')
  }

  if (doc._status === 'published') {
    revalidatePath({ path: doc.slug, payload, domain: tenant.domains.frontendDomain })
  }

  return doc
}
