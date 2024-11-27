import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export const generatePDF = async () => {
  try {
    toast.loading('Generating PDF...');
    
    const content = document.getElementById('cv-content');
    if (!content) {
      toast.error('Content not found');
      return;
    }

    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('nicolas-vivar-cv.pdf');
    
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
  }
};