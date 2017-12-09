import App from './common/app'
import userStore from './userStore'
import homeStore from './homeStore'
import infoStore from './infoStore'
import didiStore from './didiStore'
import styStore from './styStore'
import immStore from './immStore'
import addStyStore from './addStyStore'
import editStyStore from './editStyStore'
import bohaiStore from './bohaiStore'
import outPetStore from './outPetStore'

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
    outPetStore
}