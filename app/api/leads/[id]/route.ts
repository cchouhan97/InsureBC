import { NextResponse } from 'next/server'
import { fetchFromAirtable } from '@/utils/airtable'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetchFromAirtable(`/${params.id}`)
    const record = response
    const lead = {
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
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedFields = {
      'Lead Name': body.leadName,
      'Lead Forwarded Date': body.leadForwardedDate,
      'Form Submission Email Content': body.formSubmissionEmailContent,
      'Producer - Lead Forwarded To': body.producerLeadForwardedTo,
      'Name - Producer Who Accepted The Lead': body.producerWhoAcceptedLead,
      'Contact Email (from Producer)': body.contactEmail,
      'Hubspot Deal ID': body.hubspotDealId,
      'Days Since Lead Forwarded': body.daysSinceLeadForwarded,
      'Status': body.status,
      'Latest Follow Up Notes From Producer': body.latestFollowUpNotes,
      'Lead Accepted Date': body.leadAcceptedDate,
      'Business Lead Airtable - Record ID': body.businessLeadAirtableRecordId,
      'Rejected Lead - Producer': body.rejectedLeadProducer,
      'Producer Airtable Record ID (from Producer Who Rejected The Lead) (from Rejected Business Leads)': body.producerAirtableRecordId,
      'TypeForm Submission ID': body.typeFormSubmissionId,
      'Lead Category': body.leadCategory,
      'Customer Email Address': body.customerEmailAddress,
      'Producer Follow Up Status': body.producerFollowUpStatus,
      'One Time Check': body.oneTimeCheck,
    }

    const response = await fetchFromAirtable(`/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ fields: updatedFields }),
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
