import "./tag.css";

const Tag = (props) => {
  const isAuthorizedToEdit = props.isAuthorizedToEdit;
  const handleDeletion = props.onDeletion;
  const addedClass = props.blue
    ? "tag-base badge primary-background"
    : "tag-base badge red-background";

  return (
    <>
      <span
        key={props.children}
        className={"p-1 m-1 " + addedClass}
        onClick={props.onClick}>
        {props.children}
      </span>
      {isAuthorizedToEdit && handleDeletion && (
        <span
          className="tag-base badge tag-delete"
          onClick={() =>
            handleDeletion(
              props.children[0].props.children +
                props.children[1].props.children
            )
          }>
          X
        </span>
      )}
    </>
  );
};

export default Tag;
