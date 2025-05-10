import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrationSuccessPage() {
  return (
    <div className="container flex items-center justify-center py-16">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for registering as a member of Grace Community Church. Your registration has been submitted and is
            being reviewed by our team.
          </p>
          <p className="mt-4 text-muted-foreground">
            You will receive a confirmation email shortly with more information about next steps.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/connect/groups">Join a Small Group</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
