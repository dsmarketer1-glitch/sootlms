import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, MoreHorizontal, UserCheck, ShieldCheck, GraduationCap } from "lucide-react";

const MOCK_STUDENTS = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", courses: 2, progress: "65%", joined: "2024-04-10" },
  { id: "2", name: "Priya Patel", email: "priya@example.com", courses: 1, progress: "30%", joined: "2024-04-15" },
  { id: "3", name: "Amit Singh", email: "amit@example.com", courses: 3, progress: "90%", joined: "2024-03-20" },
  { id: "4", name: "Sanya Gupta", email: "sanya@example.com", courses: 1, progress: "10%", joined: "2024-05-01" },
];

export default function StudentManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Student Directory</h1>
          <p className="text-muted-foreground">Monitor student engagement and academic performance.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
          <GraduationCap className="h-4 w-4" />
          <span>{MOCK_STUDENTS.length} Total Enrolled</span>
        </div>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">Active Students</CardTitle>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search by name, email..." className="pl-10 rounded-full bg-background" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Courses</th>
                  <th className="px-6 py-4">Avg. Progress</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_STUDENTS.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                             {student.name[0]}
                          </div>
                          <div>
                             <div className="font-bold">{student.name}</div>
                             <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <Badge variant="outline" className="rounded-full">{student.courses} Courses</Badge>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-2">
                          <div className="flex-1 w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: student.progress }}></div>
                          </div>
                          <span className="font-bold text-xs">{student.progress}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{student.joined}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-500">
                          <Mail className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-green-500">
                          <UserCheck className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-yellow-500">
                          <ShieldCheck className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                       </Button>
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
