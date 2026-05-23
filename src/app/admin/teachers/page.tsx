"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Mail, Lock, Shield, CheckCircle2, AlertCircle } from "lucide-react";

interface TeacherProfile {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("role", "trainer")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading teachers:", error);
      } else if (data) {
        setTeachers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    if (!fullName || !email || !password) {
      setFormError("All fields are required.");
      setFormLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/create-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Failed to create teacher account.");
      } else {
        setFormSuccess("Teacher account created successfully!");
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        // Reload teacher listings
        loadTeachers();
        // Wait a second and close modal
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Trainers & Instructors</h1>
          <p className="text-muted-foreground">Manage your academy's professional teaching staff.</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="rounded-full px-6 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4 mr-2" /> Add New Trainer
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative border-primary/10">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm font-bold h-8 w-8 rounded-full border flex items-center justify-center hover:bg-muted"
            >
              ✕
            </button>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl flex items-center"><Shield className="h-5 w-5 mr-2 text-primary" /> Create Trainer Credentials</CardTitle>
              <CardDescription>Enter details to provision a trainer login in Clerk and Supabase.</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleCreateTeacher} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="fullName"
                    placeholder="e.g. Kuldeep Sir"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="e.g. kuldeep@soot.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Login Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">📞</span>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <Button disabled={formLoading} type="submit" className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
                {formLoading ? "Creating Teacher Account..." : "Create Trainer Login"}
              </Button>
            </form>
          </Card>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : teachers.length === 0 ? (
        <Card className="rounded-[2.5rem] border border-dashed p-12 text-center space-y-4 bg-muted/5 max-w-xl mx-auto">
          <Users className="h-10 w-10 text-muted-foreground mx-auto" />
          <div className="space-y-1">
             <h3 className="text-lg font-bold">No trainers created yet</h3>
             <p className="text-sm text-muted-foreground">Click the "Add New Trainer" button above to provision credentials for your faculty.</p>
          </div>
        </Card>
      ) : (
        <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b">
            <CardTitle className="text-xl font-bold">Teaching Faculty</CardTitle>
            <CardDescription>View, audit, and manage all active teacher/trainer profiles.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                  <tr>
                    <th className="px-8 py-4">Trainer Name</th>
                    <th className="px-8 py-4">Email Address</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Provisioned Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-8 py-6 font-bold flex items-center space-x-3">
                         <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                           {teacher.full_name[0]}
                         </div>
                         <span>{teacher.full_name}</span>
                      </td>
                      <td className="px-8 py-6 text-muted-foreground">{teacher.email}</td>
                      <td className="px-8 py-6">
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 rounded-full px-3">
                          {teacher.is_active ? "active" : "inactive"}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-muted-foreground">
                        {new Date(teacher.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
