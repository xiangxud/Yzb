import App from './common/app'
//import navigationStore from './navigationStore'
import userStore from './userStore'
import homeStore from './homeStore'
import infoStore from './infoStore'
import didiStore from './didiStore'
import styStore from './styStore'

export default {
    app: new App(),
    userStore,
    homeStore,
    infoStore,
    didiStore,
    styStore
}