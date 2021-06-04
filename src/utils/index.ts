interface CountMap {
    [ingredient: string]: number;
}

export function removeViewedRecipes(fetchedRcps: Recipe[], userRcps: UserRecipe[]): Recipe[] {
    // Create an array of IDs for Recipes we want to remove
    const rcpIdsToRemove = userRcps.map((rcp) => {
      return rcp.id;
    });

    // Filter fetched Recipes by removing all Recipes where the ID is found in rcpIdsToRemove
    const filteredRcps = fetchedRcps.filter((rcp) => {
        return !rcpIdsToRemove.includes(rcp.id);
    });

    return filteredRcps;
}

export function applySmartFilter(fetchedRcps: Recipe[], userRcps: UserRecipe[]): Recipe[] {

    // Filter UserRecipeList by is Savored = true
    const userSavoredList = userRcps.filter((rcp) => {
      return rcp.isSavored;
    })

    // Object to contain overall counts for each ingredient
    const ingredientsCount: CountMap = {};

    // Generate counts for each ingredient for each recipe in user's UserRecipe list
    for (const idx in userSavoredList) {
        userSavoredList[idx].ingredients.forEach((ing) => {
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
