
export default function updateAction(state:any, payload:any) {
  return {
    ...state,
    yourDetails: {
      ...state.yourDetails,
      ...payload
    }
  };
}