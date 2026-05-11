import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, MessageSquare, MoreHorizontal, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

const MOCK_LEADS = [
  { id: "1", name: "Ankit Verma", email: "ankit@example.com", phone: "+91 99999 88888", status: "new", source: "Facebook Ads", date: "2024-05-07" },
  { id: "2", name: "Sneha Kapoor", email: "sneha@example.com", phone: "+91 88888 77777", status: "interested", source: "Website Form", date: "2024-05-06" },
  { id: "3", name: "Vikram Rathore", email: "vikram@example.com", phone: "+91 77777 66666", status: "contacted", source: "Instagram", date: "2024-05-05" },
  { id: "4", name: "Megha Jain", email: "megha@example.com", phone: "+91 66666 55555", status: "enrolled", source: "Referral", date: "2024-05-04" },
];

export default function LeadManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Leads & CRM</h1>
          <p className="text-muted-foreground">Manage your sales funnel and track student conversions.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button className="rounded-xl">
             <UserPlus className="h-4 w-4 mr-2" /> Add Lead
           </Button>
        </div>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">All Leads ({MOCK_LEADS.length})</CardTitle>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search leads by name, email..." className="pl-10 rounded-full bg-background" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4">Lead Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_LEADS.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                       <div className="font-bold">{lead.name}</div>
                       <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                       <Badge 
                         variant="secondary" 
                         className={cn(
                           "rounded-full px-3 py-1 uppercase text-[10px] font-bold",
                           lead.status === 'new' && "bg-blue-500/10 text-blue-600 border-blue-500/20",
                           lead.status === 'interested' && "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
                           lead.status === 'enrolled' && "bg-green-500/10 text-green-600 border-green-500/20",
                           lead.status === 'contacted' && "bg-purple-500/10 text-purple-600 border-purple-500/20"
                         )}
                       >
                         {lead.status}
                       </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.source}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Phone className="h-4 w-4 text-green-500" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Mail className="h-4 w-4 text-blue-500" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MessageSquare className="h-4 w-4 text-primary" />
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

