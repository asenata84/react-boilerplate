import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ErrorFallback from 'components/ErrorFallback';
import ToastNotification from 'components/ToastNotification';
import Login from 'screens/Login';
import { resetError, setError } from 'store/slices/error';
import { loaderSelector } from 'store/slices/loader';
import { useAppDispatch, useAppSelector } from 'app/hooks/hooks';
import { languageSelector } from 'store/slices/application';
import Loader from 'components/Loader';
import Counter from './screens/Counter/Counter';
import './i18n';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(languageSelector);
  const loaderState = useAppSelector(loaderSelector);
  const { i18n } = useTranslation(['errors']);

  useEffect(() => {
    i18n?.changeLanguage(language?.id || 'en');
  }, [language]);

  return (
    <>
      <Loader active={loaderState} />
      <ToastNotification />
      <ErrorFallback />
      <ErrorBoundary
        fallbackRender={() => null}
        onReset={() => dispatch(resetError())}
        onError={(error) => dispatch(setError({ message: error?.message }))}
      >
        <Router>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Redirect to="/counter" />
              </Route>

              <Route path="/counter">
                <Counter />
              </Route>

              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </ErrorBoundary>
    </>
  );
};

export default App;
