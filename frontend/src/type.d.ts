interface RecipeType {
  _id?: string;
  name: string;
  servings: number;
  ingredients: string[];
  description: string;
  instructions: string[];
  favorite?: boolean;
  tags?: string[];
  difficulty?: string;
  notes?: string[];
  rating?: number;
  dateCreated?: Date;
  img?: string;
}
