import "./tag.css";

const Tag = (props) => {
  const isAuthorizedToEdit = props.isAuthorizedToEdit;
  const addedClass = props.blue
    ? "tag-base badge primary-background"
    : "tag-base badge red-background";
  return (
    <span className={"p-1 m-1 " + addedClass} onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export default Tag;
