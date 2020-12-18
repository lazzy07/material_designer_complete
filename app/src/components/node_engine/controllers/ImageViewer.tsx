import React, { Component } from "react";
import Cache from "../cache";

export const imageViewer = props => {
  let id = props.node.data.id;
  let cData = Cache.getCache(id);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "10px"
        }}
      >
        <img
          style={{ height: "130px", width: "130px" }}
          src={
            cData
              ? cData.data
                ? "data:image/jpeg;base64," + cData.data
                : undefined
              : undefined
          }
          alt=""
        />
      </div>
    </div>
  );
};
