const ReportReducer = (state: any, { key, filter, value }: any) => {
  if (key) {
    state[key] = value;
  } else if (filter) {
    if (!state.filters) state.filters = {};
    state.filters[filter] = value || null;
  }
};

export default ReportReducer;
