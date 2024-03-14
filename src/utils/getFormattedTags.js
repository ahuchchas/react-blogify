export function getFormattedHashTags(tags) {
  const tagArray = tags.split(",").map((tag) => "#" + tag.trim());
  const formattedTags = tagArray.join(", ");

  return formattedTags;
}

export function getTagsArray(tags) {
  const tagArray = tags.split(",").map((tag) => tag.trim());

  return tagArray;
}
