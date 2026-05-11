"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Target, 
  Video, 
  CreditCard, 
  Settings,
  ChevronLeft,
  Menu
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: Users, label: "Students", href: "/admin/students" },
  { icon: Target, label: "Leads & CRM", href: "/admin/leads" },
  { icon: Video, label: "Live Classes", href: "/admin/live-classes" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col border-r bg-muted/30 transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-16 flex items-center px-6 border-b">
        {!isCollapsed && <span className="text-xl font-bold tracking-tighter text-gradient">SOOT Admin</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-xl transition-all group",
                isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-muted"
              )}>
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "" : "text-muted-foreground group-hover:text-primary")} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
