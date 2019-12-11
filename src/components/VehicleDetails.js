import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import variables from './variables';

var moment = require('moment');

const { height, width } = Dimensions.get('window');

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';


class VehicleDetails extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        vehicle: {},
        driver: {},
        loading: true,
    }

    componentDidMount() {

        const id = this.props.navigation.state.params.vehicle.VehicleDetailId;

        fetch(variables.url + '/api/VehicleInspectionApi/VehicleDriverDetails/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(JSON.parse(responseJson.ResponseObject));
            this.setState({ 
                    driver: JSON.parse(responseJson.ResponseObject).DriverDetail,
                    vehicle: JSON.parse(responseJson.ResponseObject).VehicleDetail, 
                    loading: false 
                });
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

        const { vehicle, driver } = this.state;

        return(

            <View style={{ height: '100%' }}>

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

                <View style={{ padding: height * 0.01, flexDirection: 'row', alignItems: 'center', backgroundColor: dark,
                               paddingHorizontal: height * 0.03, justifyContent: 'space-between', }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcon style={styles.icon} name='person-pin' size={height * 0.04} color={whiteColor} />
                        <Text style={styles.heading}>{vehicle.Contractor}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={this.handleLogout}
                    >
                        <MaterialIcon name='exit-to-app' size={height * 0.04} color={whiteColor} />
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>

                    <View style={{ marginTop: height * 0.01 }}>
                        <Text style={styles.cardText}>Vehicle Details</Text>
                    </View>

                    <View style={styles.detailsCard}>

                        <View style={styles.item}>
                            <Text style={styles.itemHeading}>VRN</Text>
                            <Text style={styles.itemText}>{vehicle.VRN}</Text>
                        </View>

                        <View style={[styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>

                            <View>
                                <Text style={styles.itemHeading}>Type</Text>
                                <Text style={styles.itemText}>{vehicle.VehicleType}</Text>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Text style={styles.itemHeading}>Capacity</Text>
                                <Text style={styles.itemText}>{vehicle.Capacity}</Text>
                            </View>

                        </View>

                        <View style={[styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>

                            <View>
                                <Text style={styles.itemHeading}>Fitness Certificate</Text>
                                <Text style={styles.itemText}>Yes</Text>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Text style={styles.itemHeading}>Validity</Text>
                                <Text style={[styles.itemText, { color: '#5ee527' }]}>Dec 30,2019</Text>
                            </View>

                        </View>

                        <View style={[styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'transparent' }]}>

                            <View>
                                <Text style={styles.itemHeading}>Tax Paid Upto</Text>
                                <Text style={styles.itemText}>Dec 30,2019</Text>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Text style={styles.itemHeading}>EPCL Category</Text>
                                <Text style={styles.itemText}>Employee</Text>
                            </View>

                        </View>

                    </View>

                    <View>
                        <Text style={styles.cardText}>Driver Details</Text>
                    </View>

                    <View style={styles.detailsCard}>

                        <View style={styles.item}>
                            <Text style={styles.itemHeading}>Driver Name</Text>
                            <Text style={styles.itemText}>{driver.DriverName}</Text>
                        </View>

                        <View style={[styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>

                            <View>
                                <Text style={styles.itemHeading}>CNIC</Text>
                                <Text style={styles.itemText}>{driver.DriverNIC}</Text>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Text style={styles.itemHeading}>Validity</Text>
                                <Text style={[styles.itemText, { color: '#5ee527' }]}>{moment(driver.NICValidity).format('LL')}</Text>
                            </View>

                        </View>

                        <View style={[styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'transparent' }]}>

                            <View>
                                <Text style={styles.itemHeading}>License</Text>
                                <Text style={styles.itemText}>{driver.DriverLicenseNo}</Text>
                            </View>

                            <View style={{ width: '35%' }}>
                                <Text style={styles.itemHeading}>Validity</Text>
                                <Text style={[styles.itemText, { color: '#5ee527' }]}>{moment(driver.LicenseValidityDate).format('LL')}</Text>
                            </View>

                        </View>

                    </View>

                    <TouchableOpacity style={styles.button}
                        // onPress={this.handleLogin}
                        onPress={() => this.props.navigation.navigate('questions', { vehicle: this.props.navigation.state.params.vehicle, 
                                                                                    user: this.props.navigation.state.params.user })}
                    >
                        <FontAwesome name='sign-out' size={height * 0.04} color={whiteColor} />
                        <Text style={styles.buttonText}>Proceed</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: height * 0.03, backgroundColor: whiteColor, height: '100%'
    },
    heading: {
        fontFamily: appFont, fontSize: height * 0.034, marginHorizontal: height * 0.01, color: whiteColor
    },
    card: {
        paddingHorizontal: height * 0.02, paddingVertical: height * 0.01, 
    },
    cardText: {
        fontFamily: appFont, color: dark, fontSize: height * 0.026,
    },
    text: {
        fontFamily: appFont,
    },
    Labeltext:{
        paddingRight:22
    },
    button: {
        width: width * 0.7, alignItems: 'center', justifyContent: 'center', elevation: 4, height: height * 0.07, 
        backgroundColor: darker, alignSelf: 'center', flexDirection: 'row', marginTop: height * 0.01
    },
    buttonText: {
        fontFamily: appFont, color: whiteColor, fontSize: height * 0.04, marginHorizontal: width * 0.03
    },
    detailsCard: {
        backgroundColor: '#fff', borderRadius: height * 0.02, marginVertical: height * 0.02
    },
    item: {
        marginHorizontal: height * 0.02, paddingVertical: height * 0.01, borderBottomWidth: 0.2, borderColor: darker
    },
    itemHeading: {
        fontFamily: appFont
    },
    itemText: {
        fontFamily: appFont, color: 'rgba(0,0,0,0.5)', fontSize: height * 0.02
    }
});

export default VehicleDetails;
