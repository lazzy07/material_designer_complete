import React from "react";

export const renderTags = (tags: string[]) => {
  if (tags.length > 0) {
    let elems: any[] = [];
    elems.push(
      <i key={-1} className="material-icons specialColor">
        local_offer
      </i>
    );
    let i = 0;
    for (const e of tags) {
      elems.push(
        <span
          key={i}
          className="colorOnHover"
          style={{ paddingLeft: 5, cursor: "pointer" }}
        >
          {e}
          {tags.length > i + 1 ? "," : ""}
        </span>
      );
      i++;
    }

    return elems;
  }
  return null;
};
