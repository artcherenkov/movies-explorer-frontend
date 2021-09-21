import LoaderComponent from "react-loader-spinner";

const Loader = (props) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <LoaderComponent {...props} />
    </div>
  );
};

export default Loader;
