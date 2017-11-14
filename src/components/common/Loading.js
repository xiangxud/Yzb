import React from 'react'
import { ActivityIndicator } from 'react-native'

export default (loading: boolean, style: ActivityIndicator.style) => () =>
    loading ? <ActivityIndicator size='large' color='#388e3c' style={style} /> : null