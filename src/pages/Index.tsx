import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import { Cloud, GraduationCap, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-certificate.jpg";

interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  certificateType: string;
}

const Index = () => {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (data: CertificateData) => {
    setIsGenerating(true);
    
    // Simulate generation time for better UX
    setTimeout(() => {
      setCertificateData(data);
      setIsGenerating(false);
      toast({
        title: "Certificate Generated! 🎓",
        description: `Successfully created certificate for ${data.studentName}`,
      });
    }, 1500);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started 📥",
      description: "Your certificate is being downloaded...",
    });
  };

  const handleReset = () => {
    setCertificateData(null);
    toast({
      title: "Ready for New Certificate",
      description: "Form reset. You can create a new certificate now.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full mb-6 animate-slide-in">
              <Cloud className="h-5 w-5 text-primary animate-float" />
              <span className="text-primary font-semibold">Cloud-Powered Certificate Generation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-in">
              🎓 Certificate Generator
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-in">
              Professional certificate generation with cloud architecture. 
              Create, preview, and download certificates instantly.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-float">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Instant Generation</h3>
                <p className="text-sm text-muted-foreground">Create certificates in seconds with real-time preview</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Professional Quality</h3>
                <p className="text-sm text-muted-foreground">High-resolution certificates ready for printing</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-primary mb-2">Multiple Types</h3>
                <p className="text-sm text-muted-foreground">Various certificate templates for different achievements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-primary mb-3">
                Create Your Certificate
              </h2>
              <p className="text-muted-foreground">
                Enter the student details below to generate a professional certificate
              </p>
            </div>
            
            <CertificateForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-primary mb-3">
                Preview & Download
              </h2>
              <p className="text-muted-foreground">
                Your certificate will appear here with real-time preview
              </p>
            </div>
            
            <CertificatePreview 
              data={certificateData}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="bg-card/30 backdrop-blur-sm border-t border-primary/20 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Built with Cloud Architecture
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              This certificate generator demonstrates modern cloud principles with frontend generation, 
              secure handling, and professional output suitable for any educational institution.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Frontend Generation</h3>
                <p className="text-muted-foreground">Real-time certificate creation using HTML5 Canvas</p>
              </div>
              <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Secure Downloads</h3>
                <p className="text-muted-foreground">Client-side generation with secure file handling</p>
              </div>
              <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Scalable Design</h3>
                <p className="text-muted-foreground">Ready for cloud deployment and scaling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  );
};

export default Index;