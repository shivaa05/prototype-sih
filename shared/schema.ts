import { z } from "zod";

// Frontend-only Zod schemas and types used by the client
export const diseaseDetectionResponseSchema = z.object({
  diseaseName: z.string(),
  confidence: z.number(),
  severity: z.string(),
  recommendations: z.array(z.string()),
  heatmapUrl: z.string().optional(),
});

export type DiseaseDetectionResponse = z.infer<typeof diseaseDetectionResponseSchema>;

export const marketplaceItemResponseSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  sellerName: z.string(),
  sellerAvatar: z.string().optional(),
  sellerRating: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  cropType: z.string(),
  quantity: z.number(),
  unit: z.string(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  images: z.array(z.string()),
  location: z.string(),
  harvestDate: z.string().optional(),
  expiryDate: z.string().optional(),
  isOrganic: z.boolean(),
  status: z.string(),
  views: z.number(),
  likes: z.number(),
  createdAt: z.string(),
});

export type MarketplaceItemResponse = z.infer<typeof marketplaceItemResponseSchema>;
