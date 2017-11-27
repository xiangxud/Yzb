import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class styStore {
    list = [
        {"code": "001", "title": '生猪-东-01'},
        {"code": "002", "title": '生猪-东-02'},
        {"code": "003", "title": '生猪-东-03'},
        {"code": "004", "title": '生猪-东-04'},
        {"code": "005", "title": '生猪-东-05'},
        {"code": "006", "title": '生猪-东-06'},
        {"code": "007", "title": '生猪-东-07'},
        {"code": "008", "title": '生猪-东-08'},
        {"code": "009", "title": '生猪-东-09'}];
// list =
// [{"name": "Rex", "age": 30},
// {"name": "Mary", "age": 25},
// {"name": "John", "age": 41},
// {"name": "Jim", "age": 22},
// {"name": "Susan", "age": 52},
// {"name": "Brent", "age": 33},
// {"name": "Alex", "age": 16},
// {"name": "Ian", "age": 20},
// {"name": "Phil", "age": 24}]
}
styStore = new styStore();

export default styStore;