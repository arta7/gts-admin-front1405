export function HiddenField(props: any) {
  const {
    Component,
    control,
    state,
    fieldId,
    tableName,
    fieldName,
    aliasName,
    fieldType,
    fieldSortOrder,
    fieldCaption,
    isReadOnly,
    isVisible,
    isMandatory,
    isUnique,
    uniquenessCheckAPI,
    needToValidate,
    validationRule,
    maxLen,
    minLen,
    masterFieldAliasName,
    useInSaveMethod,
    masterFieldId,
    defaultValues,
    register,
    errors,
  } = props

  return <input {...register(aliasName)} type="hidden"  />
}
