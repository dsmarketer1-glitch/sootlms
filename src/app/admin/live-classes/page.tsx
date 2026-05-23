"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Video, Calendar, Clock, MapPin, MoreHorizontal, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingUrl, setMeetingUrl] = useState("");
  
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch live classes with relations
      const { data: clsData } = await supabase
        .from("live_classes")
        .select(`
          *,
          course:courses(title),
          trainer:user_profiles!trainer_id(full_name)
        `)
        .order("scheduled_at", { ascending: true });
        
      if (clsData) setClasses(clsData);

      // Fetch courses for dropdown
      const { data: crsData } = await supabase.from("courses").select("id, title");
      if (crsData) setCourses(crsData);

      // Fetch trainers for dropdown
      const { data: trnData } = await supabase.from("user_profiles").select("id, full_name").eq("role", "trainer");
      if (trnData) setTrainers(trnData);

    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    if (!title || !courseId || !trainerId || !scheduledAt) {
      setFormError("Please fill in all required fields.");
      setFormLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/create-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          course_id: courseId, 
          trainer_id: trainerId, 
          scheduled_at: new Date(scheduledAt).toISOString(),
          duration_minutes: parseInt(duration),
          meeting_room_url: meetingUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Failed to schedule class.");
      } else {
        setFormSuccess("Class scheduled successfully!");
        setTitle("");
        setDescription("");
        setCourseId("");
        setTrainerId("");
        setScheduledAt("");
        setMeetingUrl("");
        loadData();
        setTimeout(() => {
          setIsOpen(false);
          setFormSuccess("");
        }, 1500);
      }
    } catch (err: any) {
      setFormError(err?.message || "An unexpected error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Live Classes</h1>
          <p className="text-muted-foreground">Schedule and manage your live interactive sessions.</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Schedule Class
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative border-primary/10 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm font-bold h-8 w-8 rounded-full border flex items-center justify-center hover:bg-muted"
            >
              ✕
            </button>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl flex items-center"><Video className="h-5 w-5 mr-2 text-primary" /> Schedule Live Session</CardTitle>
              <CardDescription>Assign a class to a course and a trainer.</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div className="space-y-2">
                <Label>Topic / Title *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course *</Label>
                  <select 
                    value={courseId} 
                    onChange={(e) => setCourseId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Trainer *</Label>
                  <select 
                    value={trainerId} 
                    onChange={(e) => setTrainerId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select Trainer</option>
                    {trainers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date & Time *</Label>
                  <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Duration (Mins)</Label>
                  <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Meeting Link (Zoom/Meet)</Label>
                <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://zoom.us/j/..." />
              </div>

              {formError && (
                <div className="p-3 rounded-md bg-red-500/10 text-red-600 text-xs flex items-center"><AlertCircle className="h-4 w-4 mr-2" />{formError}</div>
              )}
              {formSuccess && (
                <div className="p-3 rounded-md bg-green-500/10 text-green-600 text-xs flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" />{formSuccess}</div>
              )}

              <Button disabled={formLoading} type="submit" className="w-full">
                {formLoading ? "Scheduling..." : "Schedule Class"}
              </Button>
            </form>
          </Card>
        </div>
      )}

      {loading ? (
         <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <Card onClick={() => setIsOpen(true)} className="rounded-[2rem] border-primary border-2 border-dashed bg-primary/5 flex flex-col items-center justify-center p-12 text-center space-y-4 cursor-pointer hover:bg-primary/10 transition-all">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                 <Video className="h-8 w-8" />
              </div>
              <div>
                 <h3 className="font-bold text-lg">New Session</h3>
                 <p className="text-sm text-muted-foreground">Start an instant live class now.</p>
              </div>
           </Card>

           {classes.map((session) => (
             <Card key={session.id} className="rounded-[2rem] border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                <CardHeader className="bg-muted/30 pb-4">
                   <div className="flex justify-between items-start">
                      <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">{session.status}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                         <MoreHorizontal className="h-4 w-4" />
                      </Button>
                   </div>
                   <CardTitle className="text-xl mt-4">{session.title}</CardTitle>
                   <p className="text-xs font-bold text-primary uppercase tracking-widest">{session.course?.title || "No Course"}</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-6 flex-1">
                   <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                         <Calendar className="h-4 w-4 mr-2 text-primary" />
                         <span className="font-medium text-foreground">{new Date(session.scheduled_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                         <Clock className="h-4 w-4 mr-2 text-primary" />
                         <span className="font-medium text-foreground">{new Date(session.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ({session.duration_minutes}m)</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                         <MapPin className="h-4 w-4 mr-2 text-primary" />
                         <span className="font-medium text-foreground truncate">{session.meeting_room_url || session.meeting_platform}</span>
                      </div>
                   </div>

                   <div className="flex items-center space-x-3 pt-4 border-t">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold uppercase">
                         {session.trainer?.full_name?.[0] || "?"}
                      </div>
                      <div className="text-xs font-medium">Instructor: {session.trainer?.full_name || "Unknown"}</div>
                   </div>
                </CardContent>
                <div className="p-4 border-t bg-muted/10">
                   <Button className="w-full rounded-xl h-11 font-bold">Manage Session</Button>
                </div>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
}
