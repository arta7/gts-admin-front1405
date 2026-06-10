import { getFromArray } from '../utils/helpers';

const FormStructureReducer = (state: any[], { address, attr, value, str }: any) => {
  if (str) {
    state.push(...str);
  } else {
    const section = getFromArray(state, address.section);
    const field = getFromArray(section.fields, address.field);
     field[attr] = value;
  }
};

export default FormStructureReducer;