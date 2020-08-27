export interface AppState {
  loaded: boolean;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  img: string;
}