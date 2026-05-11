import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, Rocket, Target, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero */}
      <section className="bg-muted/30 py-24 text-center space-y-8">
        <div className="container mx-auto px-4">
          <Badge variant="outline" className="px-4 py-1 text-primary bg-primary/5 mb-6">Our Story</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto">
            We are the <span className="text-gradient">Odd Thinkers</span> of Jodhpur.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming conventional marketing education into an immersive, industry-first experience.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter">Educating the <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Next Generation</span> of Creative Disruptors.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded with the vision to bridge the gap between academic theory and industry reality, School of Odd Thinkers (SOOT) isn't just an academy—it's an incubator for excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that marketing is as much about psychology and creativity as it is about data and tools. Our "Odd Thinking" methodology encourages students to challenge the status quo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: Rocket, label: "Fast Growth", val: "5X" },
               { icon: Users, label: "Community", val: "5K+" },
               { icon: Target, label: "Accuracy", val: "99%" },
               { icon: Zap, label: "Speed", val: "24h" }
             ].map((item, i) => (
               <Card key={i} className="rounded-3xl border-primary/5 p-8 text-center space-y-2">
                  <item.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{item.val}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{item.label}</div>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Meet the Mentors</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Learn from practitioners who manage multi-million dollar budgets every month.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Kuldeep Sir", role: "Founder & Lead Mentor", img: "KS" },
              { name: "Industry Expert", role: "AI & SEO Specialist", img: "IE" },
              { name: "Digital Architect", role: "Funnel Strategy Expert", img: "DA" }
            ].map((member, i) => (
              <Card key={i} className="rounded-[2.5rem] border-primary/5 overflow-hidden group">
                <div className="aspect-square bg-muted flex items-center justify-center text-4xl font-bold text-primary/20 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                   {member.img}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
