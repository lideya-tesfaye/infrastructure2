
export type Language = 'en' | 'am' | 'om';
export type Theme = 'light' | 'dark';
export type View = 'home' | 'about' | 'learnMore' | 'login' | 'managerDashboard' | 'sectorDashboard';

export interface SectorSubmission {
  id: string;
  sectorName: string;
  documentName: string;
  longitudeFile: string;
  latitudeFile: string;
  timestamp: string;
}

export interface UserState {
  role: 'manager' | 'sector' | null;
  isAuthenticated: boolean;
}
