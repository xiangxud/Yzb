import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native';

export default class AnooTextInput extends Component {

    constructor(props) {
        super(props);
    }

    onChange = (text)=> {
        this.props.onChange(text.text);
    };

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
        return (
            <View style={[styles.inputContainer, {...this.props.style}]}>
                <Text style={styles.label}>{this.props.label}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.onChange({text})}
                    underlineColorAndroid={'transparent'}
                    placeholder={this.props.placeHolder}
                    placeholderTextColor={'#ccc'}
                    {...this.props.inputProps}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        height:50,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#888',
        flexDirection:'row'
    },
    label: {
        width:70,
        alignSelf:'center',
        color: '#000',
        fontSize: 16,
        paddingLeft:10,
        letterSpacing: 1,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        letterSpacing: 5,
        lineHeight: 18,
        paddingRight:10,
    },

    error: {
        fontFamily: 'OpenSans-Regular',
        backgroundColor: 'transparent',
        color: '#F66A6A'
    }
});