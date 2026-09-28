export type ApiUser = {
  id: string;
  name: string;
  email: string;
  city: string;
  points: number;
};

export type ApiMaterialEntry = {
  id: string;
  userId: string;
  materialId: string;
  weightKg: number;
  pointsEarned: number;
  createdAt: string;
};

export const apiClient = {
  async getUsers(): Promise<ApiUser[]> {
    return [];
  },

  async saveUser(user: ApiUser): Promise<void> {
    return Promise.resolve();
  },

  async saveMaterialEntry(entry: ApiMaterialEntry): Promise<void> {
    return Promise.resolve();
  },
};
