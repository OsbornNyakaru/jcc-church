import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Registration Complete!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Thank you for registering as a member of Grace Community Church. Your registration has been received and is
            being processed.
          </p>
          <p className="text-sm text-muted-foreground">
            A member of our pastoral team will contact you soon to welcome you to our church family.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild>
            <Link href="/connect">Explore Ways to Connect</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
