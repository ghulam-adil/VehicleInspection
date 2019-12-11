import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';

class Vehicles extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        vehicles: [
            { vrn: 'ABC-456', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'XYZ-546', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'KLD-853', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'IOP-963', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'THG-842', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'EDS-159', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'POA-861', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'MNB-457', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'ZXV-989', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'VBJ-964', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'SDO-325', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
            { vrn: 'LKA-958', model: '2015 - TOYOTA', name: 'COROLLA XLI' },
        ]
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={dark} barStyle="light-content" />

                <ScrollView
                    // stickyHeaderIndices={[0]}
                >
                    {/* <View style={{ backgroundColor: '#fff' }}>

                        <View style={styles.input}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon style={styles.icon} name='search' size={26} color={dark} />
                            </View>
                            <TextInput
                                placeholder='Search Here'
                                style={{ width: '70%' }}
                                placeholderTextColor={dark1}
                            />
                        </View>

                    </View> */}

                {
                    this.props.navigation.state.params.data.map((value, index) => 
                        <View style={styles.item} key={index}
                            // onPress={() => this.props.navigation.navigate('questions', { value })}
                        >

                            <View style={value.status == 'pass' ? styles.detailsIconGreen : styles.detailsIconRed }>
                                <MaterialIcon name={value.status == 'pass' ? 'check' : 'close'} size={height * 0.05} 
                                                color={'#fff'} />
                                {/* <Image style={styles.mediumImage} source={require('../assets/avatar.png')} /> */}
                            </View>

                            <View style={styles.rightContainer}>
                                <Text style={[styles.text, { fontSize: height * 0.03, color: dark1 }]}>{value.question}</Text>
                            </View>

                        </View>
                    )
                }

                </ScrollView>

                <TouchableOpacity style={styles.submitButton}
                    // onPress={() => { this.props.navigation.navigate('vehicles') }}
                >
                    {/* <MaterialIcon name='exit-to-app' size={26} color={whiteColor} /> */}
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailsIconGreen: {
        backgroundColor: '#5ee527', height: height * 0.08, alignItems: 'center', justifyContent: 'center', width: height * 0.08, 
        borderRadius: height * 0.05
    },
    detailsIconRed: {
        backgroundColor: 'red', height: height * 0.08, alignItems: 'center', justifyContent: 'center',
        width: height * 0.08, borderRadius: height * 0.05
    },
    item: {
        flexDirection: 'row', alignItems: 'center', padding: height * 0.02, borderBottomWidth: height * 0.001, borderColor: dark1
    },
    text: {
        fontFamily: appFont, color: 'gray'
    },
    rightContainer: {
        paddingHorizontal: height * 0.01
    },
    input: {
        backgroundColor: '#fff', width: width * 0.9, marginVertical: height * 0.03, elevation: 4, flexDirection: 'row',
        alignItems: 'center', alignSelf: 'center'
    },
    icon: {
        marginHorizontal: width * 0.02
    },
    iconContainer: {
        width: '12%'
    },
    submitButton: {
        width: width, alignItems: 'center', justifyContent: 'center', elevation: 4,
        height: height * 0.09, backgroundColor: darker, alignSelf: 'center',
        // flexDirection: 'row'
    },
    submitButtonText: {
        fontFamily: appFont, color: whiteColor, fontSize: height * 0.03, marginHorizontal: width * 0.03
    },
});

export default Vehicles;