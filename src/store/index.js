import App from './common/app';
import userStore from './userStore';
import homeStore from './homeStore';
import categoryStore from './categoryStore';
import infoStore from './infoStore';
import didiStore from './didiStore';
import styStore from './styStore';
import addStyStore from './addStyStore';
import editStyStore from './editStyStore';
import {CameraEditStore, CameraStore} from './cameraStore';
import bohaiStore from './bohaiStore';
import addFarmStore from './addFarmStore';
import outPetStore from './outPetStore';
import inPetStore from './inPetStore';
import sensorHistoryStore from './sensorHistoryStore';
import liveStore from './liveStore';
import myCollectionStore from './myCollectionStore';
import styReportStore from './styReportStore';

export default {
    app: new App(),
    userStore,
    homeStore,
    categoryStore,
    infoStore,
    didiStore,
    styStore,
    addStyStore,
    editStyStore,
    cameraStore: new CameraStore(),
    cameraEditStore: new CameraEditStore(),
    bohaiStore,
    addFarmStore,
    outPetStore,
    inPetStore,
    sensorHistoryStore,
    liveStore,
    myCollectionStore,
    styReportStore
}