"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Receipt
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PAYMENT_HISTORY = [
  { id: "INV-001", amount: "₹4,999", status: "paid", date: "April 15, 2024", method: "Razorpay" },
  { id: "INV-002", amount: "₹4,999", status: "paid", date: "March 15, 2024", method: "Razorpay" },
  { id: "INV-003", amount: "₹4,999", status: "paid", date: "February 15, 2024", method: "UPI" },
];

export default function StudentPaymentsPage() {
  const totalFees = 29999;
  const paidTillDate = 14997;
  const pendingAmount = totalFees - paidTillDate;
  const progressPercent = (paidTillDate / totalFees) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-gradient">Payments & Fees</h1>
        <p className="text-muted-foreground">Manage your course fees and download tax invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Fee Summary Card */}
         <Card className="lg:col-span-2 rounded-[2.5rem] border-primary/5 shadow-2xl p-8 relative overflow-hidden bg-linear-to-br from-background to-muted/30">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Receipt className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Fee Breakdown</h3>
                  <Badge variant="outline" className="rounded-full px-4 py-1">Course: Meta Ads Mastery</Badge>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground">Total Course Fee</p>
                     <p className="text-3xl font-bold">₹{totalFees.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm text-green-500 font-medium">Paid Till Date</p>
                     <p className="text-3xl font-bold text-green-600">₹{paidTillDate.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm text-red-500 font-medium">Pending Balance</p>
                     <p className="text-3xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                     <span>Payment Progress</span>
                     <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3 rounded-full" />
               </div>

               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="rounded-2xl h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 flex-1">
                     <CreditCard className="h-5 w-5 mr-2" /> Pay Pending Fee
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-14 px-8 text-lg font-bold flex-1">
                     View Installment Plan
                  </Button>
               </div>
            </div>
         </Card>

         {/* Next Due Card */}
         <Card className="rounded-[2.5rem] border-primary/5 shadow-lg p-8 space-y-6 bg-red-50/50 border-red-100">
            <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600">
               <Clock className="h-6 w-6" />
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-bold">Next Installment</h3>
               <p className="text-3xl font-black text-red-600">₹4,999</p>
               <p className="text-sm font-medium text-red-700/70">Due by May 15, 2024</p>
            </div>
            <div className="flex items-start space-x-2 p-4 bg-white/50 rounded-2xl border border-red-100">
               <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
               <p className="text-xs text-red-700">Please pay before the due date to avoid a late fee of ₹500.</p>
            </div>
            <Button className="w-full rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200">Pay Now</Button>
         </Card>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="p-8 border-b">
          <CardTitle className="text-xl font-bold">Payment History</CardTitle>
          <CardDescription>All your previous transactions and receipts.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                    <tr>
                       <th className="px-8 py-4">Invoice ID</th>
                       <th className="px-8 py-4">Amount</th>
                       <th className="px-8 py-4">Method</th>
                       <th className="px-8 py-4">Date</th>
                       <th className="px-8 py-4">Status</th>
                       <th className="px-8 py-4 text-right">Receipt</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {PAYMENT_HISTORY.map((tx) => (
                      <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                         <td className="px-8 py-6 font-mono text-[11px] font-bold">{tx.id}</td>
                         <td className="px-8 py-6 font-bold">{tx.amount}</td>
                         <td className="px-8 py-6 text-muted-foreground">{tx.method}</td>
                         <td className="px-8 py-6 text-muted-foreground">{tx.date}</td>
                         <td className="px-8 py-6">
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 rounded-full px-3">
                               {tx.status}
                            </Badge>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                               <Download className="h-4 w-4" />
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
