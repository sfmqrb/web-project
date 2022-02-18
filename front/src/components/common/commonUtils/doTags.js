import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doTags(tags) {
  return (
    <>
      <TitleMellow title="Tags" />
      {tags.map((tag) => (
        <Tag key={tag.tagId} blue={true}>
          {tag.name}
        </Tag>
      ))}
    </>
  );
}

export default doTags;
