import {observable, action, computed, toJS} from 'mobx'
import RootNavigator from '../common/RootNavigator'
import { NavigationActions } from 'react-navigation'

class NavigationStore {
    @observable navigationState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Login'))

    @action dispatch = (event) => {
        this.navigationState = RootNavigator.router.getStateForAction(event, this.navigationState)
    }

    @computed get config() {
        return {
            state: toJS(this.navigationState),
            dispatch: this.dispatch
        }
    }

    navigate(routeName) {
        this.dispatch(NavigationActions.navigate({routeName}))
    }
}

navigationStore = new NavigationStore();
export default navigationStore;