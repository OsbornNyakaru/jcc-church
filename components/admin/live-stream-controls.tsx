"use client"

import { useState } from "react"
import { Play, Pause, AlertCircle, Share2, Link, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LiveStreamControlsProps {
  isLive: boolean
}

export function LiveStreamControls({ isLive }: LiveStreamControlsProps) {
  const [copied, setCopied] = useState(false)
  const [streamTitle, setStreamTitle] = useState("Sunday Worship Service")
  const [streamDescription, setStreamDescription] = useState(
    "Join us for worship, prayer, and teaching from God's Word.",
  )
  const [enableChat, setEnableChat] = useState(true)
  const [enableDonations, setEnableDonations] = useState(true)
  const [enableReminders, setEnableReminders] = useState(true)
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["website"])

  const streamUrl = "https://gracecommunity.church/media/live"
  const rtmpUrl = "rtmp://live.mux.com/app"
  const streamKey = "sk_us_1a2b3c4d5e6f7g8h9i0j_k1l2m3n4o5p6"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartStream = () => {
    // In a real implementation, this would call your API to start the stream
    console.log("Starting stream...")
  }

  const handleEndStream = () => {
    // In a real implementation, this would call your API to end the stream
    console.log("Ending stream...")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Stream Information</CardTitle>
          <CardDescription>Configure your live stream details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Stream Title</Label>
            <Input
              id="title"
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              placeholder="Enter stream title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={streamDescription}
              onChange={(e) => setStreamDescription(e.target.value)}
              placeholder="Enter stream description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="speaker">Speaker</Label>
            <Select defaultValue="pastor-john">
              <SelectTrigger id="speaker">
                <SelectValue placeholder="Select speaker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pastor-john">Pastor John Smith</SelectItem>
                <SelectItem value="pastor-sarah">Pastor Sarah Johnson</SelectItem>
                <SelectItem value="pastor-michael">Pastor Michael Williams</SelectItem>
                <SelectItem value="guest">Guest Speaker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select defaultValue="sunday">
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday Service</SelectItem>
                <SelectItem value="midweek">Midweek Service</SelectItem>
                <SelectItem value="special">Special Event</SelectItem>
                <SelectItem value="youth">Youth Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => console.log("Saving stream information...")}>
            Save Information
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Stream Control</CardTitle>
            <CardDescription>Manage your live stream status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLive ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Stream is Live</AlertTitle>
                <AlertDescription>
                  Your stream is currently live and visible to viewers. End the stream when your service is complete.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Stream is Offline</AlertTitle>
                <AlertDescription>
                  Your stream is currently offline. Start the stream when you're ready to go live.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-chat">Enable Live Chat</Label>
              <Switch id="enable-chat" checked={enableChat} onCheckedChange={setEnableChat} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-donations">Show Donation Button</Label>
              <Switch id="enable-donations" checked={enableDonations} onCheckedChange={setEnableDonations} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-reminders">Allow Service Reminders</Label>
              <Switch id="enable-reminders" checked={enableReminders} onCheckedChange={setEnableReminders} />
            </div>
          </CardContent>
          <CardFooter>
            {isLive ? (
              <Button variant="destructive" className="w-full gap-2" onClick={handleEndStream}>
                <Pause className="h-4 w-4" /> End Stream
              </Button>
            ) : (
              <Button className="w-full gap-2" onClick={handleStartStream}>
                <Play className="h-4 w-4" /> Start Stream
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stream Destinations</CardTitle>
            <CardDescription>Where your stream will be broadcast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="website"
                checked={selectedDestinations.includes("website")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDestinations([...selectedDestinations, "website"])
                  } else {
                    setSelectedDestinations(selectedDestinations.filter((d) => d !== "website"))
                  }
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="website">Church Website</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="youtube"
                checked={selectedDestinations.includes("youtube")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDestinations([...selectedDestinations, "youtube"])
                  } else {
                    setSelectedDestinations(selectedDestinations.filter((d) => d !== "youtube"))
                  }
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="youtube">YouTube</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="facebook"
                checked={selectedDestinations.includes("facebook")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDestinations([...selectedDestinations, "facebook"])
                  } else {
                    setSelectedDestinations(selectedDestinations.filter((d) => d !== "facebook"))
                  }
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="facebook">Facebook</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Stream Setup</CardTitle>
          <CardDescription>Connection details for your streaming software</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rtmp">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rtmp">RTMP Settings</TabsTrigger>
              <TabsTrigger value="share">Share Stream</TabsTrigger>
            </TabsList>
            <TabsContent value="rtmp" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rtmp-url">RTMP URL</Label>
                <div className="flex">
                  <Input id="rtmp-url" value={rtmpUrl} readOnly className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard(rtmpUrl)}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stream-key">Stream Key</Label>
                <div className="flex">
                  <Input id="stream-key" value={streamKey} type="password" readOnly className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard(streamKey)}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Keep your stream key private. Never share it publicly.</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Streaming Software Required</AlertTitle>
                <AlertDescription>
                  You'll need streaming software like OBS Studio, Streamlabs, or vMix to use these settings.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="share" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stream-url">Stream URL</Label>
                <div className="flex">
                  <Input id="stream-url" value={streamUrl} readOnly className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard(streamUrl)}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share on Facebook
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share on Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Link className="h-4 w-4" /> Copy Link
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="embed-code">Embed Code</Label>
                <Textarea
                  id="embed-code"
                  readOnly
                  value={`<iframe src="${streamUrl}/embed" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`}
                  rows={3}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    copyToClipboard(
                      `<iframe src="${streamUrl}/embed" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`,
                    )
                  }
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Embed Code
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
