import { useImmerReducer } from "use-immer";
import ReportReducer from '../reducers/ReportReducer';
import { setAutoFreeze } from "immer";

setAutoFreeze(false);

const useReport = (initialState:any) => {
  const [state, dispatch] = useImmerReducer(ReportReducer, {
    ...initialState,
    // filter,
  });
  const filterDispatcher = (value:any) => {
    dispatch({
      key: "filter",
      value: value,
    });
  };

  return { state, setState: dispatch, filterDispatcher };
};

export default useReport;
