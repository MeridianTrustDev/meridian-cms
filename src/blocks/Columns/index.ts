import { Block, Field } from "payload/types";
import { MediaBlock } from "../MediaBlock";
import { Text } from "../Content";

export const Columns: Block = {
  slug: "columnsBlock",
  fields: [
    {
      name: "columns",
      label: "Columns",
      type: "array",
      fields: [
        {
          name: "content",
          type: "blocks",
          required: true,
          blocks: [MediaBlock, Text],
          admin: {
            condition: (data) => data.type === "page",
          },
        },
      ],
    },
  ],
};
