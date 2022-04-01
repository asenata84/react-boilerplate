import { AccessCheckType, AccessUnit } from 'components/Access/Access';
import { RootState, store } from 'store';

const hasAccess = (type: AccessCheckType, accessUnits: AccessUnit[], stateProp?: RootState) => {
  const state = stateProp || store.getState();
  const userAccessUnits = state?.user?.accessUnits || [];

  return type === AccessCheckType.all
    ? !!accessUnits?.every((item) => userAccessUnits?.includes(item))
    : !!accessUnits?.some((item) => userAccessUnits?.includes(item));
};

export default hasAccess;
