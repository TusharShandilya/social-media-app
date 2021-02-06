const Container: React.FC<{ scrollable?: boolean }> = ({
  scrollable,
  children,
}) => {
  return (
    <div className={`container ${scrollable ? "container-scrollable" : ""}`}>
      {children}
    </div>
  );
};

export default Container;
