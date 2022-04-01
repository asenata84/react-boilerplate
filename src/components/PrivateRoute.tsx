import { memo, ReactNode } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import hasAccess from 'utils/hasAccess';
import { AccessCheckType, AccessUnit } from './Access/Access';

export interface PrivateRouteProps extends RouteProps {
  hasToken: boolean
  children: ReactNode
  all?: AccessUnit[]
  oneOf?: AccessUnit[]
  not?: boolean
}

const PrivateRoute = ({
  hasToken,
  children,
  all,
  oneOf,
  not,
  ...rest
}: PrivateRouteProps) => {
  const hasAccessProvided = !!(all || oneOf);

  let handleAccess = ((all ? hasAccess(AccessCheckType.all, all) : true) && (oneOf ? hasAccess(AccessCheckType.oneOf, oneOf) : true));

  if (not) {
    handleAccess = !handleAccess;
  }

  return (
    <Route {...rest}>
      {
        hasToken && (!hasAccessProvided || handleAccess)
          ? children
          : <Redirect to="/login" />
      }
    </Route>
  );
};

export default memo(PrivateRoute);
