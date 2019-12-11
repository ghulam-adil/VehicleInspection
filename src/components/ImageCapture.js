import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#F3F3F3';
const dark = '#448B68';
const darker = '#22252E';
const dark1 = '#787C7D';

const appFont = 'TitilliumWeb-Bold';


class ImageCapture extends Component {

    static navigationOptions = {
        header: null
    }

    // componentDidMount(){
    //   const data = this.props.navigation.state.params.data;

    //   console.log(data);

    // }

  render() {
    return (
      <View style={styles.container}>

          <View style={styles.header}>

            <TouchableOpacity style={styles.leftContainer}
              onPress={() => this.props.navigation.goBack()}
            >
                <MaterialIcon name='arrow-back' size={screenHeight * 0.06} color='#aaa' />
            </TouchableOpacity>

            <View>
                <Text style={styles.headerText}>Take Picture</Text>
            </View>

            <View>
                {/* <MaterialIcon name='check' size={screenHeight * 0.06} color={whiteColor} /> */}
            </View>

        </View>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        
        <View style={styles.footer}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                <MaterialIcon name='photo-camera' size={screenHeight * 0.06} color={whiteColor} />
            </TouchableOpacity>
        </View>

      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      // this.props.navigation.navigate('finalScreen', { image: data.uri, data: this.props.navigation.state.params.data });
    }
  };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', flex: 1
    },
    preview: {
        height: '100%',
    },
    capture: {
        backgroundColor: dark, padding: screenHeight * 0.02, alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
    },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.5)', top: 0, right: 0,
        left: 0, position: 'absolute', elevation: 4, zIndex: 1,
    },
    headerText: {
        fontSize: screenHeight * 0.024, color: whiteColor
    },
    leftContainer: {
        alignItems: 'center', justifyContent: 'center', padding: screenHeight * 0.01,
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, right: 0, left: 0,
    }
});


export default ImageCapture;