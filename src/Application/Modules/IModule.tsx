import { IApplicationState } from "../AppState";

export interface IModule<T,R> {
    onLoad?: (state: IApplicationState) => Promise<Partial<IApplicationState>>;
    defaultState: T;
    actions: R;
}