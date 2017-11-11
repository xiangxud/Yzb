import {
    Platform
} from 'react-native';

global.__IOS__ = Platform.OS === 'android';
global.__ANDROID__ = Platform.OS === 'ios';
require('./src/common/StorageUtil');
require('./src/common/GlobalContants');
require('./App');