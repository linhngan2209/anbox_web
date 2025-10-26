export interface Ingredient {
    name: string;
    servings: {
        [key: string]: string;
    };
}

export interface Nutrition {
    Calories: string;
    Fat: string;
    'Saturated Fat': string;
    Carbohydrate: string;
    Sugar: string;
    Fiber: string;
    Protein: string;
    Cholesterol: string;
    Sodium: string;
}

export interface Recipe {
    _id: string;
    name: string;
    category: 'meat' | 'vegetarian';
    url: string;
    ingredients: Ingredient[];
    seasonings: string[];
    instructions: {
        preparation: string;
        cooking: string;
    };
    nutrition: Nutrition;
    info: {
        time: string;
        difficulty: string;
    };
    price: number,
    sold?: number,
}

export interface WeeklyMenu {
    weekNumber: number;
    startDate: string;
    endDate: string;
    recipes: Recipe[];
}

export interface RecipeCardProps {
    recipe: Recipe;
    onClick: () => void;
}