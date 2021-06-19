import { IApplicationState } from "../AppState";
import useContextSelector, {Selector} from "../Selectors/useContextSelector";
import { ApplicationStateContext } from "../StateProvider";

const useAppState = <TSelected extends any>(selector: Selector<IApplicationState, TSelected>) => {
    return useContextSelector(ApplicationStateContext, selector);
};

export {
    useAppState,
}