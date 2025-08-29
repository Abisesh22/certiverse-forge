import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CloudDownload, GraduationCap } from "lucide-react";

interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  certificateType: string;
}

interface CertificateFormProps {
  onGenerate: (data: CertificateData) => void;
  isGenerating: boolean;
}

const CertificateForm = ({ onGenerate, isGenerating }: CertificateFormProps) => {
  const [formData, setFormData] = useState<CertificateData>({
    studentName: "",
    courseName: "",
    instructorName: "",
    completionDate: new Date().toISOString().split('T')[0],
    certificateType: "completion"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.studentName && formData.courseName) {
      onGenerate(formData);
    }
  };

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-2 animate-float">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Certificate Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name *</Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => handleInputChange("studentName", e.target.value)}
              placeholder="Enter student's full name"
              required
              className="border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name *</Label>
            <Input
              id="courseName"
              value={formData.courseName}
              onChange={(e) => handleInputChange("courseName", e.target.value)}
              placeholder="e.g., Cloud Computing Fundamentals"
              required
              className="border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructorName">Instructor Name</Label>
            <Input
              id="instructorName"
              value={formData.instructorName}
              onChange={(e) => handleInputChange("instructorName", e.target.value)}
              placeholder="Enter instructor's name"
              className="border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="completionDate">Completion Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) => handleInputChange("completionDate", e.target.value)}
                className="pl-9 border-primary/30 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="certificateType">Certificate Type</Label>
            <Select
              value={formData.certificateType}
              onValueChange={(value) => handleInputChange("certificateType", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Select certificate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completion">Certificate of Completion</SelectItem>
                <SelectItem value="achievement">Certificate of Achievement</SelectItem>
                <SelectItem value="excellence">Certificate of Excellence</SelectItem>
                <SelectItem value="participation">Certificate of Participation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            type="submit"
            disabled={isGenerating || !formData.studentName || !formData.courseName}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CloudDownload className="h-4 w-4" />
                Generate Certificate
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateForm;