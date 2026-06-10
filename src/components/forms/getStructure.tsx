import { useEffect } from 'react'
import { Input } from '../inputs/TextField'
import DatePickerComp from '../inputs/DatePicker'
import { CheckInput } from '../inputs/CheckBox'
import AutocompleteInput from '../inputs/AutoComplete'
import MultiAutocompleteInput from '../inputs/MultiAutoComplete'
import { RadioInput } from '../inputs/RadioGroup'
import { TextAreaInput } from '../inputs/TextArea'
import { HiddenField } from '../inputs/HiddenField'
import TimePickerComp from '../inputs/TimeInput'
export const getStructure = (formStructure: any) => {
  let newStructure =
    formStructure &&
    formStructure.map((se: any) => {
      return {
        ...se,
        fields: se.fields
          .sort(
            (a: any, b: any) =>
              parseFloat(a.fieldSortOrder) - parseFloat(b.fieldSortOrder),
          )
          .map((fi: any) => {
            if (fi.uiComponentType === 'DropDown') {
              return { ...fi, Component: AutocompleteInput }
            } else if (fi.uiComponentType === 'CheckBox') {
              return { ...fi, Component: CheckInput }
            } else if (fi.uiComponentType === 'DatePicker') {
              return { ...fi, Component: DatePickerComp }
            } else if (fi.uiComponentType === 'TimePicker') {
              return { ...fi, Component: TimePickerComp }
            } else if (fi.uiComponentType === 'CheckedListBox') {
              return { ...fi, Component: RadioInput }
            } else if (fi.uiComponentType === 'ListBox') {
              return { ...fi, Component: Input }
            } else if (fi.uiComponentType === 'MultiSelectDropDown') {
              return { ...fi, Component: MultiAutocompleteInput }
            } else if (fi.uiComponentType === 'TextArea' || fi.isFullLength ) {
              return { ...fi, Component: TextAreaInput }
            } else if (fi.uiComponentType === 'None') {
              return { ...fi, Component: HiddenField }
            } else return { ...fi, Component: Input }
          }),
      }
    })
  return newStructure
}
