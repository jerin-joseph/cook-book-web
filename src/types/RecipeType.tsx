interface Recipe {
  authorId: string;
  id: number;
  name: File | string;
  description: File | string;
  ingredients: File | [];
  instructions: File | [];
  date: string;
  authorName: string;
  thumbnail: string;
  videoURL: string;
}

export default Recipe;
