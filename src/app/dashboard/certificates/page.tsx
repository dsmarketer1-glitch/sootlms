import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, ExternalLink } from "lucide-react";

export default function StudentCertificatesPage() {
  const certificates = [
    { id: "CERT-001", title: "Digital Branding Masterclass", issued: "April 20, 2024", instructor: "Kuldeep Sir" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">My Certificates</h1>
          <p className="text-muted-foreground">Validate your expertise and showcase your achievements.</p>
        </div>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <Card key={cert.id} className="rounded-[2.5rem] border-primary/10 shadow-2xl overflow-hidden group">
               <div className="aspect-[1.414/1] bg-muted relative p-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_100%)] opacity-5"></div>
                  <Award className="h-20 w-20 text-primary/20" />
                  <div className="space-y-2 relative z-10">
                     <h3 className="text-2xl font-black tracking-tighter uppercase">{cert.title}</h3>
                     <p className="text-xs text-muted-foreground font-serif italic">This is to certify that you have successfully completed the requirements for the professional certification.</p>
                  </div>
                  <div className="pt-8 border-t w-full flex justify-between items-end relative z-10">
                     <div className="text-left">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Issued on</div>
                        <div className="text-xs font-bold">{cert.issued}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Instructor</div>
                        <div className="text-xs font-bold">{cert.instructor}</div>
                     </div>
                  </div>
               </div>
               <CardContent className="p-6 bg-muted/30 border-t flex items-center justify-between">
                  <div className="space-y-1">
                     <div className="font-bold text-sm">Certificate ID: {cert.id}</div>
                     <div className="text-[10px] text-muted-foreground">Verified by School of Odd Thinkers</div>
                  </div>
                  <div className="flex space-x-2">
                     <Button size="icon" variant="outline" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                     </Button>
                     <Button size="icon" className="rounded-full">
                        <Download className="h-4 w-4" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="rounded-[3rem] border-dashed border-2 p-20 flex flex-col items-center justify-center text-center space-y-6">
           <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Award className="h-10 w-10" />
           </div>
           <div className="space-y-2">
              <h3 className="text-2xl font-bold">No Certificates Yet</h3>
              <p className="text-muted-foreground max-w-sm">Complete a course and pass the final assessment to earn your first professional certificate.</p>
           </div>
           <Button className="rounded-xl px-8">Continue Learning</Button>
        </Card>
      )}
    </div>
  );
}
