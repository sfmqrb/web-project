import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doTags(tags) {
  return (
    <>
      <TitleMellow title="Tags" />
      {tags.map((tag) => (
        <Tag key={tag.id} __id__={tag.id} active={true}>
          {tag.text}
        </Tag>
      ))}
    </>
  );
}

export default doTags;
