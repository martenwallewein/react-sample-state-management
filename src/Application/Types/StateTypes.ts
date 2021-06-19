export type IDispatchAction  = {
    type?: string;
} & any;

export type ReducerFunc<T> = (state: T, action: IDispatchAction) => Partial<T>;
export type DispatchFunc = (action: IDispatchAction) => void;
export type GetStateFunc<T> = () => T;
export type ActionResult<T> = Promise<Partial<T>>;
