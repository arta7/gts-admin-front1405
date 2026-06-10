import {useReducer} from "react";
import {initialState, confirmDialogReducer} from "./ConfirmDialogReducer";
import ConfirmContext from "./ConfirmDialogContext";

export const ConfirmDialogContextProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(confirmDialogReducer, initialState);

    return (
        <ConfirmContext.Provider value={[state, dispatch]}>
            {children}
        </ConfirmContext.Provider>
    );
};