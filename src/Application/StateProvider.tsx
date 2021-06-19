import React, {
    Context,
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useReducer,
  } from 'react';
import { IApplicationState, initialAppState, appActions, IApplicationActions } from './AppState';
import { DispatchFunc, IDispatchAction } from './Types/StateTypes';

const ApplicationStateContext = React.createContext<IApplicationState & { dispatch: DispatchFunc,  actions: IApplicationActions}>(
  {
    ...initialAppState,
    actions: appActions,
    dispatch: () => {},
  }
  );

export interface IApplicationStateProviderProps {
    children: any;
}

function genericReducer(_state: IApplicationState, newState: Partial<IApplicationState>): IApplicationState {
    return {..._state, ...newState};
}

const applyReducers =  <T extends Object>(actions: T, state: IApplicationState, dispatch: IDispatchAction): T => {
    const res: any = {};
    Object.keys(actions).forEach((key: any) => {
        // @ts-ignore TODO fix
        res[key] = applyReducer(state, dispatch, actions[key]);
    }); 

    return res as T;
}

const applyReducer = <T extends Array<any>, U extends Function>(state: IApplicationState, dispatch: IDispatchAction, input: U): U => {
    return (async (...args: T) => {
        const result = await input(...args, () => state);
        dispatch(result);
        return result;
    }) as unknown as U;
}

const contextMap: Map<Context<any>, Context<any>> = new Map();

interface ProviderProps<T> {
  readonly value: T;
  readonly children: ReactNode;
}

type ContextAccessor<T> = () => T;
type ContextListener<T> = (state: T) => void;
type ContextListeners<T> = Set<ContextListener<T>>;
type SelectorContextType<T> = readonly [
  ContextAccessor<T>,
  ContextListeners<T>
];

const SelectorContext = createContext<SelectorContextType<IApplicationState>>([
    () => { return { } as IApplicationState},
    new Set()
  ]);
contextMap.set(ApplicationStateContext, SelectorContext);

const ApplicationStateContextProvider = (props: IApplicationStateProviderProps) => {
    const { children } = props;

    const [state, dispatch] = useReducer(genericReducer, initialAppState);
    const actions = applyReducers(appActions, state, dispatch);
    const contextValueRef = useRef(state);
    const listeners = useRef<ContextListeners<IApplicationState>>(new Set());

    useEffect(() => {
        contextValueRef.current = state;
  
        listeners.current.forEach((listener: ContextListener<any>) => {
          listener(state);
        });
      }, [state]);
  
      const getContextValue: ContextAccessor<IApplicationState> = useCallback(() => {
        return contextValueRef.current;
      }, [contextValueRef]);
  
      const contextValue: SelectorContextType<IApplicationState> = useMemo(
        () => [getContextValue, listeners.current],
        [contextValueRef]
      );
    return (
        <ApplicationStateContext.Provider value={{
            ...state,
            dispatch,
            actions,
        }}
        >
            <SelectorContext.Provider value={contextValue}>
                {children}
            </SelectorContext.Provider>
        </ApplicationStateContext.Provider>
    );
};

export function getSelectorContext<T>(
  context: Context<T>
): Context<SelectorContextType<T>> {
  return contextMap.get(context)!;
}

export {
    ApplicationStateContext,
    ApplicationStateContextProvider,
}