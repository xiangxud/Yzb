import App from './common/app'
import userStore from './userStore'
import homeStore from './homeStore'
import infoStore from './infoStore'
import didiStore from './didiStore'
import styStore from './styStore'
import addStyStore from './addStyStore'
import editStyStore from './editStyStore'
import bohaiStore from './bohaiStore'
import outPetStore from './outPetStore'
import inPetStore from './inPetStore'
import sensorHistoryStore from './sensorHistoryStore'
import liveStore from './liveStore'
import myCollectionStore from './myCollectionStore'

export default {
    app: new App(),
    userStore,
    homeStore,
    infoStore,
    didiStore,
    styStore,
    addStyStore,
    editStyStore,
    bohaiStore,
    outPetStore,
    inPetStore,
    sensorHistoryStore,
    liveStore,
    myCollectionStore
}