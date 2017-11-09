/**
 * Created by TomChow on 2017/10/25.
 */
import {observable, action} from 'mobx'

export default class App {
    @observable barStyle = 'light-content'

    @action
    updateBarStyle = style => {
        this.barStyle = style
    }
}