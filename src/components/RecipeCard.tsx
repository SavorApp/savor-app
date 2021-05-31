import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { RecipeCardParamLists } from "../../types"

export default function RecipeCard({ id, rcp}: RecipeCardParamLists) {

        //TODO: Display the titles of the recipes
        return (
            <View>
                {/* <Text style={styles.title}>{rcp.title}</Text> */}
                <Image key={id} source={{uri: rcp.image || " "}} style={styles.picture} />
            </View>
        )
    }

const styles = StyleSheet.create({
    picture: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    title: {
        justifyContent:'center',
        alignItems: "center"
    }
})