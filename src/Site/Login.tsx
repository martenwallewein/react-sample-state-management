import React, { useState, useEffect } from 'react';
import { useActions } from '../Application/Hooks/useActions';
import { useAppState } from '../Application/Hooks/useAppState';

export const Login = () => {

    const [loginState, setLoginState] = useState('PENDING');
    const { login } = useActions();
    const [fields, setFields] = useState({
        userName: '',
        password: '',
        keepMeLoggedIn: false,
    });

    const onChange = (key: string, value: any) => {
        setFields({
            ...fields,
            [key]: value,
        });
    }

    const loginImpl = async () => {
        try {
            setLoginState('LOGGINGIN');
            await login(fields.userName, fields.password, fields.keepMeLoggedIn);
            setLoginState('DONE');
        } catch(e) {
            console.error(e);
            setLoginState('ERROR');
        }        
    }; 

    const { lang, languages, translate } = useAppState(state => {
        return {
            languages: state.availableLanguages,
            lang: state.currentLanguage,
            translate: state.translations,
        };
    });
    const { setLanguageById } = useActions();
    const otherLang = languages.find(l => l.langId !== lang.langId);


    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full max-w-md">
                    
                {
                    loginState === "LOGGINGIN" ? [
                        <div className="bg-white shadow-lg rounded px-10 pt-8 pb-8 mb-4 flex flex-col items-center justify-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-16 w-16" style={{borderTopColor: '#3498db'}}></div>,
                        <p className="font-bold text-2xl text-gray-600 text-center mb-8">Processing secure login...</p>
                        </div>
                    ]
                    : 
                [
                <div className="bg-white shadow-lg rounded px-10 pt-8 pb-8 mb-4">
                    <h1 className="font-bold text-2xl text-gray-600 text-center mb-8">React Statemanagement Sample</h1>
                    <p className="pt-8">Lang: {lang.fullName}</p>
                    <button style={{fontSize: 16}} className="bg-blue-500 hover:bg-blue-700 mt-2 mb-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setLanguageById(otherLang!.langId)}>Change</button>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username">
                        {translate.username}
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Admin" 
                            onChange={e => onChange('userName', e.target.value)}
                            value={fields.userName}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                        {translate.password}
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" 
                            onChange={e => onChange('password', e.target.value)}
                            value={fields.password}
                        />
                    </div>
                    <div className=" mb-3">
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" 
                            checked={fields.keepMeLoggedIn}
                            onChange={e => onChange('keepMeLoggedIn', e.target.checked)}
                        />
                        <span className="text-sm">
                           {translate.keepmeloggedin}
                        </span>
                        </label>
                    </div>
                    {
                        loginState === 'ERROR' && 
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <span className="block sm:inline"> Your credentials do not match our records</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setLoginState('PENDING')}>
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    }
                    <div className="flex items-center justify-between">
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        {translate.forgotpassword}
                        </a>
                        <button style={{fontSize: 18}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={loginImpl}>
                        {translate.signin}
                        </button>
                    </div>
                </div>
                ]
                }
            </div>
      </div>
    );
};