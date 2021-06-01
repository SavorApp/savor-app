import { Recipe, UserRecipe } from "../../types";

export function applySmartFilter(fetchedRcps: Recipe[], userRcps: UserRecipe[]): Recipe[] {

    interface CountMap {
        [ingredient: string]: number;
    }

    // Object to contain overall counts for each ingredient
    const ingredientsCount: CountMap = {};

    // Generate counts for each ingredient for each recipe in user's UserRecipe list
    for (const idx in userRcps) {
        userRcps[idx].ingredients.forEach((ing) => {
            if(ingredientsCount[ing]) {
                ingredientsCount[ing]++;
            } else {
                ingredientsCount[ing] = 1;
            }
        });
    }

    // Iterate over each fetched Recipe
    fetchedRcps.forEach((rcp) => {
        let score = 0;
        // For each ingredient in the user's ingredientsCount object
        for (const ing in ingredientsCount) {
            // If the current Recipe includes the ingredient...
            if (rcp.ingredients.includes(ing)) {
                // Increment the score by the ingredients count
                score += ingredientsCount[ing];
            }
        }
        // Re-assign smartFilterScore with score/100 to handle large integers
        rcp.smartFilterScore = score/100;
    });

    // Sort by descending order (higher scors first)
    fetchedRcps.sort((a: Recipe, b: Recipe) => {
        return  b.smartFilterScore - a.smartFilterScore;
    });

    return fetchedRcps;
}
