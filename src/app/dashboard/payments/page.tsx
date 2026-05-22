"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMockAuth } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Receipt
} from "lucide-react";

interface EnrollmentPayment {
  id: string;
  amount_paid: number;
  currency: string;
  enrolled_at: string;
  courses: {
    id: string;
    title: string;
    price: number;
  };
}

export default function StudentPaymentsPage() {
  const { userId, isLoaded } = useMockAuth();
  const [enrollment, setEnrollment] = useState<EnrollmentPayment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentDetails() {
      if (!userId) return;
      try {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("clerk_id", userId)
          .single();

        if (profile) {
          const { data, error } = await supabase
            .from("enrollments")
            .select("*, courses(*)")
            .eq("user_id", profile.id)
            .maybeSingle();

          if (error) {
            console.error("Error fetching enrollment payments:", error);
          } else if (data) {
            setEnrollment(data as any);
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching payment page:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && userId) {
      fetchPaymentDetails();
    }
  }, [userId, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Define total pricing and installments
  const courseTitle = enrollment?.courses?.title || "Mastering Performance Marketing";
  const totalFees = enrollment?.courses?.price || 10000;
  const paidTillDate = enrollment?.amount_paid || 0;
  const pendingAmount = Math.max(0, totalFees - paidTillDate);
  const progressPercent = (paidTillDate / totalFees) * 100;

  // Installments definition matching prompt
  // Total fees = 10000
  // Booking = 10% (1000)
  // First = 25% (2500), cumulative = 35% (3500)
  // Second = 25% (2500), cumulative = 60% (6000)
  // Final = 40% (4000), cumulative = 100% (10000)
  const installments = [
    { name: "Booking Amount", share: "10%", value: 1000, cumulative: 1000 },
    { name: "First Installment", share: "25%", value: 2500, cumulative: 3500 },
    { name: "Second Installment", share: "25%", value: 2500, cumulative: 6000 },
    { name: "Final Installment", share: "40%", value: 4000, cumulative: 10000 }
  ];

  // Determine which installments are paid
  const isInstallmentPaid = (cumulativeVal: number) => {
    return paidTillDate >= cumulativeVal;
  };

  // Determine what is due next
  let nextDueAmount = 0;
  let nextDueName = "All Paid";
  let nextDuePercentage = 0;

  if (paidTillDate < 1000) {
    nextDueAmount = 1000 - paidTillDate;
    nextDueName = "Booking Amount";
  } else if (paidTillDate < 3500) {
    nextDueAmount = 3500 - paidTillDate;
    nextDueName = "First Installment";
  } else if (paidTillDate < 6000) {
    nextDueAmount = 6000 - paidTillDate;
    nextDueName = "Second Installment";
  } else if (paidTillDate < 10000) {
    nextDueAmount = 10000 - paidTillDate;
    nextDueName = "Final Installment";
  }

  // Mock past payments matching the current real Supabase paid till date
  const mockTransactions = paidTillDate > 0 ? [
    { id: "TXN-901", amount: `₹${Math.min(paidTillDate, 1000).toLocaleString()}`, status: "paid", date: "Within 48 hours", method: "Razorpay" },
    ...(paidTillDate > 1000 ? [
      { id: "TXN-902", amount: `₹${Math.min(paidTillDate - 1000, 2500).toLocaleString()}`, status: "paid", date: "Recently Completed", method: "Razorpay" }
    ] : []),
    ...(paidTillDate > 3500 ? [
      { id: "TXN-903", amount: `₹${Math.min(paidTillDate - 3500, 2500).toLocaleString()}`, status: "paid", date: "Installment Cleared", method: "Razorpay" }
    ] : []),
    ...(paidTillDate > 6000 ? [
      { id: "TXN-904", amount: `₹${(paidTillDate - 6000).toLocaleString()}`, status: "paid", date: "Final Balance Cleared", method: "Razorpay" }
    ] : [])
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-gradient">Payments & Fees</h1>
        <p className="text-muted-foreground">Manage your course fees and view installment milestones.</p>
      </div>

      {!enrollment ? (
        <Card className="rounded-[2.5rem] border-primary/5 p-12 text-center space-y-6 max-w-xl mx-auto">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
             <h3 className="text-xl font-bold">No Payments Active</h3>
             <p className="text-sm text-muted-foreground">You are not enrolled in any course yet. Enroll in a course from our catalog to set up your payment details.</p>
          </div>
          <Link href="/courses" className="block">
             <Button className="rounded-full px-8">Browse Courses</Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Fee Summary Card */}
             <Card className="lg:col-span-2 rounded-[2.5rem] border-primary/5 shadow-2xl p-8 relative overflow-hidden bg-linear-to-br from-background to-muted/30">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Receipt className="h-32 w-32" />
                </div>
                <div className="relative z-10 space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Fee Breakdown</h3>
                      <Badge variant="outline" className="rounded-full px-4 py-1">Course: {courseTitle}</Badge>
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
                      {pendingAmount > 0 ? (
                        <Button className="rounded-2xl h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 flex-1">
                           <CreditCard className="h-5 w-5 mr-2" /> Pay Pending Fee (₹{pendingAmount.toLocaleString()})
                        </Button>
                      ) : (
                        <Button disabled className="rounded-2xl h-14 px-8 text-lg font-bold flex-1 bg-green-600 hover:bg-green-600 text-white cursor-default">
                           <CheckCircle2 className="h-5 w-5 mr-2" /> Course Fully Paid
                        </Button>
                      )}
                   </div>
                </div>
             </Card>

             {/* Next Due Card */}
             {pendingAmount > 0 ? (
               <Card className="rounded-[2.5rem] border-primary/5 shadow-lg p-8 space-y-6 bg-red-50/50 border-red-100 flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600">
                        <Clock className="h-6 w-6" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-bold">Next Milestone</h3>
                        <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">{nextDueName}</p>
                        <p className="text-3xl font-black text-red-600">₹{nextDueAmount.toLocaleString()}</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-start space-x-2 p-4 bg-white/50 rounded-2xl border border-red-100">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-700">Clearing this will automatically unlock the next phase of modules in your learning player.</p>
                     </div>
                     <Button className="w-full rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 py-6">Pay Milestone</Button>
                  </div>
               </Card>
             ) : (
               <Card className="rounded-[2.5rem] border-primary/5 shadow-lg p-8 space-y-6 bg-green-50/50 border-green-100 flex flex-col justify-center text-center items-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                     <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold">100% Completed!</h3>
                     <p className="text-sm text-green-700 font-medium">All installments have been fully paid. You have full lifetime access to all course modules.</p>
                  </div>
               </Card>
             )}
          </div>

          {/* Detailed Installments Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="rounded-[2rem] border-primary/5 shadow-sm p-8 space-y-6">
                <div>
                   <h3 className="text-xl font-bold">Installment Milestones</h3>
                   <p className="text-sm text-muted-foreground">Your phased course unlocking rules based on total fee payments.</p>
                </div>
                <div className="space-y-4">
                   {installments.map((inst, index) => {
                     const isPaid = isInstallmentPaid(inst.cumulative);
                     return (
                       <div key={index} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isPaid ? "bg-green-500/5 border-green-100" : "bg-muted/10"}`}>
                          <div className="flex items-center space-x-3">
                             <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isPaid ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                                {isPaid ? <CheckCircle2 className="h-5 w-5" /> : <span>{index + 1}</span>}
                             </div>
                             <div>
                                <p className="font-bold text-sm">{inst.name}</p>
                                <p className="text-xs text-muted-foreground">{inst.share} of Total Fees</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className={`font-bold text-sm ${isPaid ? "text-green-600" : "text-foreground"}`}>₹{inst.value.toLocaleString()}</p>
                             <p className="text-[10px] text-muted-foreground uppercase">{isPaid ? "Unlocked" : "Locked"}</p>
                          </div>
                       </div>
                     );
                   })}
                </div>
             </Card>

             {/* Payment History */}
             <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
               <CardHeader className="p-8 border-b">
                 <CardTitle className="text-xl font-bold">Payment History</CardTitle>
                 <CardDescription>All your previous transactions and receipts.</CardDescription>
               </CardHeader>
               <CardContent className="p-0">
                  {mockTransactions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-sm">No transactions registered yet.</div>
                  ) : (
                    <div className="overflow-x-auto">
                       <table className="w-full text-sm text-left">
                          <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                             <tr>
                                <th className="px-8 py-4">Transaction ID</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Status</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y">
                             {mockTransactions.map((tx) => (
                               <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                                  <td className="px-8 py-6 font-mono text-[11px] font-bold">{tx.id}</td>
                                  <td className="px-8 py-6 font-bold">{tx.amount}</td>
                                  <td className="px-8 py-6 text-muted-foreground">{tx.date}</td>
                                  <td className="px-8 py-6">
                                     <Badge className="bg-green-500/10 text-green-600 border-green-500/20 rounded-full px-3">
                                        {tx.status}
                                     </Badge>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  )}
               </CardContent>
             </Card>
          </div>
        </>
      )}
    </div>
  );
}
