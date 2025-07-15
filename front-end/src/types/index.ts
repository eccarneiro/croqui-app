export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt: string;
}

export interface Sector {
  _id: string;
  name: string;
  description: string;
}

export interface BoulderImage {
  type: 'overview' | 'start' | 'line';
  url: string;
}

export interface Boulder {
  _id: string;
  name: string;
  grade: string;
  fa: string;
  description?: string;
  sector: string;
  images: BoulderImage[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Location {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

