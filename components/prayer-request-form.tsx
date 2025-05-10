"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitPrayerRequest } from "@/app/actions/prayer-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  requestText: z.string().min(10, { message: "Prayer request must be at least 10 characters." }),
  isPrivate: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface PrayerRequestFormProps {
  userId?: string
}

export function PrayerRequestForm({ userId }: PrayerRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      requestText: "",
      isPrivate: false,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      await submitPrayerRequest({
        userId,
        name: data.name,
        email: data.email,
        requestText: data.requestText,
        isPrivate: data.isPrivate,
      })

      toast({
        title: "Prayer Request Submitted",
        description: "Your prayer request has been submitted successfully.",
      })

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your prayer request.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prayer Request Submitted</CardTitle>
          <CardDescription>Thank you for sharing your prayer request with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Our prayer team will be praying for your request.</p>
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Prayer Request</CardTitle>
        <CardDescription>Share your prayer needs with our church family.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prayer Request</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your prayer request here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Keep this request private</FormLabel>
                    <FormDescription>
                      Private requests are only shared with the pastoral staff and prayer team.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
