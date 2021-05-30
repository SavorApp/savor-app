import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export type SwipeButtonsParamList = {
    cardRef: Object | undefined
}

export default function SwipeButtons({cardRef}: {cardRef: SwipeButtonsParamList}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {console.log(cardRef)}}>
                <Feather name="x-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {console.log(cardRef)}}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
        
    },
    button: {
        width: 50,
        height: 50,
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.46,
        elevation: 9,
    },
})