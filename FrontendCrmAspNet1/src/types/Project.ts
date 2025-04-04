export interface CreateProjectRequest {
    projectName: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    budget: number;
    projectOwnerId: number;
    clientId: number;
  }

  export interface Project {
    id: number;
    projectName: string;
    description?: string;
    imageUrl?: string;
    startDate: string;
    endDate: string;
    budget: number;
  
    clientId: number;
    clientName: string;
  
    projectOwnerId: number;
    projectOwnerName: string;
  
    isCompleted: boolean;
  }