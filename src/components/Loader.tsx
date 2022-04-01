export type LoaderPropsType = {
  active: boolean
};

const Loader = (
  props: LoaderPropsType,
) => {
  const { active } = props;

  return active
    ? (
      <div
        id="Loader-container"
        data-testid="Loader-container"
      >
        Loading ...
      </div>
    )
    : null;
};

export default Loader;
