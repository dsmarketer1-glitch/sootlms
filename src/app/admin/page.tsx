"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Target, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  BookOpen
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, enrollments: 24 },
  { name: "Feb", revenue: 3000, enrollments: 18 },
  { name: "Mar", revenue: 5000, enrollments: 32 },
  { name: "Apr", revenue: 4500, enrollments: 28 },
  { name: "May", revenue: 6000, enrollments: 40 },
  { name: "Jun", revenue: 5500, enrollments: 35 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at SOOT today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
          <TrendingUp className="h-4 w-4" />
          <span>+12% Growth this month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "₹4,25,000", icon: CreditCard, trend: "+15%", positive: true },
          { title: "Active Students", value: "1,240", icon: Users, trend: "+5%", positive: true },
          { title: "New Leads", value: "85", icon: Target, trend: "-2%", positive: false },
          { title: "Courses Sold", value: "42", icon: BookOpen, trend: "+12%", positive: true },
        ].map((kpi, i) => (
          <Card key={i} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <kpi.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center mt-1">
                {kpi.positive ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={kpi.positive ? "text-green-500 text-xs font-bold" : "text-red-500 text-xs font-bold"}>
                  {kpi.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border-primary/5 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl">Revenue Trend</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-3xl border-primary/5 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl">Recent Enrollments</CardTitle>
          </CardHeader>
          <div className="space-y-6">
            {[
              { name: "Rahul Sharma", course: "Performance Marketing", amount: "₹14,999", date: "2 mins ago" },
              { name: "Priya Patel", course: "AI-SEO Masterclass", amount: "₹9,999", date: "15 mins ago" },
              { name: "Amit Singh", course: "Branding & Storytelling", amount: "₹12,499", date: "1 hour ago" },
              { name: "Sanya Gupta", course: "Performance Marketing", amount: "₹14,999", date: "3 hours ago" },
            ].map((enrollment, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">
                    {enrollment.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{enrollment.name}</div>
                    <div className="text-xs text-muted-foreground">{enrollment.course}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-primary">{enrollment.amount}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{enrollment.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
