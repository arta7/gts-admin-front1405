export enum confirmContextActionTypes {
    SHOW_CONFIRM = 'SHOW_CONFIRM',
    HIDE_CONFIRM = 'HIDE_CONFIRM'
}

export const initialState = {
    show: false,
    text: ''
};

export const confirmDialogReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case confirmContextActionTypes.SHOW_CONFIRM:
            return {
                show: true,
                text: action.payload.text
            };
        case confirmContextActionTypes.HIDE_CONFIRM:
            return initialState;
        default:
            return initialState;
    }
};