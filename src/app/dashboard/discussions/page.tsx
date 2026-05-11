"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, MessageCircle, Search, Filter } from "lucide-react";

const DISCUSSIONS = [
  { 
    id: "1", 
    title: "How to fix Meta Pixel tracking issues on Shopify?", 
    author: "Rahul Sharma", 
    role: "Student", 
    category: "Technical", 
    likes: 12, 
    replies: 5, 
    time: "2 hours ago" 
  },
  { 
    id: "2", 
    title: "Best bidding strategy for B2B lead generation?", 
    author: "Kuldeep Sir", 
    role: "Instructor", 
    category: "Strategy", 
    likes: 45, 
    replies: 18, 
    time: "5 hours ago" 
  },
  { 
    id: "3", 
    title: "AI SEO: Does Google penalize AI content in 2024?", 
    author: "Priya V.", 
    role: "Student", 
    category: "AI-SEO", 
    likes: 28, 
    replies: 12, 
    time: "1 day ago" 
  },
];

export default function StudentDiscussionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Community Discussions</h1>
          <p className="text-muted-foreground">Collaborate with peers and get expert advice.</p>
        </div>
        <Button className="rounded-xl px-6">Start Discussion</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions..." className="pl-10 rounded-xl" />
        </div>
        <Button variant="outline" className="rounded-xl"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
      </div>

      <div className="space-y-4">
        {DISCUSSIONS.map((post) => (
          <Card key={post.id} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="rounded-full text-[10px] uppercase font-bold text-primary">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                  <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-muted" />
                      <span className="text-xs font-semibold">{post.author}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{post.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1 text-xs">
                      <ThumbsUp className="h-4 w-4" /> <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <MessageCircle className="h-4 w-4" /> <span>{post.replies}</span>
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
