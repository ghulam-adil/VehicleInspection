import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ToastAndroid, ScrollView, 
        ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import variables from './variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';

class Login extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        showPassword: true,
        email: '',
        password: '',
        loading: false,
    };


    componentDidMount() {
        //this.handleLogin();
        this.autoLogin();
    }

    autoLogin = () => {

        AsyncStorage.multiGet(['email', 'password', 'user']).then((data) => {

            console.log(data);
            let email = data[0][1];
            let password = data[1][1];
            let user = data[2][1];

            if (email !== null) {

                this.props.navigation.navigate('vehicles', { user });
                
            }
            
        });

    }

    handleLogin = () => {
        console.log(variables.url);
        console.log(this.state.email);
        console.log(this.state.password);

        this.setState({ loading: true });

        if(this.state.email !== '' && this.state.password !== '')
        {
            // if(this.state.email == 'inspector@epcl.com' && this.state.password == '12345678')
            // {
            //     this.props.navigation.navigate('vehicles', { user: 62261 })
            // }
            // else
            // {
            //     // this.setState({ loading: false });
            //     ToastAndroid.showWithGravity(
            //         'Wrong Credentials',
            //         ToastAndroid.SHORT,
            //         ToastAndroid.CENTER,
            //     );
            // }

            fetch(variables.url + '/api/LoginApi/Login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: this.state.email,
                    UserPassword: this.state.password,
                }),
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({ loading: false });

                if(responseJson.IsSuccess)
                {
                    AsyncStorage.multiSet([
                        ["email", this.state.email],
                        ["password", this.state.password],
                        ["user", responseJson.ResponseObject.UserId.toString()]
                    ])
                    this.props.navigation.navigate('vehicles', { user: responseJson.ResponseObject.UserId.toString() })
                }
                else
                {
                    // this.setState({ loading: false });
                    ToastAndroid.showWithGravity(
                        'Wrong Credentials',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
                
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
        }
        else
        {
            this.setState({ loading: false });
            ToastAndroid.showWithGravity(
                'Please fill all the fields',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    }

    render() {
        return (

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

                <ScrollView style={styles.container}
                    keyboardShouldPersistTaps='always'
                >

                    <View style={styles.logoContainer}>
                        {/* <Text style={styles.heading}>RMS</Text> */}
                        <Image source={require('../assets/logo.png') } style={styles.logo} />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon style={styles.icon} name='person' size={26} color={dark} />
                            </View>
                            <TextInput
                                placeholder='Email'
                                style={{ width: '70%' }}
                                placeholderTextColor={dark1}
                                onChangeText={(email) => this.setState({ email: email.toLowerCase() }) }
                            />
                        </View>

                        <View style={styles.input}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon style={styles.icon} name='lock' size={26} color={dark} />
                            </View>
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={this.state.showPassword}
                                style={{ width: '70%', }}
                                placeholderTextColor={dark1}
                                onChangeText={(password) => this.setState({ password })}
                            />

                            <TouchableOpacity
                                style={{ marginLeft: screenWidth * 0.05 }}
                                onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                            >
                                <FontAwesome5 name={this.state.showPassword ? 'eye-slash' : 'eye'} size={24} color={dark} />
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={styles.loginButton}
                            onPress={this.handleLogin}
                        >
                            <MaterialIcon name='exit-to-app' size={screenHeight * 0.04} color={whiteColor} />
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: '70%', width: '70%'
    },
    logoContainer: {
        height: screenHeight * 0.14, marginVertical: screenHeight * 0.06, alignItems: 'center', justifyContent: 'center'
    },
    container: {
        backgroundColor: whiteColor, height: '100%',
    },
    heading: {
        fontFamily: appFont, color: whiteColor, fontSize: screenHeight * 0.05,
    },
    inputContainer: {
        alignSelf: 'center', 
    },
    input: {
        backgroundColor: '#fff', width: screenWidth * 0.9, marginVertical: screenHeight * 0.03, elevation: 4, flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        color: dark, fontFamily: appFont, width: '85%', backgroundColor: 'orange'
    },
    loginButton: {
        width: screenWidth * 0.7, alignItems: 'center', justifyContent: 'center', elevation: 4,
        marginVertical: screenHeight * 0.05, height: screenHeight * 0.08, backgroundColor: darker, alignSelf: 'center',
        flexDirection: 'row'
    },
    loginText: {
        fontFamily: appFont, color: whiteColor, fontSize: screenHeight * 0.04, marginHorizontal: screenWidth * 0.03
    },
    icon: {
        marginHorizontal: screenWidth * 0.02
    },
    iconContainer: {
        width: '12%'
    }
});

export default Login;