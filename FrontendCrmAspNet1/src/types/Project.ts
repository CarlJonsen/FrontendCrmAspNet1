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