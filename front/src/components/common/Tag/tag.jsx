import "./tag.css";

const Tag = (props) => {
  const addedClass = props.active
    ? "badge primary-background"
    : "badge red-background focus";
  return (
    <span className={"p-1 m-1 " + addedClass} onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export default Tag;
