export type Project = {
  id: number;
  slug: string;
  title: string;
  image: string;
  tags: string[];
  date: string;
  company: string;
  github?: string;
  liveUrl?: string;
  description: string[]; // changed to array
};
