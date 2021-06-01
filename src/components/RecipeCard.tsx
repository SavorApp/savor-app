import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'
import { RecipeCardParamList } from "../../types"
import { shadowStyle, colorPalette } from "../constants/ColorPalette"

const _screen = Dimensions.get("screen");

export default function RecipeCard({ id, rcp }: RecipeCardParamList) {

    //TODO: Need to modify the "Type" displayed
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleBackground}>{rcp.title}</Text>
                </View>
                {rcp.image ?
                    <Image key={id} source={{ uri: rcp.image || " " }} style={styles.picture} />
                    : <View style={styles.pictureUnavailableContainer}>
                        <Text style={styles.pictureUnavailable}>Picture unavailable for this recipe 😟  But believe us, it's delicious!🍽 </Text>
                    </View>}

                <View style={styles.rcpInfoContainer}>
                    <Text style={styles.rcpInfo}>Type: {rcp.dishTypes}</Text>
                    <Text style={styles.rcpInfo}>Cuisine: {rcp.cuisines}</Text>
                    <Text style={styles.rcpInfo}>Dairy-free:{rcp.dairyFree ? " ✅  " : " ❌ "}</Text>
                    <Text style={styles.rcpInfo}>Gluten-free:{rcp.glutenFree ? " ✅  " : " ❌ "}</Text>
                    <Text style={styles.rcpInfo}>Vegetarian:{rcp.vegetarian ? " ✅  " : " ❌ "}</Text>
                    <Text style={styles.rcpInfo}>Vegan:{rcp.vegan ? " ✅  " : " ❌ "}</Text>

                    <Text style={{ fontWeight: "bold", ...styles.rcpInfo }}>Servings: {rcp.servings}</Text>
                    <Text style={{ fontWeight: "bold", ...styles.rcpInfo }}>Prep time: {rcp.readyInMinutes} min</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    titleBackground: {
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
        paddingTop: 20,
        alignItems: "center",
        width: _screen.width * 0.85,
        height: _screen.height * 0.64,
        borderRadius: 30,
        backgroundColor: colorPalette.secondary,
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
        justifyContent: "center",
        alignItems: "center",
        height: _screen.height * 0.25 
    },

    rcpInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'wrap',
        backgroundColor: "white",
        borderRadius: 20,
        width: _screen.width * 0.75,
        marginTop: 10,
        alignContent: "stretch",
        marginBottom: 10,
    },

    rcpInfo: {
        textAlign: "center",
        marginTop: 10,
        width: "50%",
    }
})