import React from "react";
import Cache from "../cache";

export default function SplitColorViewer(props: any) {
  let id = props.node.data.id;
  let preview = props.node.data.preview;
  let cData = Cache.getCache(preview);

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px"
          }}
        >
          {preview != "" ? (
            <img
              style={{ height: "130px", width: "130px" }}
              src={cData ? cData.data : undefined}
              alt=""
            />
          ) : (
            <div
              style={{
                width: "130px",
                height: "130px",
                backgroundColor: "balck"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
