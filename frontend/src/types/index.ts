export interface Blueprint {
  id: string;
  name: string;
  description: string;
  terms: string[];
}

export interface Contract {
  id: string;
  blueprint_id: string;
  title: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
