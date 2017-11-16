import {AsyncStorage} from "react-native";
import {create, persist} from "mobx-persist";

const hydrate = create({
    storage: AsyncStorage,   // or AsyncStorage in react-native.
    jsonify: true  // if you use AsyncStorage, here shoud be true
});

export default hydrate;
