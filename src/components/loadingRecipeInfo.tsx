import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { RecipeScreenInfo } from "../../types"
import * as recipeJson from "../data/100Recipes.json"

export default function LoadingRecipeInfo({ recipeId }: any) {

    

        //TODO: Display the titles of the recipes
        return (
            <View>
                {/* <Text style={styles.title}>{rcp.title}</Text> */}
                <Text style={styles.loadingText} >Loading Recipe Info...</Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    
    loadingText: {
        justifyContent:'center',
        alignItems: "center"
    }
}) 