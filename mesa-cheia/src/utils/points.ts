import type { MaterialCatalogItem } from "../data/mockData";

export function calculatePoints(material: MaterialCatalogItem, weightKg: number) {
  return Math.round(material.pointsPerKg * weightKg);
}

export function formatPoints(value: number) {
  return `${value} pts`;
}
