import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { RecipeCardProps } from "../../types"

export default function RecipeCard({ id, rcpImage}: RecipeCardProps) {

        return (
            <View>
                <Image key={id} source={{uri: rcpImage}} style={styles.picture} />
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