import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_OPTIONS } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const OPTIONS = REST_OPTIONS(config)
