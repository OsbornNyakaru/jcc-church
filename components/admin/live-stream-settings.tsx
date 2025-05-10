"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LiveStreamSettings() {
  const [autoStartRecording, setAutoStartRecording] = useState(true)
  const [enableLowLatency, setEnableLowLatency] = useState(true)
  const [enableDvr, setEnableDvr] = useState(true)
  const [maxBitrate, setMaxBitrate] = useState("6000")
  const [resolution, setResolution] = useState("1080p")
  const [chatModeration, setChatModeration] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)
  const [autoPublish, setAutoPublish] = useState(true)
  const [defaultVisibility, setDefaultVisibility] = useState("public")
  const date = new Date().toLocaleDateString()

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="technical">Technical</TabsTrigger>
        <TabsTrigger value="chat">Chat & Engagement</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure basic stream settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stream-title-template">Default Stream Title Template</Label>
              <Input
                id="stream-title-template"
                defaultValue="Sunday Worship Service - {date}"
                placeholder="Enter default title template"
              />
              <p className="text-xs text-muted-foreground">Use {date} to automatically insert the current date</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stream-description-template">Default Description Template</Label>
              <Textarea
                id="stream-description-template"
                defaultValue="Join us for worship, prayer, and teaching from God's Word. Live from JCC Nakuru Church."
                placeholder="Enter default description template"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-publish">Auto-Publish Recordings</Label>
              <Switch id="auto-publish" checked={autoPublish} onCheckedChange={setAutoPublish} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-visibility">Default Visibility</Label>
              <Select value={defaultVisibility} onValueChange={setDefaultVisibility}>
                <SelectTrigger id="default-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-start-recording">Auto-Start Recording</Label>
              <Switch id="auto-start-recording" checked={autoStartRecording} onCheckedChange={setAutoStartRecording} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save General Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automatic Scheduling</CardTitle>
            <CardDescription>Configure recurring streams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-auto-schedule">Enable Automatic Scheduling</Label>
              <Switch id="enable-auto-schedule" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Recurring Schedule</Label>
              <div className="grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-sm font-medium">{day}</div>
                    <input type="checkbox" defaultChecked={index === 0} className="h-4 w-4 rounded border-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" defaultValue="12:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-zone">Time Zone</Label>
              <Select defaultValue="America/New_York">
                <SelectTrigger id="time-zone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Schedule Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="technical" className="mt-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical Settings</CardTitle>
            <CardDescription>Configure stream quality and technical parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="max-bitrate">Maximum Bitrate (Kbps)</Label>
              <Input
                id="max-bitrate"
                type="number"
                value={maxBitrate}
                onChange={(e) => setMaxBitrate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Recommended: 4000-6000 for 1080p, 2500-4000 for 720p</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution">Maximum Resolution</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger id="resolution">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="480p">480p (SD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-low-latency">Enable Low Latency Mode</Label>
              <Switch id="enable-low-latency" checked={enableLowLatency} onCheckedChange={setEnableLowLatency} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-dvr">Enable DVR Functionality</Label>
              <Switch id="enable-dvr" checked={enableDvr} onCheckedChange={setEnableDvr} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-ingest">Backup Ingest Server</Label>
              <Input id="backup-ingest" defaultValue="rtmp://backup.mux.com/app" readOnly />
              <p className="text-xs text-muted-foreground">
                Use this server as a backup in case the primary server is unavailable
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Technical Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Encoding</CardTitle>
            <CardDescription>Configure advanced encoding settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyframe-interval">Keyframe Interval (seconds)</Label>
              <Input id="keyframe-interval" type="number" defaultValue="2" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-bitrate">Audio Bitrate (Kbps)</Label>
              <Input id="audio-bitrate" type="number" defaultValue="128" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encoder-preset">Encoder Preset</Label>
              <Select defaultValue="veryfast">
                <SelectTrigger id="encoder-preset">
                  <SelectValue placeholder="Select encoder preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultrafast">Ultrafast (Lowest CPU Usage)</SelectItem>
                  <SelectItem value="superfast">Superfast</SelectItem>
                  <SelectItem value="veryfast">Veryfast (Recommended)</SelectItem>
                  <SelectItem value="faster">Faster</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="medium">Medium (Higher Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Advanced Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="chat" className="mt-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Chat Settings</CardTitle>
            <CardDescription>Configure live chat behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-chat">Enable Live Chat</Label>
              <Switch id="enable-chat" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="chat-moderation">Enable Chat Moderation</Label>
              <Switch id="chat-moderation" checked={chatModeration} onCheckedChange={setChatModeration} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="require-approval">Require Message Approval</Label>
              <Switch id="require-approval" checked={requireApproval} onCheckedChange={setRequireApproval} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chat-delay">Chat Delay (seconds)</Label>
              <Input id="chat-delay" type="number" defaultValue="0" />
              <p className="text-xs text-muted-foreground">Add a delay before messages appear in the chat</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blocked-words">Blocked Words/Phrases</Label>
              <Textarea id="blocked-words" placeholder="Enter words or phrases to block, one per line" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chat-rules">Chat Rules</Label>
              <Textarea
                id="chat-rules"
                defaultValue="1. Be respectful to others\n2. No inappropriate language\n3. Stay on topic"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Chat Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Features</CardTitle>
            <CardDescription>Configure additional engagement options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-polls">Enable Live Polls</Label>
              <Switch id="enable-polls" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-prayer-requests">Enable Prayer Requests</Label>
              <Switch id="enable-prayer-requests" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-announcements">Enable Announcements</Label>
              <Switch id="enable-announcements" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-scripture-display">Enable Scripture Display</Label>
              <Switch id="enable-scripture-display" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                defaultValue="Welcome to our live stream! We're glad you're joining us today."
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Engagement Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
