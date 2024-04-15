import { Block, Field } from "payload/types";
import { MediaBlock } from "../MediaBlock";
import { Text } from "../Content";

export const Hero: Block = {
  slug: "heroBlock",
  fields: [
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
