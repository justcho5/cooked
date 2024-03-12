import axios from "axios";
const baseUrl = "/api/generate";

export const importByURL = async (url: { url: string }) => {
  const response = await axios.post(`${baseUrl}/import-by-url`, url);

  return response.data;
};

export const generateWithGPT = async (ingredients: { ingredients: string }) => {
  const response = await axios.post(`${baseUrl}/generate-recipe`, ingredients);

  return response.data;
};
