import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Rocket, Users, Target, Zap } from "lucide-react";

export default function HomePage() {
  const featuredCourses = [
    {
      title: "Mastering Performance Marketing",
      description: "Scale your business with Google Ads, Meta Ads, and advanced funnel strategies.",
      price: "₹14,999",
      level: "Intermediate",
      duration: "8 Weeks",
      students: "1,200+",
      slug: "performance-marketing"
    },
    {
      title: "AI-Powered SEO Masterclass",
      description: "Learn how to use ChatGPT and Jasper to dominate search rankings in 2024.",
      price: "₹9,999",
      level: "All Levels",
      duration: "6 Weeks",
      students: "850+",
      slug: "ai-seo"
    },
    {
      title: "Digital Branding & Storytelling",
      description: "Build a brand that people love and remember through creative thinking.",
      price: "₹12,499",
      level: "Beginner",
      duration: "10 Weeks",
      students: "2,100+",
      slug: "branding-storytelling"
    }
  ];

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-10"></div>
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5 animate-pulse">
            #1 Digital Marketing Institute in Jodhpur
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
            Stop Thinking Like a Marketer. <br />
            <span className="text-gradient">Start Thinking Odd.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The only operating system you need to master digital branding, performance marketing, and the creative art of odd thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold group">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold">
              Book a Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y glass rounded-3xl">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">5,000+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Students</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Placement</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Industry Tools</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">4.9/5</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Student Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Why School of Odd Thinkers?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">We don't follow the curriculum. We lead the industry with practical, real-world experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Rocket, title: "Live Projects", desc: "Work on international campaigns for top-tier brands from day one." },
            { icon: Zap, title: "AI Integration", desc: "Master the latest AI tools to automate and optimize your marketing efforts." },
            { icon: Users, title: "1-on-1 Mentorship", desc: "Get direct guidance from industry experts who have scaled 7-figure agencies." },
            { icon: Target, title: "Outcome Focused", desc: "We focus on results—leads, sales, and career transformations." },
            { icon: CheckCircle2, title: "Job Ready", desc: "Graduate with a portfolio that makes hiring managers say 'YES'." },
            { icon: Rocket, title: "Odd Thinking", desc: "Learn the psychological art of unconventional creativity." }
          ].map((feature, i) => (
            <div key={i} className="flex space-x-4 p-6 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors border">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Accelerate Your Career</h2>
            <p className="text-muted-foreground">Expertly crafted courses for every stage of your digital journey.</p>
          </div>
          <Link href="/courses">
            <Button variant="ghost" className="hover:text-primary">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden rounded-3xl shadow-xl shadow-primary/5">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-white/30">{course.level}</Badge>
                </div>
              </div>
              <CardHeader className="space-y-2">
                <CardTitle className="group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center"><Zap className="h-4 w-4 mr-1 text-yellow-500" /> {course.duration}</span>
                  <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-blue-500" /> {course.students}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="text-2xl font-bold text-primary">{course.price}</div>
                <Link href={`/courses/${course.slug}`}>
                  <Button variant="secondary" size="sm" className="rounded-full">Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-20 text-center space-y-8 text-primary-foreground">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]"></div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-2xl mx-auto">
            Ready to join the Odd Thinking Revolution?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Join 5,000+ students who have transformed their careers with SOOT. Book your free seat for the next batch today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold shadow-2xl">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-14 text-lg font-bold border-white/20 hover:bg-white/10">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
