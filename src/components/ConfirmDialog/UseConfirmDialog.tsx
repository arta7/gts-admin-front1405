import { useContext } from 'react';
import ConfirmDialogContext from './ConfirmDialogContext';
import {confirmContextActionTypes} from "./ConfirmDialogReducer";

let resolveCallback:any;
function useConfirmDialog() {
    const [confirmState, dispatch] = useContext(ConfirmDialogContext) as any;

   
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = (text:any) => {
        dispatch({
            type: confirmContextActionTypes.SHOW_CONFIRM,
            payload: {
                text
            }
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        dispatch({
            type: confirmContextActionTypes.HIDE_CONFIRM
        });
    };

    return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirmDialog;