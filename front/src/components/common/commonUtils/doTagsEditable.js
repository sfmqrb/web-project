import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doTagsEditable(
  tags,
  isAuthorizedToEdit = false,
  onDeletion = null,
  blue = false,
  title
) {
  return (
    <>
      <TitleMellow title={title} />
      {tags.map((tag) => {
        const { name } = tag;
        return (
          <Tag
            blue={blue}
            key={tag.tagId}
            id={tag.tagId}
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
