const FormReducer = (state:any, { key, value, batch, flush, changed }:any) => {
    if (batch) {
      for (const key in batch) {
        state[key] = batch[key];
      }
      state._changed = false;
    } else if (key) {
      let _s = state;
      const keyChain = key.split(".");
      const mainKey = keyChain.pop();
      for (const key of keyChain) {
        _s = _s[key];
      }
      _s[mainKey].value = value;
    } else if (flush) {
      const flushObject = (obj:any) => {
        if (obj.hasOwnProperty("value")) {
          obj.value = "";
        } else {
          for (const key in obj) {
            flushObject(obj[key]);
          }
        }
      };
      flushObject(state);
    } else if (changed !== null && changed !== undefined) {
      state.changed = changed;
    }
  };
  
  export default FormReducer;
  