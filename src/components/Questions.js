import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid, BackHandler,
         ScrollView } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import ViewPager from '@react-native-community/viewpager';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import DatePicker from 'react-native-datepicker';

import { Dropdown } from 'react-native-material-dropdown';

import AsyncStorage from '@react-native-community/async-storage';

import CheckBox from 'react-native-check-box';

sortBy = require('lodash').sortBy;

import variables from './variables';

const { height, width } = Dimensions.get('window');

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';

class Questions extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        questions: [
            { question: 'Tyres Status', status: '', type: 'complex', questions: [{ value: 'Front Left' }, { value: 'Front Right' }, { value: 'Rare Left' } , { value: 'Rare Right' }], Functional: false, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Seat Belt', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Vehicle Interior', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Air Condition', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Fire Extinguisher', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'First Aid Kit', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Tool Kit', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Horn', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Head Lights (Beams)', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Back & Brake Lights', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            { question: 'Reverse Light', status: '', type: 'bool', Functional: null, Availability: false, TargetTimeForRectification: '', Remarks: '' },
            // { question: 'Indicators', status: '' },
            // { question: 'Parking Lights', status: '' },
            // { question: 'Mirrors (Side/Rear)', status: '' },
            // { question: 'Windshield Wipers', status: '' },
            // { question: 'Brakes/Hand brake', status: '' },
            // { question: 'Any visible external damage to vehicle', status: '' },
            // { question: 'Engine Condition', status: '' },
            // { question: 'Suspension Condition', status: '' },
            // { question: 'Tires Status', status: '' },
            // { question: 'Spare Wheel', status: '' },
        ],
        visible: false,
        currentPosition: 0,
        // status: false,
        data: [],
        VehicleInspectionDetails: [],
        text: '',
        comment: '',
        textArray: [],
        checkboxArray: [],
        loading: true,
        loading1: false,
        isChecked: false,
    }

    componentDidMount() { 

        console.log('this is user:');
        console.log(this.props.navigation.state.params.user);

        console.log('this is vehicle:');
        console.log(this.props.navigation.state.params.vehicle);

        fetch(variables.url + '/api/VehicleInspectionApi/VehicleInspectionQuestions', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseJson => {

            var ascendingOrder = sortBy( JSON.parse(responseJson.ResponseObject), 'Question' );
            const VehicleInspectionDetails = [];

            ascendingOrder.map(value => {
                VehicleInspectionDetails.push({
                    VehicleInspectionQuestionId: value.ParentQuestion.VehicleInspectioFormDetailId,
                    Availability: null,
                    Functional: null,
                    Remarks: '',
                    TargetTimeForRectification: null
                });
            })

            console.log('this is array');
            console.log(VehicleInspectionDetails);
            console.log(ascendingOrder);
            // console.log(JSON.parse(responseJson.ResponseObject)[0].CT_QuestionInputType.IsBoolean);
            this.setState({ data: ascendingOrder, VehicleInspectionDetails, loading: false });
        })
        .catch(error => {
            console.log(error);
        })

    }

    handleDate = (date, index) => {
        const newArray = [...this.state.VehicleInspectionDetails];
        newArray[index].TargetTimeForRectification = date;

        this.setState({
            VehicleInspectionDetails: newArray
        });

        // const newArray = [...this.state.questions];
        // newArray[index].TargetTimeForRectification = date;

        // this.setState({
        //     questions: newArray
        // });
    }

    handlePress = (value, index, status, isText, isComplex) => {

        if(isText) {

            const newArray = [...this.state.VehicleInspectionDetails];
            newArray[index].Remarks = this.state.text;
            this.setState({ VehicleInspectionDetails: newArray });
            console.log(newArray);

            if(!(this.state.data.length - 1 == this.state.currentPosition))
            {
                this.viewPager.setPage(this.state.currentPosition + 1);
            }

        }
        else if (isComplex) {

            console.log(index);

            var count = index;
            var newArray = [...this.state.VehicleInspectionDetails];
            this.state.textArray.map((value, i) => {                
              
                // newArray[count].Availability = this.state.textArray[i];
                // this.setState({ VehicleInspectionDetails: newArray });
                                
                if(i < this.state.textArray.length){
                    newArray.push(
                        {
                            VehicleInspectionQuestionId: this.state.data[index].childQuestions[i].VehicleInspectioFormDetailId,
                            Availability: value,
                            Functional: null,
                            Remarks: '',
                            TargetTimeForRectification: null
                        }
                    )
                }
                console.log(newArray);
                count = count + 1;
                
            })

            this.setState({ VehicleInspectionDetails: newArray });

        //    console.log(newArray);
            // console.log(this.state.textArray[0]);
            

            // if(!(this.state.data.length - 1 == this.state.currentPosition))
            // {
            //     this.viewPager.setPage(this.state.currentPosition + 1);
            // }
        }
        else {

            const newArray = [...this.state.VehicleInspectionDetails];
            newArray[index].Functional = status;
            this.setState({ VehicleInspectionDetails: newArray });
            console.log(newArray);

            if(newArray[index].TargetTimeForRectification !== null)
            {
                if(!(this.state.data.length - 1 == this.state.currentPosition))
                {
                    this.viewPager.setPage(this.state.currentPosition + 1);
                }
            }
            else if(status == false)
            {
                ToastAndroid.showWithGravity(
                    'Please select rectification date',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }

        // if(isText) {

        //     const newArray = [...this.state.questions];
        //     newArray[index].Remarks = this.state.text;
        //     this.setState({ questions: newArray });
        //     console.log(newArray);

        //     if(!(this.state.questions.length - 1 == this.state.currentPosition))
        //     {
        //         this.viewPager.setPage(this.state.currentPosition + 1);
        //     }

        // }
        // else if (isComplex) {
        //     const newArray = [...this.state.questions];
        //     newArray[index].Remarks = this.state.textArray;
        //     this.setState({ questions: newArray });
        //     console.log(newArray);

        //     if(!(this.state.questions.length - 1 == this.state.currentPosition))
        //     {
        //         this.viewPager.setPage(this.state.currentPosition + 1);
        //     }
        // }
        // else {

        //     const newArray = [...this.state.questions];
        //     newArray[index].Functional = status;
        //     this.setState({ questions: newArray });
        //     console.log(newArray);

        //     if(newArray[index].TargetTimeForRectification !== null)
        //     {
        //         if(!(this.state.questions.length - 1 == this.state.currentPosition))
        //         {
        //             this.viewPager.setPage(this.state.currentPosition + 1);
        //         }
        //     }
        //     else
        //     {
        //         ToastAndroid.showWithGravity(
        //             'Please select rectification date',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.CENTER,
        //         );
        //     }
        // }
        
    }

    finalResults = (index) => {

        this.setState({ loading1: true });

        var count = index;
        var newArray = [...this.state.VehicleInspectionDetails];
        this.state.textArray.map((value, i) => {                
            
            if(i < this.state.textArray.length){
                newArray.push(
                    {
                        VehicleInspectionQuestionId: this.state.data[index].childQuestions[i].VehicleInspectioFormDetailId,
                        Availability: value,
                        Functional: null,
                        Remarks: '',
                        TargetTimeForRectification: null
                    }
                )
            }
            console.log(newArray);
            count = count + 1;
            
        })

        this.setState({ VehicleInspectionDetails: newArray });

        // const newArray = [...this.state.data];
        // newArray[index].Remarks = this.state.textArray;
        // this.setState({ VehicleInspectionDetails: newArray });
        // console.log(newArray);

        setTimeout(() => {

            const dtObj = {
                VehicleId: this.props.navigation.state.params.vehicle.VehicleDetailId,
                UserId: this.props.navigation.state.params.user,
                QuestionsList: this.state.VehicleInspectionDetails
            };
    
            console.log('this is final object');
    
            console.log(dtObj);
    
            fetch(variables.url + '/api/VehicleInspectionApi/VehicleQuestionSubmission', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtObj),
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if(responseJson.IsSuccess)
                {
                    ToastAndroid.showWithGravity(
                        'Data Submitted Successfully',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    this.setState({ loading1: false });
                }
                else
                {
                    this.setState({ loading1: false });
                    ToastAndroid.showWithGravity(
                        'Failed to submit data',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
                // this.props.navigation.navigate('vehicles', { user: responseJson.ResponseObject })
            })
            .catch(error => {
                console.log(error);
            })
            
        }, 2000);

    }

    handleDropdown = (value, index) => {
        console.log(value, index);

        const newArray = [...this.state.VehicleInspectionDetails];

        if(value == 'Available')
        {
            newArray[index].Availability = true;
            this.setState({ VehicleInspectionDetails: newArray });
            console.log(newArray);
        }
        else
        {
            newArray[index].Availability = false;
            this.setState({ VehicleInspectionDetails: newArray });
            console.log(newArray);
        }


        // const newArray = [...this.state.questions];

        // if(value == 'Available')
        // {
        //     newArray[index].Availability = true;
        //     this.setState({ questions: newArray });
        //     console.log(newArray);
        // }
        // else
        // {
        //     newArray[index].Availability = false;
        //     this.setState({ questions: newArray });
        //     console.log(newArray);
        // }

    }
    

    handleTextArray = (text, index, value) => {

        console.log(text, index);
        const myArray = [...this.state.textArray];
        myArray[index] = text;
        this.setState({
            textArray: myArray
        });

        console.log(myArray);

    }

    // handleCheckboxArray = (index) => {

    //     const myArray = [...this.state.checkboxArray];
    //     newArray[index].Functional = !newArray[index].Functional;

    //     this.setState({
    //         checkboxArray: myArray
    //     });
    // }

    handleComment = () => {

        this.setState({ visible: !this.state.visible });

        console.log(this.state.currentPosition);

        const newArray = [...this.state.VehicleInspectionDetails];
        newArray[this.state.currentPosition].Remarks = this.state.comment;
        this.setState({ VehicleInspectionDetails: newArray });
        console.log(newArray);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick = () => {
        // alert('back button pressed!');
        this.setState({ visible: false });
    }

    handleLogout = () => {

        let keys = ['email', 'password', 'user'];
        AsyncStorage.multiRemove(keys, (err) => {
            console.log('Local storage user info removed!');
        });

        this.props.navigation.navigate('login');

    }

    render() {

        let data = [
            {
                value: 'Available',
            }, 
            {
                value: 'Not Available',
            },
        ];

        return(
            <View style={{ justifyContent: 'space-between', flex: 1 }}>

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

                <View>

                    <View style={styles.header}>
                        {/* <Text>{this.props.navigation.state.params.value.vrn}</Text> */}
                        {/* <Button title='skjdhfk' onPress={() => this.viewPager.setPage(2)} /> */}

                        <View>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcon style={styles.icon} name='directions-car' size={26} color={whiteColor} />
                            <Text style={styles.headerText}>{this.props.navigation.state.params.vehicle.VRN}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={this.handleLogout}
                        >
                            <MaterialIcon name='exit-to-app' size={26} color={whiteColor} />
                        </TouchableOpacity>

                    </View>

                    <ViewPager
                        style={{ height: height * 0.79, }}
                        initialPage={0}
                        onPageSelected={(e) => this.setState({ currentPosition: e.nativeEvent.position })}
                        ref={(viewPager) => {this.viewPager = viewPager}}
                    >
                        
                        {
                            this.state.data.map((value, index) => 
                                <ScrollView key={index}>

                                    <View style={styles.questionsContainer}>
                                        <Text style={styles.questionText}>{value.ParentQuestion.Question}</Text>
                                    </View>

                                    {
                                        value.ParentQuestion.CT_QuestionInputType.IsBoolean == true && 

                                        // value.type == 'bool' &&

                                        <View style={{ marginHorizontal: width * 0.05, }}>

                                            <View style={{ width: '100%', }}>

                                                <Dropdown
                                                    label='Select Status'
                                                    data={data}
                                                    // selectedItem={(value) => console.log(value)}
                                                    onChangeText={(value) => this.handleDropdown(value, index)}
                                                    // animationDuration={0}
                                                />

                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', 
                                                            marginVertical: height * 0.05 }}>

                                                <TouchableOpacity style={ (this.state.VehicleInspectionDetails[index].Functional == false && this.state.VehicleInspectionDetails[index].Availability ) ? styles.circularButtonRed : ( this.state.VehicleInspectionDetails[index].Availability == true ? styles.circularButton : styles.circularButton1 ) }
                                                    onPress={() => this.handlePress(value, index, false)}
                                                    disabled={this.state.VehicleInspectionDetails[index].Availability !== true ? true : false}
                                                >
                                                    <MaterialIcon name='close' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={ ( this.state.VehicleInspectionDetails[index].Functional && this.state.VehicleInspectionDetails[index].Availability ) == true ? styles.circularButtonGreen : ( this.state.VehicleInspectionDetails[index].Availability == true ? styles.circularButton : styles.circularButton1 ) }
                                                    onPress={() => this.handlePress(value, index, true)}
                                                    disabled={this.state.VehicleInspectionDetails[index].Availability !== true ? true : false}
                                                >
                                                    <MaterialIcon name='check' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity>



                                                {/* <TouchableOpacity style={this.state.questions[index].Functional == false ? styles.circularButtonRed : styles.circularButton}
                                                    onPress={() => this.handlePress(value, index, false)}
                                                    disabled={this.state.questions[index].Availability !== true ? true : false}
                                                >
                                                    <MaterialIcon name='close' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={this.state.questions[index].Functional == true ? styles.circularButtonGreen : styles.circularButton}
                                                    onPress={() => this.handlePress(value, index, true)}
                                                    disabled={this.state.questions[index].Availability !== true ? true : false}
                                                >
                                                    <MaterialIcon name='check' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity> */}

                                            </View>

                                        </View>

                                    }

                                    {
                                        value.ParentQuestion.CT_QuestionInputType.IsText == true && 

                                        // value.type == 'text' && 

                                        <View style={{ marginHorizontal: width * 0.05 }}>

                                            <View style={styles.feedbackInput}>
                                                <TextInput 
                                                    placeholder='Enter Feedback'
                                                    style={{ width: '80%' }}
                                                    onChangeText={(text) => this.setState({ text })}

                                                    onKeyPress={({ nativeEvent }) => {
                                                        console.log(nativeEvent.key) //do action : //other action
                                                    }}
                                                />
                                                <TouchableOpacity style={styles.arrowButton}
                                                    onPress={() => this.handlePress(value, index, 'pass', true)}
                                                >
                                                    <MaterialIcon name='arrow-forward' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </View>
                                    }

                                    {
                                        value.ParentQuestion.CT_QuestionInputType.IsNum == true && 

                                        // value.type == 'number' && 

                                        <View style={{ marginHorizontal: width * 0.05 }}>

                                            <View style={styles.feedbackInput}>
                                                <TextInput 
                                                    keyboardType='numeric' 
                                                    placeholder='Enter Feedback'
                                                    style={{ width: '80%' }}
                                                    onChangeText={(text) => this.setState({ text })}
                                                />
                                                <TouchableOpacity style={styles.arrowButton}
                                                    onPress={() => this.handlePress(value, index, '', true)}
                                                >
                                                    <MaterialIcon name='arrow-forward' size={height * 0.05} color={whiteColor} />
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </View>
                                    }

                                    <View style={{ marginHorizontal: width * 0.05, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
                                                    justifyContent: 'space-between' }} 
                                    >

                                    {
                                        // value.CT_QuestionInputType.IsNum == true && 

                                        value.ParentQuestion.CT_QuestionInputType.QuestionInputType == 'Complex' &&                                         

                                            value.childQuestions.map((value1, index) => 

                                            <View>

                                            {
                                                value1.CT_QuestionInputType.IsNum == true && 

                                                <View 
                                                    style={styles.feedbackInput}
                                                    key={index}
                                                >
                                                    <TextInput 
                                                        keyboardType='numeric' 
                                                        placeholder={value1.Question}
                                                        style={{ width: '100%' }}
                                                        onChangeText={(text) => this.handleTextArray(text, index, value1.Question)}
                                                        maxLength={10}
                                                    />
                                                    {/* <TouchableOpacity style={styles.arrowButton}
                                                        onPress={() => this.handlePress(value, index, '', true)}
                                                    >
                                                        <MaterialIcon name='arrow-forward' size={height * 0.05} color={whiteColor} />
                                                    </TouchableOpacity> */}
                                                </View>

                                            }

                                            {

                                                value1.CT_QuestionInputType.IsText == true && 

                                                <View 
                                                    style={styles.feedbackInput}
                                                    key={index}
                                                >
                                                    <TextInput 
                                                        placeholder={value1.Question}
                                                        style={{ width: '100%' }}
                                                        onChangeText={(text) => this.handleTextArray(text, index, value1.Question)}
                                                        maxLength={10}
                                                    />
                                                    {/* <TouchableOpacity style={styles.arrowButton}
                                                        onPress={() => this.handlePress(value, index, '', true)}
                                                    >
                                                        <MaterialIcon name='arrow-forward' size={height * 0.05} color={whiteColor} />
                                                    </TouchableOpacity> */}
                                                </View>

                                            }

                                            {

                                                value1.CT_QuestionInputType.IsBoolean == true && 
                                                
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {/* <CheckBox
                                                        onClick={(value) => this.handleTextArray(value, index, value1.Question)}
                                                        isChecked={this.state.isChecked}
                                                        checkBoxColor={dark}
                                                    /> */}

                                                    <View style={{ width: '100%', }}>

                                                        <Dropdown
                                                            label={value1.Question}
                                                            data={
                                                                [
                                                                    {
                                                                        value: 'true',
                                                                    }, 
                                                                    {
                                                                        value: 'false',
                                                                    },
                                                                ]
                                                            }
                                                            onChangeText={(value) => this.handleTextArray(value, index, value1.Question)}
                                                        />

                                                    </View>

                                                    {/* <Text style={{ fontFamily: appFont }}>{value1.Question}</Text> */}
                                                </View> 

                                            }

                                            </View>
                                                
                                        )

                                    }

                                    </View>

                                    {
                                        (this.state.VehicleInspectionDetails[index].Functional == false && 
                                            this.state.VehicleInspectionDetails[index].Availability !== false) &&

                                        <View style={{ marginHorizontal: width * 0.05, marginTop: height * 0.02 }}>

                                            <DatePicker
                                                style={{ width: '100%', backgroundColor: dark, }}
                                                date={this.state.VehicleInspectionDetails[index].TargetTimeForRectification}
                                                // date={this.state.questions[index].TargetTimeForRectification}
                                                mode="date"
                                                placeholder="Rectification Date"
                                                format="YYYY-MM-DD"
                                                customStyles={{
                                                    dateInput: { 
                                                        borderWidth: 0,
                                                    },
                                                    placeholderText: {
                                                        color: whiteColor
                                                    },
                                                    dateText: {
                                                        color: whiteColor,
                                                    },
                                                }}
                                                onDateChange={(date) => this.handleDate(date, index) }
                                                iconComponent={
                                                    <MaterialIcon name='date-range' size={height * 0.05} color={whiteColor} style={{ marginRight: width * 0.02 }} />
                                                }
                                                // showIcon={false}
                                            />

                                        </View>
                                    }


                                    {
                                        // value.ParentQuestion.CT_QuestionInputType.QuestionInputType == 'Complex' && 

                                        // <TouchableOpacity style={styles.doneButton}
                                        //     onPress={() => this.handlePress(value, index, '', false, true)}
                                        // >
                                        //     {/* <MaterialIcon name='exit-to-app' size={26} color={whiteColor} /> */}
                                        //     <Text style={styles.doneButtonText}>Next</Text>
                                        // </TouchableOpacity>
                                    }

                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                onClick={() => this.handleCheckbox(index)}
                                                isChecked={this.state.VehicleInspectionDetails[index].Functional}
                                                checkBoxColor={dark}
                                            />

                                            <Text style={{ fontFamily: appFont }}>Is Functional?</Text>
                                        </View> */}

                                    {
                                        this.state.data.length - 1 == this.state.currentPosition && 

                                        <TouchableOpacity style={styles.doneButton}
                                            onPress={() => this.finalResults(index)}
                                        >
                                            {/* <MaterialIcon name='exit-to-app' size={26} color={whiteColor} /> */}
                                            <Text style={styles.doneButtonText}>Done</Text>
                                        </TouchableOpacity>
                                    }

                                    {
                                        this.state.loading1 && 

                                        <ActivityIndicator 
                                            color={dark}
                                            size='large'
                                        />

                                    }

                                </ScrollView>
                            )
                        }

                    </ViewPager>

                </View>

                <View style={styles.buttonRow}>

                    <TouchableOpacity style={styles.button}
                        onPress={() => this.setState({ visible: !this.state.visible })}
                    >
                        <MaterialIcon name='insert-comment' size={height * 0.06} color={dark} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', margin: 2 }}>
                    {
                        this.state.data.map((value, index) => 
                            <View key={index} style={this.state.currentPosition == index ? styles.dash1 : styles.dash} />
                        )
                    }
                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('imageCapture')}
                    >
                        <MaterialIcon name='photo-camera' size={height * 0.06} color={dark} />
                    </TouchableOpacity>

                </View>

                <Dialog
                    visible={this.state.visible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                        <View style={{ height: height * 0.2, width: width * 0.85, paddingTop: height * 0.02 }}>

                        <View>
                            <Text style={styles.text}>Enter your comment here</Text>
                        </View>

                        <View style={{ elevation: 1, backgroundColor: whiteColor, marginVertical: height * 0.01 }}>
                            <TextInput 
                                style={{ width: '90%' }} 
                                onChangeText={(comment) => this.setState({ comment })}
                            />
                        </View>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                onPress={() => this.setState({ visible: !this.state.visible })}
                            >
                                <Text style={styles.modalText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.handleComment()}
                            >
                                <Text style={styles.modalText}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                    </DialogContent>
                </Dialog>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: height * 0.02, backgroundColor: dark, 
    },
    headerText: {
        fontFamily: appFont, fontSize: height * 0.03, marginHorizontal: width * 0.02, color: whiteColor
    },
    questionsContainer: {
        alignItems: 'center', justifyContent: 'center', marginVertical: height * 0.04, marginHorizontal: width * 0.05,
    },
    questionText: {
        fontFamily: appFont, fontSize: height * 0.06, color: dark
    },
    button: {
        alignItems: 'center', justifyContent: 'center',
    },
    buttonRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    buttonsContainer: {
        height: height * 0.5, justifyContent: 'center'
    },
    nextButton: {
        width: width * 0.6, padding: height * 0.02, alignItems: 'center', justifyContent: 'center', elevation: 4,
        marginVertical: height * 0.05, backgroundColor: darker, alignSelf: 'center', flexDirection: 'row'
    },
    nextButtonText: {
        fontFamily: appFont, color: whiteColor, fontSize: height * 0.03, marginHorizontal: width * 0.03
    },
    circularButton: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', height: height * 0.12, width: height * 0.12,
        borderRadius: height * 0.06, elevation: 6, opacity: 1
    },
    circularButton1: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', height: height * 0.12, width: height * 0.12,
        borderRadius: height * 0.06, elevation: 6, opacity: 0.5
    },
    circularButtonGreen: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#5ee527', height: height * 0.12, width: height * 0.12,
        borderRadius: height * 0.06, elevation: 6
    },
    circularButtonRed: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', height: height * 0.12, width: height * 0.12,
        borderRadius: height * 0.06, elevation: 6
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
    text: {
        fontFamily: appFont, fontSize: height * 0.03
    },
    modalText: {
        color: dark, fontFamily: appFont, fontSize: height * 0.03, marginHorizontal: width * 0.04
    },
    modalFooter: {
        flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginVertical: height * 0.02
    },
    dash: {
        backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, margin: 2, borderColor: dark, borderWidth: 1
    },
    dash1: {
        backgroundColor: dark, width: 8, height: 8, borderRadius: 4, margin: 2
    },
    doneButton: {
        width: width * 0.3, alignItems: 'center', justifyContent: 'center', elevation: 4, marginTop: height * 0.02,
        height: height * 0.08, backgroundColor: darker, alignSelf: 'center', flexDirection: 'row'
    },
    doneButtonText: {
        fontFamily: appFont, color: whiteColor, fontSize: height * 0.04, marginHorizontal: width * 0.03
    },
    feedbackInput: {
        elevation: 4, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        marginVertical: height * 0.01
    },
    arrowButton: {
        backgroundColor: dark, padding: height * 0.02,
    },
    checkboxContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    }
});

export default Questions;