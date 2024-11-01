/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRTABLE_PERSONAL_ACCESS_TOKEN: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_ID: process.env.AIRTABLE_TABLE_ID,
  },
}

module.exports = nextConfig
