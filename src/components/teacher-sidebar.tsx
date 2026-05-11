"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Video, 
  FileText, 
  MessageSquare,
  ChevronLeft,
  Menu,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/teacher" },
  { icon: BookOpen, label: "My Courses", href: "/teacher/courses" },
  { icon: Users, label: "My Students", href: "/teacher/students" },
  { icon: Video, label: "Live Sessions", href: "/teacher/live-sessions" },
  { icon: FileText, label: "Assignments", href: "/teacher/assignments" },
  { icon: MessageSquare, label: "Discussions", href: "/teacher/discussions" },
];

export function TeacherSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col border-r bg-muted/30 transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-16 flex items-center px-6 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter text-gradient">SOOT Teacher</span>
          </div>
        )}
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
