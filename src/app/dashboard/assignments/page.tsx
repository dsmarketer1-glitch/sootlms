import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle2, Clock } from "lucide-react";

const ASSIGNMENTS = [
  { id: "1", title: "Meta Ads Funnel Design", course: "Performance Marketing", deadline: "May 15, 2024", status: "pending" },
  { id: "2", title: "Keyword Research Spreadsheet", course: "AI-SEO Masterclass", deadline: "May 20, 2024", status: "submitted" },
  { id: "3", title: "Brand Voice Guidelines", course: "Branding & Storytelling", deadline: "May 10, 2024", status: "graded", grade: "A+" },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Assignments</h1>
        <p className="text-muted-foreground">Submit your projects and track your grades.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ASSIGNMENTS.map((assignment) => (
          <Card key={assignment.id} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden">
             <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                   <FileText className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-1">
                   <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold">{assignment.title}</h3>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "rounded-full text-[10px] uppercase",
                          assignment.status === 'pending' && "bg-yellow-500/10 text-yellow-600",
                          assignment.status === 'submitted' && "bg-blue-500/10 text-blue-600",
                          assignment.status === 'graded' && "bg-green-500/10 text-green-600"
                        )}
                      >
                        {assignment.status}
                      </Badge>
                   </div>
                   <p className="text-sm text-muted-foreground">{assignment.course}</p>
                   <div className="flex items-center text-xs text-muted-foreground pt-2">
                      <Clock className="h-3 w-3 mr-1" /> Deadline: {assignment.deadline}
                   </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                   {assignment.status === 'graded' ? (
                      <div className="text-right">
                         <div className="text-xs text-muted-foreground uppercase font-bold">Grade</div>
                         <div className="text-3xl font-black text-primary">{assignment.grade}</div>
                      </div>
                   ) : (
                      <Button className="rounded-xl">
                         <Upload className="h-4 w-4 mr-2" /> {assignment.status === 'pending' ? 'Submit' : 'Update'}
                      </Button>
                   )}
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
