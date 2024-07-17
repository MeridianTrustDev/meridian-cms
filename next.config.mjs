import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here

  serverExternalPackages: ['@azure/storage-blob'],
}

export default withPayload(nextConfig)
