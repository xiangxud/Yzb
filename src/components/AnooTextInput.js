import React, {Component} from 'react';
import {
    View,
    TextInput,
    Animated,
    Easing,
    Platform,
    Text,
    StyleSheet
} from 'react-native';

export default class AnooTextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animValue: props.inputProps.value ? new Animated.Value(1) : new Animated.Value(0)
        }
    }

    onChange = (text)=> {
        if (text.text.length === 1) {
            Animated.timing(
                this.state.animValue,
                {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.inOut(Easing.quad)// Make it take a while
                }
            ).start();
        }

        if (text.text.length === 0) {
            Animated.timing(
                this.state.animValue,
                {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.inOut(Easing.quad)// Make it take a while
                }
            ).start();
        }

        this.props.onChange(text.text);

    };

    componentDidMount() {

    }

    renderErrorText() {
        if (this.props.errorText) {
            console.log(`rendering error text ${this.props.errorText}`);
            return (
                <Text style={styles.error}>
                    {this.props.errorText}
                </Text>
            )
        }
    }

    render() {

        let positionAnimY, positionAnimX;

        if (Platform.OS === 'ios') {
            positionAnimY = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-5, -35]
            });
            positionAnimX = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -12]
            });
        }
        else if (Platform.OS === 'android') {
            positionAnimY = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [3, -35]
            });
            positionAnimX = this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [5, -5]
            });
        }

        const scaleAnim = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8]
        });

        return (
            <View
                style={[styles.inputContainer, {...this.props.style}]}
            >

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.onChange({text})}
                    underlineColorAndroid={'transparent'}
                    {...this.props.inputProps}
                />
                <Animated.Text
                    style={[styles.text,
                        {
                            transform: [{translateY: positionAnimY},
                                {translateX: positionAnimX},
                                {scale: scaleAnim}
                            ]
                        }
                    ]
                    }
                >
                    {this.props.placeHolder}
                </Animated.Text>
                {this.renderErrorText()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        opacity: 0.5,
        backgroundColor: 'transparent',

        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: 10,
        letterSpacing: 1
    },
    input: {
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        width: 350,
        fontSize: 18,
        color: '#fff',
        letterSpacing: 5,
        lineHeight: 18
    },
    inputContainer: {
        marginTop: 25
    },
    error: {
        fontFamily: 'OpenSans-Regular',
        backgroundColor: 'transparent',
        color: '#F66A6A'
    }
});