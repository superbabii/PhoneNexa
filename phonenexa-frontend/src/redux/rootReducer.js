import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";

const rootPeristConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
}

const rootReducer = combineReducers({
    app: appReducer,
});

export {rootPeristConfig, rootReducer};