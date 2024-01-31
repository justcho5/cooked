import axios from "axios";
const baseUrl = "http://localhost:3001/api/recipes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id: string) => {
  console.log(`${baseUrl}/${id}`);
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response.data);
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

export default { getAll, get, create, update };
