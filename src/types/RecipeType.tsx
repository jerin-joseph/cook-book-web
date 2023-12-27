interface Recipe {
  authorId: string;
  id: string;
  name: File | string;
  description: File | string;
  ingredients: File | [];
  instructions: File | string;
  date: string;
}

export default Recipe;
