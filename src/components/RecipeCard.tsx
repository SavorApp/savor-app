import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { RecipeCardProps } from "../../types"

export default function RecipeCard({ id, rcp}: RecipeCardProps) {

        //TODO: Display the titles of the recipes
        return (
            <View>
                <Image key={id} source={{uri: rcp.image}} style={styles.picture} />
                {/* <Text>{rcp.title}</Text> */}
            </View>
        )
    }

const styles = StyleSheet.create({
    picture: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 20,
    }
})