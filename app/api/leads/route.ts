import { NextResponse } from 'next/server'
import { fetchFromAirtable } from '@/utils/airtable'

export async function GET() {
  try {
    const response = await fetchFromAirtable('')
    const records = response.records.map((record: any) => ({
      id: record.id,
      leadName: record.fields['Lead Name'],
      leadForwardedDate: record.fields['Lead Forwarded Date'],
      formSubmissionEmailContent: record.fields['Form Submission Email Content'],
      producerLeadForwardedTo: record.fields['Producer - Lead Forwarded To'],
      producerWhoAcceptedLead: record.fields['Name - Producer Who Accepted The Lead'],
      contactEmail: record.fields['Contact Email (from Producer)'],
      hubspotDealId: record.fields['Hubspot Deal ID'],
      daysSinceLeadForwarded: record.fields['Days Since Lead Forwarded'],
      status: record.fields['Status'],
      latestFollowUpNotes: record.fields['Latest Follow Up Notes From Producer'],
      leadAcceptedDate: record.fields['Lead Accepted Date'],
      businessLeadAirtableRecordId: record.fields['Business Lead Airtable - Record ID'],
      rejectedLeadProducer: record.fields['Rejected Lead - Producer'],
      producerAirtableRecordId: record.fields['Producer Airtable Record ID (from Producer Who Rejected The Lead) (from Rejected Business Leads)'],
      typeFormSubmissionId: record.fields['TypeForm Submission ID'],
      leadCategory: record.fields['Lead Category'],
      customerEmailAddress: record.fields['Customer Email Address'],
      producerFollowUpStatus: record.fields['Producer Follow Up Status'],
      oneTimeCheck: record.fields['One Time Check'],
    }))

    return NextResponse.json(records)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
