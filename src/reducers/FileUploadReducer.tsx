export enum FileUploadActionKind {
    CHANGE = 'change',
}

interface Action {
    type: FileUploadActionKind;
    payload: any;
}

export function fileUploadReducer(state: any = {}, action: Action): any {
    const { type, payload: { key, value, index } } = action;
    switch (type) {
        case FileUploadActionKind.CHANGE: {
            return {
                ...state,
                [key]: value,
            };
        }

        default:
            return state;
    }
}
