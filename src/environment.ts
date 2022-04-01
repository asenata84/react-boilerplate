interface EnvironmentVariables {
  baseURL: string
}

const development: EnvironmentVariables = {
  baseURL: 'http://localhost:3000',
};

const test: EnvironmentVariables = {
  baseURL: '',
};

const production: EnvironmentVariables = {
  baseURL: '#{baseURL}',
};

const environment = {
  development,
  production,
  test,
};

export default environment[process?.env?.NODE_ENV];
