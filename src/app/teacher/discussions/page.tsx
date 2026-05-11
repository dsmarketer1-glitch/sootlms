"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, MessageCircle, Search, Filter, ShieldCheck, Flag } from "lucide-react";

const TEACHER_DISCUSSIONS = [
  { 
    id: "1", 
    title: "How to fix Meta Pixel tracking issues on Shopify?", 
    author: "Rahul Sharma", 
    role: "Student", 
    category: "Technical", 
    likes: 12, 
    replies: 5, 
    time: "2 hours ago",
    flagged: false
  },
  { 
    id: "2", 
    title: "Best bidding strategy for B2B lead generation?", 
    author: "Kuldeep Sir", 
    role: "Instructor", 
    category: "Strategy", 
    likes: 45, 
    replies: 18, 
    time: "5 hours ago",
    flagged: false
  },
  { 
    id: "3", 
    title: "AI SEO: Does Google penalize AI content in 2024?", 
    author: "Priya V.", 
    role: "Student", 
    category: "AI-SEO", 
    likes: 28, 
    replies: 12, 
    time: "1 day ago",
    flagged: true
  },
];

export default function TeacherDiscussionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Community Management</h1>
          <p className="text-muted-foreground">Engage with students and moderate the community discussions.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" className="rounded-xl border-red-500/20 text-red-500 hover:bg-red-50">
              <Flag className="h-4 w-4 mr-2" /> View Flagged (3)
           </Button>
           <Button className="rounded-xl px-6">New Announcement</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search threads or keywords..." className="pl-10 rounded-xl" />
        </div>
        <Button variant="outline" className="rounded-xl"><Filter className="h-4 w-4 mr-2" /> Categories</Button>
      </div>

      <div className="space-y-4">
        {TEACHER_DISCUSSIONS.map((post) => (
          <Card key={post.id} className={`rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group ${post.flagged ? 'border-red-500/20 bg-red-50/10' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="rounded-full text-[10px] uppercase font-bold text-primary">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    {post.flagged && <Badge className="bg-red-500 text-white border-none text-[10px]">FLAGGED FOR REVIEW</Badge>}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                       <div className="flex items-center space-x-2">
                         <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                            {post.author[0]}
                         </div>
                         <span className="text-xs font-semibold">{post.author}</span>
                         <span className="text-[10px] text-muted-foreground uppercase">{post.role}</span>
                       </div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <div className="flex items-center space-x-4 text-muted-foreground">
                         <div className="flex items-center space-x-1 text-xs">
                           <ThumbsUp className="h-4 w-4" /> <span>{post.likes}</span>
                         </div>
                         <div className="flex items-center space-x-1 text-xs">
                           <MessageCircle className="h-4 w-4" /> <span>{post.replies}</span>
                         </div>
                       </div>
                       <Button variant="ghost" size="sm" className="rounded-xl text-xs h-8">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Moderate
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
