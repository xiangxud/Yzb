import App from './common/app'
//import navigationStore from './navigationStore'
import userStore from './userStore'
import homeStore from './homeStore'
import infoStore from './infoStore'
import didiStore from './didiStore'
import styStore from './styStore'
import immStore from './immStore'
import addStyStore from './addStyStore'
import editStyStore from './editStyStore'
import bohaiStore from './bohaiStore'
import immFilterStore from './immFilterStore'

export default {
    app: new App(),
    userStore,
    homeStore,
    infoStore,
    didiStore,
    styStore,
    addStyStore,
    editStyStore,
    immStore,
    bohaiStore,
    immFilterStore
}