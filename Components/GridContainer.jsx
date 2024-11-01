const GridContainer = ({ className, children }) => {
  return (
    <div
      className={`grid md:grid-cols-3 md:grid-rows-3 grid-col-1 lg:grid-rows-none my-9 gap-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
