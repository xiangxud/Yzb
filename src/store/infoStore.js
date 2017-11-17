/**
 * Created by TomChow on 2017/10/25.
 */
import {observable} from 'mobx'

class InfoStore {
    @observable name = ''

}

infoStore = new InfoStore();
export default infoStore