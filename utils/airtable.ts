interface AirtableConfig {
  personalAccessToken: string
  baseId: string
  tableId: string
}

export async function getAirtableConfig(): Promise<AirtableConfig> {
  return {
    personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || '',
    baseId: process.env.AIRTABLE_BASE_ID || '',
    tableId: process.env.AIRTABLE_TABLE_ID || '',
  }
}

export async function fetchFromAirtable(endpoint: string, options: RequestInit = {}) {
  const config = await getAirtableConfig()
  
  const response = await fetch(`https://api.airtable.com/v0/${config.baseId}/${config.tableId}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.personalAccessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.statusText}`)
  }

  return response.json()
}
