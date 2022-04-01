export const saveExampleMapper = (
  values: any,
): any => ({
  key: values?.someField,
});

export const exampleMapper = ({
  someDataFromApi,
}: any): any => ({
  someValue: someDataFromApi,
});
