const EasyButton = (props) => {
  return (
    <button
      className="btn btn-outline-primary submit-discard-footer-center"
      style={{
        marginTop: "20px",
        fontSize: "16px",
        display: "inline-block",
        textAlign: "center",
        width: "fit-content",
      }}
      onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default EasyButton;
