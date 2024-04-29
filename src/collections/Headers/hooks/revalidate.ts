import type { CollectionAfterChangeHook } from 'payload/types'

import { revalidatePath } from '../../../utilities/revalidatePath'
import { revalidateTag } from '@/utilities/revalidateTag'

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidate: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: doc.tenant,
  })

  if (!tenant) {
    throw new Error('Tenant not found, cannot revalidate')
  }

  revalidateTag({ tag: 'navigation', payload, domain: tenant.domains.frontendDomain })

  return doc
}
