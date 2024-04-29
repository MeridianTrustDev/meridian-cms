import type { Payload } from 'payload'

export const revalidatePath = async (args: {
  payload: Payload
  path: string
  domain: string
}): Promise<void> => {
  const { path, domain, payload } = args

  try {
    const res = await fetch(
      `https://${domain}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&path=${path}`,
    )

    if (res.ok) {
      payload.logger.info(`Revalidated page '${path}'`)
    } else {
      payload.logger.error(`Error revalidating page '${path}': ${res}`)
    }
  } catch (err: unknown) {
    payload.logger.error(`Error hitting revalidate route for page '${path}': ${err}`)
  }
}
