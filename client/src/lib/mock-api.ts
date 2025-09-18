import type { DiseaseDetectionResponse } from "@shared/schema";

const mockDiseases: DiseaseDetectionResponse[] = [
  {
    diseaseName: "Early Blight",
    confidence: 87,
    severity: "Medium",
    recommendations: [
      "Apply copper-based fungicide spray every 7-10 days",
      "Improve air circulation around plants",
      "Remove affected leaves and destroy them",
      "Avoid overhead watering to reduce humidity",
      "Consider resistant varieties for future planting"
    ],
    heatmapUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    diseaseName: "Leaf Spot Disease",
    confidence: 92,
    severity: "High",
    recommendations: [
      "Immediate application of systemic fungicide",
      "Remove all infected plant parts immediately",
      "Increase spacing between plants for better airflow",
      "Apply preventive copper spray on healthy plants",
      "Monitor daily for further spread"
    ],
    heatmapUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    diseaseName: "Healthy Plant",
    confidence: 95,
    severity: "Good",
    recommendations: [
      "Continue current care routine",
      "Maintain proper watering schedule",
      "Apply balanced fertilizer monthly",
      "Monitor for any early signs of stress",
      "Keep area clean and weed-free"
    ],
  },
  {
    diseaseName: "Bacterial Wilt",
    confidence: 74,
    severity: "High",
    recommendations: [
      "Remove and destroy infected plants immediately",
      "Disinfect tools after each use",
      "Avoid working with wet plants",
      "Improve soil drainage",
      "Use disease-free seeds or transplants"
    ],
    heatmapUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    diseaseName: "Powdery Mildew",
    confidence: 89,
    severity: "Medium",
    recommendations: [
      "Apply neem oil spray every 3-4 days",
      "Ensure adequate spacing between plants",
      "Avoid overhead irrigation",
      "Remove affected leaves immediately",
      "Apply baking soda solution as preventive measure"
    ],
    heatmapUrl: "https://images.unsplash.com/photo-1585521140449-bf4d1b6659e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  }
];

export async function mockDetectDisease(): Promise<DiseaseDetectionResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return random disease for demo purposes
  const randomIndex = Math.floor(Math.random() * mockDiseases.length);
  return mockDiseases[randomIndex];
}

export async function mockSaveResult(result: DiseaseDetectionResponse): Promise<void> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Saved result:', result);
}
