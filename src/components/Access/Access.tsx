import { ReactNode } from 'react';
import { useAppSelector } from 'app/hooks/hooks';
import { userAccessUnitsSelector } from 'store/slices/user';

export enum AccessCheckType {
  all = 'all',
  oneOf = 'oneOf',
}

export enum AccessUnit {
  CAN_READ_ALL = 'CAN_READ_ALL',
  CAN_WRITE_ALL = 'CAN_WRITE_ALL',
  CAN_DELETE_ALL = 'CAN_DELETE_ALL',
}

export type AccessPropsType = {
  children?: ReactNode
  oneOf?: AccessUnit[]
  all?: AccessUnit[]
  not?: boolean
};

const Access = ({
  children,
  all,
  oneOf,
  not,
}: AccessPropsType) => {
  const userAccessUnits = useAppSelector<AccessUnit[]>(userAccessUnitsSelector);

  const checkAll = !!all?.every((item) => userAccessUnits?.includes(item));
  const checkOneOf = !!oneOf?.some((item) => userAccessUnits?.includes(item));

  const hasAll = !!all && checkAll;
  const hasOneOf = !!oneOf && checkOneOf;

  let hasAccess = all && oneOf
    ? (hasAll && hasOneOf)
    : (hasAll || hasOneOf);

  if (not) {
    hasAccess = !hasAccess;
  }

  return hasAccess ? children : null;
};

export default Access;
