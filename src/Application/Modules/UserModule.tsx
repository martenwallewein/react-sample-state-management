import { getInitialAppState } from "../AppState";
import { ActionResult, GetStateFunc } from "../Types/StateTypes";
import { IModule } from "./IModule";

interface IUserModuleState {
  currentUser?: any,
}

const defaultUserModuleState: IUserModuleState = {

};

const getUser = async () => {
  return {
    id: 1,
    name: "sample user"
  };
}

export async function login(_userName: string, _password: string, keepMeLoggedIn: boolean, _getState: GetStateFunc<IUserModuleState> = getInitialAppState): ActionResult<IUserModuleState>  {
  const user = await getUser();

  if (keepMeLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
  }

  return {
    currentUser: user
  };
}

export async function logout(_getState: GetStateFunc<IUserModuleState> = getInitialAppState): ActionResult<IUserModuleState>  {
  localStorage.removeItem("user");
  return {
    currentUser: null,
  };
}

const userModuleActions = {
  login,
  logout,
}

export const userModule: IModule<IUserModuleState, typeof userModuleActions> = {
  actions: userModuleActions,
  defaultState: defaultUserModuleState,
};