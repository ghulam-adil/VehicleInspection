import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Vehicles from './Vehicles';
import Questions from './Questions';
import Testing from './Testing';
import ImageCapture from './ImageCapture';
import Results from './Results';
import VehicleDetails from './VehicleDetails';

//=============APPSTART=========================
const AppNavigator = createStackNavigator({
        login: { screen: Login },
        vehicles: { screen: Vehicles },
        questions: { screen: Questions },
        testing: { screen: Testing },
        imageCapture: { screen: ImageCapture },
        results: { screen: Results },
        vehicleDetails: { screen: VehicleDetails },
    },
    {
        initialRouteName: 'login'
    }
);

export default createAppContainer(AppNavigator);