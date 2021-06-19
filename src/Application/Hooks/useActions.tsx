import { useContext } from "react";
import { ApplicationStateContext } from "../StateProvider";

const useActions = () => {
    const appContext = useContext(ApplicationStateContext);
    return appContext.actions;
};

export {
    useActions,
}