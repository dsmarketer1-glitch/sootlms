"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, AlertCircle, Eye, Download, Star } from "lucide-react";

const SUBMISSIONS = [
  { id: "1", student: "Rahul Sharma", task: "Meta Pixel Implementation", status: "pending", date: "10 mins ago" },
  { id: "2", student: "Priya Patel", task: "Meta Pixel Implementation", status: "graded", score: "95/100", date: "2 hours ago" },
  { id: "3", student: "Amit Singh", task: "Google Ads Structure", status: "pending", date: "5 hours ago" },
  { id: "4", student: "Sanya Gupta", task: "Keyword Mapping", status: "graded", score: "88/100", date: "1 day ago" },
];

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Assignment Grading</h1>
          <p className="text-muted-foreground">Review and provide feedback on student practical submissions.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Card className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-primary/5 border-primary/10">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">12 Pending Reviews</span>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-[2rem] p-6 space-y-4 border-primary/5 shadow-sm">
            <h3 className="font-bold flex items-center"><FileText className="h-4 w-4 mr-2" /> Latest Task</h3>
            <div className="space-y-1">
               <p className="text-lg font-bold">Campaign Strategy PDF</p>
               <p className="text-xs text-muted-foreground">Course: Meta Ads Mastery</p>
            </div>
            <div className="flex justify-between text-xs pt-2">
               <span>Submissions: 45/120</span>
               <span className="text-primary font-bold">Due in 2 days</span>
            </div>
            <Button variant="outline" className="w-full rounded-xl">Edit Task</Button>
         </Card>

         <Card className="rounded-[2rem] p-6 space-y-4 border-primary/5 shadow-sm bg-primary/5">
            <h3 className="font-bold flex items-center text-primary"><Star className="h-4 w-4 mr-2" /> Top Performer</h3>
            <div className="flex items-center space-x-3">
               <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">AS</div>
               <div>
                  <p className="font-bold">Amit Singh</p>
                  <p className="text-xs text-muted-foreground">Avg Score: 98%</p>
               </div>
            </div>
            <Button className="w-full rounded-xl bg-primary shadow-lg shadow-primary/20">View Portfolio</Button>
         </Card>

         <Card className="rounded-[2rem] p-6 space-y-4 border-primary/5 shadow-sm">
            <h3 className="font-bold flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Feedback Rate</h3>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Avg response time: 4.5 hours</p>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
               <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
            </div>
         </Card>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="p-8 border-b bg-muted/10">
          <CardTitle className="text-xl font-bold">Recent Submissions</CardTitle>
          <CardDescription>Click on a submission to start the review process.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/30 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                    <tr>
                       <th className="px-8 py-4">Student</th>
                       <th className="px-8 py-4">Assignment Task</th>
                       <th className="px-8 py-4">Status</th>
                       <th className="px-8 py-4">Submitted</th>
                       <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {SUBMISSIONS.map((sub) => (
                      <tr key={sub.id} className="hover:bg-muted/10 transition-colors">
                         <td className="px-8 py-6">
                            <div className="font-bold">{sub.student}</div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="font-medium">{sub.task}</div>
                         </td>
                         <td className="px-8 py-6">
                            <Badge className={sub.status === 'graded' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-primary/10 text-primary border-primary/20'}>
                               {sub.status === 'graded' ? `Graded: ${sub.score}` : 'Pending Review'}
                            </Badge>
                         </td>
                         <td className="px-8 py-6 text-muted-foreground">{sub.date}</td>
                         <td className="px-8 py-6 text-right space-x-2">
                            <Button variant="ghost" size="icon" className="rounded-full">
                               <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                               <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-xl ml-2">Grade Now</Button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
