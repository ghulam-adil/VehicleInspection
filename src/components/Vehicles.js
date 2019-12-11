import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, FlatList } 
            from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

import variables from './variables';

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
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
            { vrn: 'ABC-123', model: '2008', type: 'hiace' },
        ],
        data: [],
        loading: true,
        text: '',
    }

    componentDidMount() {

        fetch(variables.url + '/api/VehicleInspectionApi/VehicleDetails', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            this.setState({ data: responseJson.ResponseObject, loading: false });
        })
        .catch(error => {
            console.log(error);
        })

    }

    handleLogout = () => {

        let keys = ['email', 'password', 'user'];
        AsyncStorage.multiRemove(keys, (err) => {
            console.log('Local storage user info removed!');
        });

        this.props.navigation.navigate('login');

    }

    render() {

        const filteredData = this.state.data.filter(value => {
            return value.VRN.toLowerCase().includes(this.state.text.toLowerCase());
        })

        return(
            <View>
                <StatusBar backgroundColor={dark} barStyle="light-content" />

                {
                    this.state.loading && 

                        <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>

                            <ActivityIndicator 
                                color={dark}
                                size='large'
                            />

                            <Text style={{ fontFamily: appFont, color: dark }}>Please Wait...</Text>

                        </View>

                }


                <ScrollView
                    stickyHeaderIndices={[0]}
                >

                    <View>

                        <View style={styles.headerContainer}>

                            <View style={styles.input}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcon style={styles.icon} name='search' size={26} color={dark} />
                                </View>
                                <TextInput
                                    placeholder='Search here'
                                    style={{ width: '70%' }}
                                    placeholderTextColor={dark1}
                                    onChangeText={(text) => this.setState({ text })}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={this.handleLogout}
                            >
                                <MaterialIcon name='exit-to-app' size={height * 0.04} color={whiteColor} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <FlatList 
                        data={filteredData}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}
                                onPress={() => this.props.navigation.navigate('vehicleDetails', { vehicle: item, user: this.props.navigation.state.params.user })}
                            >

                                <View style={styles.detailsIcon}>
                                    <MaterialIcon name='directions-car' size={height * 0.05} color={dark} />
                                    {/* <Image style={styles.mediumImage} source={require('../assets/avatar.png')} /> */}
                                </View>

                                <View style={styles.rightContainer}>
                                    <Text style={[styles.text, { fontSize: height * 0.03, color: dark }]}>{item.VRN}</Text>
                                    <Text style={styles.text}>{item.Model}</Text>
                                    <Text style={styles.text}>{item.VehicleType}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: dark, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        paddingHorizontal: height * 0.02, paddingVertical: height * 0.01
    },
    detailsIcon: {
        backgroundColor: '#fff', borderColor: dark, borderWidth: 1, height: height * 0.08, alignItems: 'center', 
        justifyContent: 'center', width: height * 0.08, borderRadius: height * 0.05
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
        backgroundColor: '#fff', elevation: 4, flexDirection: 'row', alignItems: 'center',
    },
    icon: {
        marginHorizontal: width * 0.02
    },
    iconContainer: {
        width: '15%'
    }
});

export default Vehicles;