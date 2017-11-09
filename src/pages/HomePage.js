/**
 * Created by TomChow on 17/11/8.
 */
import React, { Component } from 'react'
import { Image } from 'react-native'

export default class HomePage extends Component {
    componentDidMount() {
        const { navigator } = this.props
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Image
                style={{width: gScreen.width, height: gScreen.height}}
                source={require('../resource/img_intro_4.png')}
            />
        )
    }
}