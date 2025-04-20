import { ref } from 'vue';
import { LocationData } from '@/composables/useGeolocation';

export interface IssueReport {
  id?: string;
  title: string;
  description: string;
  category: string;
  location: LocationData;
  imageUrl?: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: number;
  updatedAt: number;
  userId: string;
  votes: number;
}

export function useIssueReporting() {
  const isSubmitting = ref(false);
  const submitError = ref<string | null>(null);
  const currentReport = ref<IssueReport | null>(null);
  
  // Create a new report
  const createReport = async (report: Omit<IssueReport, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'votes'>): Promise<IssueReport> => {
    isSubmitting.value = true;
    submitError.value = null;
    
    try {
      // In a real implementation, this would send the data to a backend API
      // For now, we'll simulate a successful submission
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random ID
      const id = Math.random().toString(36).substring(2, 15);
      
      // Create the report object
      const newReport: IssueReport = {
        ...report,
        id,
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        votes: 0
      };
      
      // In a real implementation, we would store this in a database
      // For now, we'll just return the created report
      currentReport.value = newReport;
      
      return newReport;
    } catch (error: any) {
      submitError.value = error.message || 'Failed to submit report';
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Upload an image for a report
  const uploadImage = async (file: File): Promise<string> => {
    try {
      // In a real implementation, this would upload the image to a storage service
      // For now, we'll simulate a successful upload and return a data URL
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Return the data URL as the "uploaded" image URL
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read image file'));
        };
        reader.readAsDataURL(file);
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to upload image');
    }
  };
  
  // Get user's reports
  const getUserReports = async (userId: string): Promise<IssueReport[]> => {
    try {
      // In a real implementation, this would fetch the user's reports from a backend API
      // For now, we'll return some mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      return [
        {
          id: '1',
          title: 'Broken Streetlight',
          description: 'The streetlight has been flickering for two weeks and sometimes doesn\'t turn on at night, creating safety concerns.',
          category: 'Street Lighting',
          location: {
            latitude: 59.3293,
            longitude: 18.0686,
            address: 'Stora Torget, Uppsala',
            timestamp: Date.now() - 86400000 * 16 // 16 days ago
          },
          status: 'in-progress',
          createdAt: Date.now() - 86400000 * 16, // 16 days ago
          updatedAt: Date.now() - 86400000 * 10, // 10 days ago
          userId,
          votes: 12
        },
        {
          id: '2',
          title: 'Pothole on Main Road',
          description: 'Large pothole approximately 30cm in diameter and 10cm deep. Causing traffic problems and potential damage to vehicles.',
          category: 'Road Damage',
          location: {
            latitude: 59.3293,
            longitude: 18.0686,
            address: 'Kungsgatan, Stockholm',
            timestamp: Date.now() - 86400000 * 14 // 14 days ago
          },
          status: 'pending',
          createdAt: Date.now() - 86400000 * 14, // 14 days ago
          updatedAt: Date.now() - 86400000 * 14, // 14 days ago
          userId,
          votes: 8
        }
      ];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch reports');
    }
  };
  
  // Get report details
  const getReportDetails = async (reportId: string): Promise<IssueReport> => {
    try {
      // In a real implementation, this would fetch the report details from a backend API
      // For now, we'll return mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock data - return the first report from getUserReports
      const reports = await getUserReports('current-user');
      const report = reports.find(r => r.id === reportId);
      
      if (!report) {
        throw new Error('Report not found');
      }
      
      return report;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch report details');
    }
  };
  
  // Vote on a report
  const voteOnReport = async (reportId: string): Promise<IssueReport> => {
    try {
      // In a real implementation, this would send a vote to a backend API
      // For now, we'll simulate a successful vote
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get the report
      const report = await getReportDetails(reportId);
      
      // Update the votes
      report.votes += 1;
      report.updatedAt = Date.now();
      
      return report;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to vote on report');
    }
  };
  
  return {
    isSubmitting,
    submitError,
    currentReport,
    createReport,
    uploadImage,
    getUserReports,
    getReportDetails,
    voteOnReport
  };
}
