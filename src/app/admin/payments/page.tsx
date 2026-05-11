"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";

const RECENT_TRANSACTIONS = [
  { id: "TX12345", student: "Rahul Sharma", course: "Meta Ads Mastery", amount: "₹11,999", status: "completed", date: "2024-05-08" },
  { id: "TX12346", student: "Priya Patel", course: "AI-SEO Course", amount: "₹7,999", status: "completed", date: "2024-05-07" },
  { id: "TX12347", student: "Amit Singh", course: "Branding Workshop", amount: "₹12,499", status: "pending", date: "2024-05-07" },
  { id: "TX12348", student: "Sanya Gupta", course: "Meta Ads Mastery", amount: "₹11,999", status: "completed", date: "2024-05-06" },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Payment Management</h1>
          <p className="text-muted-foreground">Track revenue, process refunds, and manage subscriptions.</p>
        </div>
        <Button className="rounded-xl">
          <Download className="h-4 w-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-primary/5 shadow-sm p-6 bg-primary text-primary-foreground relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <CreditCard className="h-24 w-24" />
           </div>
           <div className="relative z-10 space-y-4">
              <p className="text-sm font-medium opacity-80">Total Revenue (Monthly)</p>
              <div className="text-4xl font-bold">₹4,25,000</div>
              <div className="flex items-center text-xs">
                 <ArrowUpRight className="h-3 w-3 mr-1" />
                 <span className="font-bold">+18.2%</span>
                 <span className="ml-1 opacity-80">from last month</span>
              </div>
           </div>
        </Card>

        <Card className="rounded-3xl border-primary/5 shadow-sm p-6 space-y-4">
           <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
           <div className="text-3xl font-bold">₹82,400</div>
           <p className="text-xs text-muted-foreground">12 students with overdue balances.</p>
           <Button variant="outline" size="sm" className="w-full rounded-xl">Send Reminders</Button>
        </Card>

        <Card className="rounded-3xl border-primary/5 shadow-sm p-6 space-y-4">
           <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
           <div className="text-3xl font-bold">148</div>
           <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span className="font-bold">+5 new</span>
              <span className="ml-1 text-muted-foreground">this week</span>
           </div>
           <Button variant="outline" size="sm" className="w-full rounded-xl">View Plans</Button>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Transaction History</CardTitle>
            <div className="flex items-center space-x-2 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transaction ID..." className="pl-10 rounded-full h-10" />
               </div>
               <Button variant="outline" size="icon" className="rounded-full h-10 w-10 shrink-0">
                  <Filter className="h-4 w-4" />
               </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/30 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                    <tr>
                       <th className="px-6 py-4">Transaction ID</th>
                       <th className="px-6 py-4">Student</th>
                       <th className="px-6 py-4">Course</th>
                       <th className="px-6 py-4">Amount</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Date</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {RECENT_TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                         <td className="px-6 py-4 font-mono text-[11px] font-bold">{tx.id}</td>
                         <td className="px-6 py-4">
                            <div className="font-bold">{tx.student}</div>
                         </td>
                         <td className="px-6 py-4 text-muted-foreground">{tx.course}</td>
                         <td className="px-6 py-4 font-bold">{tx.amount}</td>
                         <td className="px-6 py-4">
                            <Badge className={tx.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'}>
                               {tx.status}
                            </Badge>
                         </td>
                         <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                         <td className="px-6 py-4 text-right">
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
