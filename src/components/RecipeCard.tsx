import React from 'react'
import { View, Image, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native'
import { RecipeCardProps } from "../../types"
import { shadowStyle, colorPalette } from "../constants/ColorPalette"

const _screen = Dimensions.get("screen");

export default function RecipeCard({ id, rcp }: RecipeCardProps) {

    //TODO: Display the titles of the recipes
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleWithBackground}>{rcp.title}</Text>
                </View>
                {rcp.image ? 
                    <Image key={id} source={{ uri: rcp.image || " " }} style={styles.picture} />
                : <View style={styles.pictureUnavailableContainer}><Text style={styles.pictureUnavailable}>Picture unavailable for this recipe 😟  But believe us, it's delicious!🍽 </Text></View>}
            </View>
            {/* <ImageBackground key={id} source={{uri: rcp.image || " "}} style={styles.picture}><View style={styles.titleContainer}><Text style={styles.titleWithBackground}>{rcp.title}</Text></View></ImageBackground> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    picture: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
        borderRadius: 20,
        alignItems: "center"
    },
    title: {
        color: "white",
        marginTop: 5,
        justifyContent: "center",
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
        borderRadius: 15,
        ...shadowStyle
    },
    subContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width * 0.9,
        height: _screen.height * 0.6,
        borderRadius: 30,
        backgroundColor: colorPalette.secondary,
        ...shadowStyle
    },
    pictureUnavailable: {
        textAlign: "center",
    },
    pictureUnavailableContainer: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: "white",
        width: 250,
        borderRadius: 15,
        ...shadowStyle
    }
})