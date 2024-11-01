'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"

interface Lead {
  id: string
  leadName: string
  leadForwardedDate: string
  formSubmissionEmailContent: string
  producerLeadForwardedTo: string
  producerWhoAcceptedLead: string
  contactEmail: string
  hubspotDealId: string
  daysSinceLeadForwarded: number
  status: string
  latestFollowUpNotes: string
  leadAcceptedDate: string
  businessLeadAirtableRecordId: string
  rejectedLeadProducer: string
  producerAirtableRecordId: string
  typeFormSubmissionId: string
  leadCategory: string
  customerEmailAddress: string
  producerFollowUpStatus: string
  oneTimeCheck: boolean
}

export default function LeadDetails({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<Lead | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`/api/leads/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch lead')
        }
        const data = await response.json()
        setLead(data)
      } catch (error) {
        console.error('Error fetching lead:', error)
        router.push('/dashboard')
      }
    }

    fetchLead()
  }, [params.id, router])

  const handleStatusChange = (newStatus: string) => {
    if (lead) {
      setLead({ ...lead, status: newStatus })
    }
  }

  const handleSave = async () => {
    if (!lead) return
    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
      if (!response.ok) {
        throw new Error('Failed to update lead')
      }
      alert('Lead updated successfully!')
    } catch (error) {
      console.error('Error updating lead:', error)
      alert('Failed to update lead')
    }
  }

  if (!lead) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <h1 className="text-3xl font-bold">{lead.leadName}</h1>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadCategory">Lead Category</Label>
                  <Input
                    id="leadCategory"
                    value={lead.leadCategory}
                    onChange={(e) => setLead({ ...lead, leadCategory: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmailAddress">Customer Email</Label>
                  <Input
                    id="customerEmailAddress"
                    value={lead.customerEmailAddress}
                    onChange={(e) => setLead({ ...lead, customerEmailAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="producerLeadForwardedTo">Producer Forwarded To</Label>
                  <Input
                    id="producerLeadForwardedTo"
                    value={lead.producerLeadForwardedTo}
                    onChange={(e) => setLead({ ...lead, producerLeadForwardedTo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="producerWhoAcceptedLead">Producer Who Accepted</Label>
                  <Input
                    id="producerWhoAcceptedLead"
                    value={lead.producerWhoAcceptedLead}
                    onChange={(e) => setLead({ ...lead, producerWhoAcceptedLead: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={handleStatusChange} defaultValue={lead.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="producerFollowUpStatus">Follow Up Status</Label>
                  <Input
                    id="producerFollowUpStatus"
                    value={lead.producerFollowUpStatus}
                    onChange={(e) => setLead({ ...lead, producerFollowUpStatus: e.target.value })}
                  />
                
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={lead.latestFollowUpNotes}
                onChange={(e) => setLead({ ...lead, latestFollowUpNotes: e.target.value })}
                rows={10}
                placeholder="Add follow-up notes about this lead..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
