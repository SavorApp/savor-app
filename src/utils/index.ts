import { dishTypeBundler } from "../constants/Maps";

// Removes recipes that are savored and, viewed in the last 3 days
export function removeRecentlyViewedRecipes(fetchedRcps: Recipe[], userRcps: UserRecipe[]): Recipe[] {

    // Date at time of function call
    const currDate = new Date();
    const oneDay=1000*60*60*24;

    // Create an array of Recipes where
    // - Savored = true
    // - was viewed within the last 3 days
    const rcpsToRemove = userRcps.filter((rcp) => {
        if (rcp.isSavored) {
            return true;
        }
        if (rcp.updatedAt) {
            // Evaluate the date difference of,
            // current datetime and when the recipe was updated last
            const updatedAtDate = new Date(rcp.updatedAt)
            const dateDiffInDays = (currDate.valueOf() - updatedAtDate.valueOf())/oneDay
            // Return true if date difference is <= 3 days
            return (dateDiffInDays <= 3);
        } else {
            return true;
        }
      })
      
    // Create an array of IDs for Recipes to remove
    const rcpIdsToRemove = rcpsToRemove.map((rcp: UserRecipe) => {
        return rcp.id;
      }); 

    // Filter fetched Recipes by removing all Recipes where the ID is found in rcpIdsToRemove
    const filteredRcps = fetchedRcps.filter((rcp: Recipe) => {
        return !rcpIdsToRemove.includes(rcp.id);
    });

    return filteredRcps;
}

// Maps a score to all random Recipes based on a count of ingredients
// within all of the users Savored Recipes
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
            if (ingredientsCount[ing]) {
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

// Returns the appropriate endpoint for the Random Recipe Spoonacular API request
export function constructEndpoint(filters: Filters) {
    let endpoint = "number=100&tags=";

    // Bundle & format dishType filter using dishTypeBundler
    if (filters.dishType) {
        const bundledDishType = dishTypeBundler[filters.dishType];
        endpoint += bundledDishType;
    }

    // Include cuisine filter if applied
    endpoint += `${filters.cuisine && filters.cuisine + ","}`;

    // If Vegan selected, use vegan filter
    if (filters.vegan) {
        endpoint += "vegan,"
    } else {
        // Otherwise, allow for vegetarian or diary free filter
        endpoint+=
            `${filters.vegetarian ? "vegetarian," : ""}` +
            `${filters.dairyFree ? "dairy%20free," : ""}`;
    }

    // Apply gluten free filter if selected
    endpoint += `${filters.glutenFree ? "gluten%20free," : ""}`;

    return endpoint;
}
