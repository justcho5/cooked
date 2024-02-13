import axios from "axios";
const baseUrl = "/api/recipes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (recipeObject: RecipeType) => {
  const response = await axios.post(baseUrl, recipeObject);

  return response.data;
};

const update = async (id: string, recipeObject: RecipeType) => {
  const response = await axios.put(`${baseUrl}/${id}`, recipeObject);
  return response.data;
};

const remove = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, get, create, update, remove };
