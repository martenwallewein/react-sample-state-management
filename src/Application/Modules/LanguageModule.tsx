
import { getInitialAppState } from "../AppState";
import { ActionResult, GetStateFunc } from "../Types/StateTypes";
import { IModule } from "./IModule";

const LANG_KEY = 'ls_lang';

const defaultLang = localStorage.getItem(LANG_KEY);

export interface ILanguage {
    id: number;
    fullName: string;
    langCode: string;
    langId: string;
    iconSrc: string;
    disabled: boolean;
    permaLink: string;
}


const languages: ILanguage[] = [
    {
        fullName: "English",
        disabled: false,
        langCode: "en_US",
        langId: "en_US",
        permaLink: "en",
        id: 1,
        iconSrc: "/",
    },
    {
        fullName: "German",
        disabled: false,
        langCode: "de_DE",
        langId: "de_DE",
        permaLink: "de",
        id: 2,
        iconSrc: "/",
    }
];

export interface ILangApplicationState {
    availableLanguages: ILanguage[];
    currentLanguage: ILanguage;
    translations: { [key: string]: string}
}

const langTranslations = {
    "de_DE": {
        username: "Nutzer",
        password: "Kennwort",
        keepmeloggedin: "Eingeloggt bleiben",
        forgotpassword: "Kennwort vergessen",
        signin: "Anmelden"
    },
    "en_US": {
        username: "Username",
        password: "Password",
        keepmeloggedin: "Keep me logged in",
        forgotpassword: "Forgot password",
        signin: "Sign in"
    }
    
}

export const defaultLangApplicationState: ILangApplicationState = {
    availableLanguages: languages,
    currentLanguage: languages.find(l => l.langId === defaultLang) || languages[0],
    translations: langTranslations[defaultLang as keyof typeof langTranslations] || langTranslations['en_US'], 

}

export async function setLanguageById(langId: string, getState: GetStateFunc<ILangApplicationState> = getInitialAppState): ActionResult<ILangApplicationState>  {
    const state = getState();
    const newLang = state.availableLanguages.find(l => l.langId === langId);
    if(newLang) {
        localStorage.setItem(LANG_KEY, langId);
        return {
            currentLanguage: newLang,
            translations: langTranslations[langId as keyof typeof langTranslations]
        }
    }

    return {};
}

const languageActions = {
    setLanguageById,
}

export const languageModule: IModule<ILangApplicationState, typeof languageActions> = {
    actions: languageActions,
    defaultState: defaultLangApplicationState,
}