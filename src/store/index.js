import App from './common/app'
//import navigationStore from './navigationStore'
import userStore from './userStore'
import homeStore from './homeStore'
import infoStore from './infoStore'
import didiStore from './didiStore'
import styStore from './styStore'
import addStyStore from './addStyStore'
import bohaiStore from './bohaiStore'

export default {
    app: new App(),
    userStore,
    homeStore,
    infoStore,
    didiStore,
    styStore,
    addStyStore,
    bohaiStore,
}