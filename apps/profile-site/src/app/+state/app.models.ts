export interface AppState {
  loaded: boolean;
  noaaDataLoaded: boolean;
  projects: Project[];
  noaaData: NoaaData;
}

export interface NoaaData {
  data: any;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  img: string;
}