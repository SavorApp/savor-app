import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default function LoadingCardStack() {

        //TODO: Display the titles of the recipes
        return (
            <View>
                {/* <Text style={styles.title}>{rcp.title}</Text> */}
                <Text style={styles.loadingText} >Loading...</Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    
    loadingText: {
        justifyContent:'center',
        alignItems: "center"
    }
})