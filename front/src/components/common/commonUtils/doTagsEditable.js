import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doTagsEditable(tags, isAuthorizedToEdit = false, onDeletion = null) {
  return (
    <>
      <TitleMellow title="Tags" />
      {tags.map((tag) => {
        const { name } = tag;
        return (
          <Tag
            key={tag.id}
            id={tag.id}
            isAuthorizedToEdit={isAuthorizedToEdit}
            onDeletion={onDeletion}>
            <span>{name + " "}</span>
          </Tag>
        );
      })}
    </>
  );
}

export default doTagsEditable;
