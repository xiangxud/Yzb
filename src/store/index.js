import App from './common/app';
import userStore from './userStore';
import homeStore from './homeStore';
import categoryStore from './categoryStore';
import infoStore from './infoStore';
import didiStore from './didiStore';

import styStore from './styStore';
import styAddStore from './styAddStore';
import styEditStore from './styEditStore';

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
    styAddStore,
    styEditStore,

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