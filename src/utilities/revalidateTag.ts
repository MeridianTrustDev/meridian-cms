import type { Payload } from 'payload'

export const revalidateTag = async (args: {
  payload: Payload
  tag: string
  domain: string
}): Promise<void> => {
  const { tag, domain, payload } = args

  try {
    const res = await fetch(
      `https://${domain}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&tag=${tag}`,
    )

    if (res.ok) {
      payload.logger.info(`Revalidated tag '${tag}'`)
    } else {
      payload.logger.error(`Error revalidating tag '${tag}': ${res}`)
    }
  } catch (err: unknown) {
    payload.logger.error(`Error hitting revalidate route for tag '${tag}': ${err}`)
  }
}
