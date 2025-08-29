import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, RotateCcw } from "lucide-react";

interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  certificateType: string;
}

interface CertificatePreviewProps {
  data: CertificateData | null;
  onDownload: () => void;
  onReset: () => void;
}

const CertificatePreview = ({ data, onDownload, onReset }: CertificatePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (data && canvasRef.current) {
      generateCertificate(data);
    }
  }, [data]);

  const generateCertificate = (certificateData: CertificateData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8faff');
    gradient.addColorStop(1, '#f0f9ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Header
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 180);

    // Certificate type
    ctx.fillStyle = '#06b6d4';
    ctx.font = '24px serif';
    const typeText = certificateData.certificateType.split(/(?=[A-Z])/).join(' ').toUpperCase();
    ctx.fillText(`OF ${typeText}`, canvas.width / 2, 220);

    // Decorative line
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.lineTo(900, 250);
    ctx.stroke();

    // "This is to certify that"
    ctx.fillStyle = '#374151';
    ctx.font = '20px serif';
    ctx.fillText('This is to certify that', canvas.width / 2, 300);

    // Student name
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 36px serif';
    ctx.fillText(certificateData.studentName, canvas.width / 2, 360);

    // Student name underline
    const nameWidth = ctx.measureText(certificateData.studentName).width;
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((canvas.width - nameWidth) / 2, 375);
    ctx.lineTo((canvas.width + nameWidth) / 2, 375);
    ctx.stroke();

    // Course completion text
    ctx.fillStyle = '#374151';
    ctx.font = '20px serif';
    ctx.fillText('has successfully completed the course', canvas.width / 2, 420);

    // Course name
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 28px serif';
    ctx.fillText(certificateData.courseName, canvas.width / 2, 470);

    // Date
    ctx.fillStyle = '#374151';
    ctx.font = '18px serif';
    const formattedDate = new Date(certificateData.completionDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillText(`Completed on ${formattedDate}`, canvas.width / 2, 530);

    // Signature section
    if (certificateData.instructorName) {
      ctx.fillStyle = '#374151';
      ctx.font = '16px serif';
      ctx.textAlign = 'left';
      ctx.fillText('Instructor:', 200, 650);
      
      ctx.fillStyle = '#1e40af';
      ctx.font = 'italic 18px serif';
      ctx.fillText(certificateData.instructorName, 200, 680);
      
      // Signature line
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(200, 690);
      ctx.lineTo(400, 690);
      ctx.stroke();
    }

    // Certificate number (mock)
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    const certNumber = `CERT-${Date.now().toString().slice(-6)}`;
    ctx.fillText(`Certificate No: ${certNumber}`, canvas.width - 100, canvas.height - 100);

    // Decorative elements
    drawSeal(ctx, 950, 600);
  };

  const drawSeal = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const radius = 50;
    
    // Outer circle
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Inner circle
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius - 10, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Star in center
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('★', x, y + 8);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const link = document.createElement('a');
    link.download = `certificate-${data.studentName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    onDownload();
  };

  if (!data) {
    return (
      <Card className="w-full bg-card/50 backdrop-blur-sm border-2 border-dashed border-primary/30">
        <CardContent className="p-12 text-center">
          <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Fill out the form to preview your certificate
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-primary">
          Certificate Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full overflow-auto bg-white rounded-lg border-2 border-primary/20 shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-w-full border-0"
            style={{ aspectRatio: '3/2' }}
          />
        </div>
        
        <div className="flex gap-3 justify-center pt-4">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            New Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePreview;