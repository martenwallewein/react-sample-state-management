import { combineTypes } from "../Util/CombineTypes";
import { userModule } from "./Modules/UserModule";
import { languageModule } from "./Modules/LanguageModule";

let emptyAppActions = {
 
};
const appActions = {
    ...combineTypes(emptyAppActions, languageModule.actions),
    ...combineTypes(emptyAppActions, userModule.actions),
};

export type IApplicationActions = typeof appActions;

let emptyAppState = {
 
};
// console.log(languageModule);
const defaultAppState = {
    ...combineTypes(emptyAppState, userModule.defaultState),
    ...combineTypes(emptyAppState, languageModule.defaultState),
};

export type IApplicationState = typeof defaultAppState;

const initialAppState: IApplicationState = (window as any).__initialState || defaultAppState;

const getInitialAppState = () => initialAppState;

export {
    defaultAppState,
    initialAppState,
    getInitialAppState,
    appActions,
}