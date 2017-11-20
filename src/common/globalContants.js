/**
 * Created by TomChow on 2017/10/25.
 */
import { Dimensions, Platform, PixelRatio } from 'react-native'
import config from "./config";
import urls from "./urls";
import request from "./request";
import theme from "./theme";
import _ from "lodash";
import tools from "./tools";

global.__IOS__ = Platform.OS === 'android';
global.__ANDROID__ = Platform.OS === 'ios';

global.config = config;
global.urls = urls;
global.request = request;
global.theme = theme;
global._ = _;
global.tools = tools;
