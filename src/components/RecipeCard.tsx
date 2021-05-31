import React from 'react'
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native'
import { RecipeCardProps } from "../../types"

export default function RecipeCard({ id, rcp}: RecipeCardProps) {

        //TODO: Display the titles of the recipes
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleWithBackground}>{rcp.title}</Text>
                </View>
                <Image key={id} source={{uri: rcp.image || " "}} style={styles.picture}/>
                {/* <ImageBackground key={id} source={{uri: rcp.image || " "}} style={styles.picture}><Text style={styles.title}>{rcp.title}</Text></ImageBackground> */}
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems: "center"
    },
    picture: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    title: {
        color: "white",
        marginTop: 5,
        justifyContent:"center",
        alignItems: "center"
    },
    titleWithBackground: {
        color: "black",
        marginTop: 5,
        textAlign: "center",
    },
    titleContainer: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: "white",
        width: 250,
        borderRadius: 15
    }
})