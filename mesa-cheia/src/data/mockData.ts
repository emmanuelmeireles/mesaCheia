export type MaterialCatalogItem = {
  id: string;
  name: string;
  pointsPerKg: number;
  color: string;
};

export type Partner = {
  id: string;
  name: string;
  type: string;
  distance: string;
  city: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  points: number;
};

export type MaterialEntry = {
  id: string;
  userId: string;
  materialId: string;
  weightKg: number;
  pointsEarned: number;
  createdAt: string;
};

export const materialCatalog: MaterialCatalogItem[] = [
  { id: "paper", name: "Papel", pointsPerKg: 8, color: "#E8791F" },
  { id: "plastic", name: "Plástico", pointsPerKg: 10, color: "#A9CC59" },
  { id: "metal", name: "Metal", pointsPerKg: 14, color: "#F6F1E4" },
  { id: "glass", name: "Vidro", pointsPerKg: 9, color: "#A9CC59" },
  { id: "organic", name: "Orgânico", pointsPerKg: 6, color: "#E8791F" },
];

export const partners: Partner[] = [
  { id: "1", name: "Cooperativa Verde", type: "Reciclagem", distance: "1.2 km", city: "Centro" },
  { id: "2", name: "Horta Comunitária do Sol", type: "Horta", distance: "2.8 km", city: "Vila Nova" },
  { id: "3", name: "ONG Semeando Vida", type: "Ação social", distance: "4.1 km", city: "Jardim" },
  { id: "4", name: "Prefeitura do Bairro", type: "Ponto de coleta", distance: "3.5 km", city: "Boa Vista" },
];

export const initialUsers: User[] = [
  {
    id: "user-1",
    name: "Maria Silva",
    email: "maria@email.com",
    password: "123456",
    city: "Recife",
    points: 180,
  },
];

export const initialMaterialEntries: MaterialEntry[] = [
  {
    id: "entry-1",
    userId: "user-1",
    materialId: "paper",
    weightKg: 4.5,
    pointsEarned: 36,
    createdAt: "2026-09-25",
  },
  {
    id: "entry-2",
    userId: "user-1",
    materialId: "plastic",
    weightKg: 2,
    pointsEarned: 20,
    createdAt: "2026-09-27",
  },
];
