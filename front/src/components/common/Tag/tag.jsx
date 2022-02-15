import "./tag.css";

const Tag = (props) => {
  const addedClass = props.active
    ? "tag-base badge primary-background"
    : "tag-base badge red-background focus";
  return (
    <span className={"p-1 m-1 " + addedClass} onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export default Tag;
