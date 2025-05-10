"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createSermon, updateSermon } from "@/app/actions/sermon-actions"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  scripture_reference: z.string().optional(),
  speaker: z.string().min(1, "Speaker is required"),
  date: z.date(),
  video_url: z.string().optional(),
  audio_url: z.string().optional(),
  image_url: z.string().optional(),
  series: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

interface Speaker {
  id: string
  name: string
}

interface Series {
  id: string
  title: string
}

interface Topic {
  id: string
  name: string
}

interface SermonFormProps {
  sermon: any | null
  speakers: Speaker[]
  series: Series[]
  topics: Topic[]
}

export function SermonForm({ sermon, speakers, series, topics }: SermonFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<FormValues> = sermon
    ? {
        title: sermon.title,
        slug: sermon.slug,
        description: sermon.description,
        content: sermon.content,
        scripture_reference: sermon.scripture_reference,
        date: new Date(sermon.date),
        speaker: sermon.speaker,
        series: sermon.series || "",
        video_url: sermon.video_url || "",
        audio_url: sermon.audio_url || "",
        image_url: sermon.image_url || "",
        tags: sermon.tags || [],
      }
    : {
        title: "",
        slug: "",
        description: "",
        content: "",
        scripture_reference: "",
        date: new Date(),
        speaker: "",
        series: "",
        video_url: "",
        audio_url: "",
        image_url: "",
        tags: [],
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      // Convert date to ISO string
      const dateString = values.date.toISOString().split("T")[0]

      // Add all form values to FormData
      formData.append("title", values.title)
      formData.append("slug", values.slug)
      formData.append("description", values.description)
      formData.append("content", values.content || "")
      formData.append("scripture_reference", values.scripture_reference || "")
      formData.append("speaker", values.speaker)
      formData.append("date", dateString)
      formData.append("video_url", values.video_url || "")
      formData.append("audio_url", values.audio_url || "")
      formData.append("image_url", values.image_url || "")
      formData.append("series", values.series || "")

      // Handle tags array
      if (values.tags && values.tags.length > 0) {
        formData.append("tags", values.tags.join(","))
      } else {
        formData.append("tags", "")
      }

      let result

      if (sermon) {
        // Update existing sermon
        result = await updateSermon(sermon.id, formData)
      } else {
        // Create new sermon
        result = await createSermon(formData)
      }

      if (result.success) {
        router.push("/admin/sermons")
        router.refresh()
      } else {
        console.error("Error:", result.error)
        // Show error message to user
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Sermon title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="sermon-slug" {...field} />
                        </FormControl>
                        <FormDescription>URL-friendly version of the title</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="speaker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaker</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a speaker" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {speakers.map((speaker) => (
                              <SelectItem key={speaker.id} value={speaker.id}>
                                {speaker.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="series"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Series</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a series (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {series.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scripture_reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scripture Reference</FormLabel>
                        <FormControl>
                          <Input placeholder="John 3:16" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the sermon"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/video" {...field} />
                        </FormControl>
                        <FormDescription>URL to the video file or streaming service</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="audio_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audio URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/audio.mp3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Full sermon content or notes" className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormDescription>HTML is supported for formatting</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/sermons")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sermon ? "Update Sermon" : "Create Sermon"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
