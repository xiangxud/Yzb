import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    LayoutAnimation,
    StatusBar} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import LoginSteps from './LoginSteps';
import {NavigationActions} from 'react-navigation';
import { inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';

const stepsTitles = {
    1: 'SIGN IN',
    2: "LET'S GET YOU STARTED"
};

@inject('userStore')
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            step: 0,
            pillButtonText: 'GET STARTED',
            pillButtonWidth: 225,
            signText: 'SIGN IN',
            signDescription: 'Already have an Anoo account?',
            loginErrors: {},
            showSpinner: false
        };
    }

    static navigationOptions = {
        header: null
    };

    renderEndText() {
        if (this.state.step <= 1) {
            return (
                <View style={styles.endText}>
                    <Text style={styles.softText}>{this.state.signDescription}</Text>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            Animated.timing(
                                this.state.animValue,
                                {
                                    toValue: 1,
                                    duration: 200,
                                    useNativeDriver: true,
                                    easing: Easing.inOut(Easing.quad)
                                }
                            ).start();
                            LayoutAnimation.easeInEaseOut();

                            let nextStep, nextSignText;
                            switch (this.state.signText) {
                                case 'SIGN IN':
                                    nextStep = 1;
                                    nextSignText = 'SIGN UP';
                                    break;
                                case 'SIGN UP':
                                    nextStep = 2;
                                    nextSignText = 'SIGN IN';
                                    break;
                                default:
                                    nextStep = 1;
                                    nextSignText = 'SIGN IN';
                            }
                            this.setState({
                                step: nextStep,
                                pillButtonText: 'GO TO DASHBOARD',
                                pillButtonWidth: 300,
                                signText: nextSignText,
                                signDescription: "Don't have an Anoo account?"
                            });
                        }}>
                        <View>
                            <Text style={styles.signIn}>{this.state.signText}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    renderBackArrow() {
        if (this.state.step > 0) {
            return (
                <TouchableWithoutFeedback onPress={()=>{
                    this.setState({step: this.state.step-1});
                }}>
                    <Icon style={styles.backArrow} name="keyboard-backspace" size={30} color="#fff" />
                </TouchableWithoutFeedback>
            )
        }
    }

    render() {
        let globeYPosition = this.state.step === 2 ? -180 : 0;
        const positionAnim = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, globeYPosition]
        });

        const scaleAnim = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.7]
        });

        const signInOpacity = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const { navigate } = this.props.navigation;

        const title = stepsTitles[this.state.step];

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'green'}
                    translucent
                    barStyle={'light-content'}
                />
                <View style={styles.body}>
                    {this.renderBackArrow()}
                    <Spinner
                        style={styles.spinner}
                        isVisible={this.state.showSpinner}
                        size={100}
                        type={'ThreeBounce'}
                        color={'#fff'}/>
                    <Animated.View style={[styles.logoContainer, {transform: [{translateY: positionAnim}]}]}>
                        <Animated.Image
                            style={{alignSelf: 'center', transform: [{scale: scaleAnim}]}}
                            source={require('../resource/bg_screen_1.jpg')}/>
                        <Animated.Text style={[styles.signIn, {opacity: signInOpacity}]}>
                            {title}
                        </Animated.Text>
                    </Animated.View>
                    <LoginSteps step={this.state.step} errors={this.state.loginErrors}/>
                    <TouchableOpacity onPress={() => {

                        if (this.state.step === 0) {
                            Animated.timing(
                                this.state.animValue,
                                {
                                    toValue: 1,
                                    duration: 200,
                                    useNativeDriver: true,
                                    easing: Easing.inOut(Easing.quad)
                                }
                            ).start();
                            LayoutAnimation.easeInEaseOut();
                            this.setState({step: 2, pillButtonText: 'NEXT'});
                        }
                        else if (this.state.step === 1) {
                            this.setState({showSpinner: true});
                            this.props.userStore.login().then((resp)=>{
                                console.log(`resp is ${JSON.stringify(resp)}`);
                                this.setState({showSpinner: false});
                                let bodyObj = JSON.parse(resp._bodyText);
                                if (resp.status !== 200) {
                                    console.log('Error calling login '+resp._bodyText+' for user: '+JSON.stringify(this.props.userStore.user));

                                    if (bodyObj.error === 'No such user') {
                                        this.setState({loginErrors: {email:bodyObj.error}})
                                    }
                                    else {
                                        console.log(`Unknown error ${bodyObj.error}`);
                                    }

                                }
                                else {
                                    this.props.userStore.setUserField('token', bodyObj.token);
                                    let resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                                        ]
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                }
                            })
                        }
                        else if (this.state.step === 2) {
                            this.setState({showSpinner: true});
                            this.props.userStore.register().then(()=>{
                                this.setState({showSpinner: false});
                                let resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            });
                        }

                    }}>
                        <View style={[styles.roundedButton, {width: this.state.pillButtonWidth}]}>
                            <Text style={styles.buttonText}>{this.state.pillButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.renderEndText()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#888',
        paddingBottom: 20
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    backArrow: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 30,
        alignSelf: 'flex-start',
        left: 16
    },
    logo: {
        height: 65,
        width: 65,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // position: 'absolute'
    },
    endText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50
    },
    signIn: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        width: 260,
        textAlign: 'center',
        letterSpacing :1
    },
    softText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        lineHeight: 28,
        opacity: 0.5
    },
    roundedButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText: {
        color: '#167173',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 1
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }

});