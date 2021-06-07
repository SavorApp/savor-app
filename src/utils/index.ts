import { dishTypeBundler } from "../constants/Maps";


export function removeRecentlyViewedRecipes(fetchedRcps: Recipe[], userRcps: UserRecipe[]): Recipe[] {
    
    // For this block to work, we need TODO:
    // - When user swipes, check DB first if user has viewed recipe in the past
    // - if so, update recipes update_at column to current datetime
    // - else, write to DB as normal


    /* // Date at time of function call
    const currDate = new Date();
    const oneDay=1000*60*60*24;

    // Create an array of Recipes viewed within 7 days
    const rcpsViewedWithin7Days = userRcps.filter((rcp) => {
        // Evaluate the date difference of,
        // when the Recipe was viewed last and right now
        const dateDiffInDays = (rcp.updatedAt.valueOf() - currDate.valueOf())/oneDay
        // Return recipes where date difference is <= 7 days
        return (dateDiffInDays <= 7);
      })
      
    // Create an array of IDs for Recipes viewed within 7 days
    const rcpIdsToRemove = rcpsViewedWithin7Days.map((rcp: UserRecipe) => {
        return rcp.id;
      }); */

    // Remove this .map() once we received updatedAt property from DB
    const rcpIdsToRemove = userRcps.map((rcp: UserRecipe) => {
      return rcp.id;
    });

    // Filter fetched Recipes by removing all Recipes where the ID is found in rcpIdsToRemove
    const filteredRcps = fetchedRcps.filter((rcp: Recipe) => {
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
