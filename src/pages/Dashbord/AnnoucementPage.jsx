"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";

// interface Announcement {
//   id: string
//   text: string
//   sendTo: string
//   category: string
// }

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "2",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "3",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "4",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "5",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "6",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
    {
      id: "7",
      text: "This is going be the placeholder for the announcement",
      sendTo: "Manager",
      category: "Design",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    text: "",
    sendTo: "Manager",
    category: "Design",
  });

  const handleAddAnnouncement = () => {
    if (newAnnouncement.text.trim() === "") return;

    const announcement = {
      id: Date.now().toString(),
      text: newAnnouncement.text,
      sendTo: newAnnouncement.sendTo,
      category: newAnnouncement.category,
    };

    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({
      text: "",
      sendTo: "Manager",
      category: "Design",
    });
  };
  return (
    <div className="container mx-auto py-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-1">
          <CardTitle className="text-lg font-semibold text-[#101828]  ">
            Announcements
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white shadow-sm ">
                <Plus className="text-[#344054] font-semibold font-s" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4  ">
                <div className="grid gap-2">
                  <Label
                    htmlFor="announcement"
                    className="text-[#475467] text-xs font-medium"
                  >
                    Announcement
                  </Label>
                  <Input
                    id="announcement"
                    value={newAnnouncement.text}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        text: e.target.value,
                      })
                    }
                    placeholder="Enter announcement text"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="sendTo"
                    className="text-[#475467] text-xs font-medium"
                  >
                    Send to
                  </Label>
                  <Select
                    value={newAnnouncement.sendTo}
                    onValueChange={(value) =>
                      setNewAnnouncement({ ...newAnnouncement, sendTo: value })
                    }
                  >
                    <SelectTrigger id="sendTo">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                      <SelectItem value="All">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="category "
                    className="text-[#475467] text-xs font-medium"
                  >
                    Category
                  </Label>
                  <Select
                    value={newAnnouncement.category}
                    onValueChange={(value) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddAnnouncement}>Add Announcement</Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="px-0">
          <div className="border-t">
            <div className="grid grid-cols-12 px-6 py-3 text-sm text-muted-foreground border border-b-[rgbh(0.928 0.006 264.531)]">
              <div className="col-span-6">Announcement</div>
              <div className="col-span-3">Send to</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="grid grid-cols-12 items-center px-6 py-4"
                >
                  <div className="col-span-6 text-sm font-medium text-[#101828]">
                    {announcement.text}
                  </div>
                  <div className="col-span-3 text-sm font-normal text-[#475467]">
                    {announcement.sendTo}
                  </div>
                  <div className="col-span-2 text-sm font-normal text-[#475467]">
                    {announcement.category}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
