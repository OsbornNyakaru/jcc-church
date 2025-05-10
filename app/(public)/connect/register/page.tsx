import type { Metadata } from "next"
import { Suspense } from "react"

import { PageHeader } from "@/components/page-header"
import { MemberRegistrationForm } from "@/components/member-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Member Registration",
  description: "Register as a member of Grace Community Church",
}

export default function MemberRegistrationPage() {
  return (
    <div className="container py-8">
      <PageHeader
        heading="Member Registration"
        subheading="Join our church family by completing the registration form below"
      />

      <div className="mx-auto mt-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out the form below to register as a member. All fields marked with an asterisk (*) are
              required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading form...</div>}>
              <MemberRegistrationForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
