export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  tags: string[];
}

export interface Project {
  id: number;
  name: string;
  slug?: string;
}
 