import { CollectionBeforeReadHook, CollectionConfig } from "payload/types";
import { tenants } from "./access/tenants";
import { loggedIn } from "./access/loggedIn";
import { tenantAdmins } from "./access/tenantAdmins";
import formatSlug from "./hooks/formatSlug";
import { tenant } from "../../fields/tenant";
import { MediaBlock } from "../../blocks/MediaBlock";
import { Columns } from "../../blocks/Columns";
import { Text } from "../../blocks/Content";
import { Hero } from "../../blocks/Hero";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "tenant", "updatedAt"],
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Details",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: "Page",
                  value: "page",
                },
                {
                  label: "Home",
                  value: "home",
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "pageLayout",
              type: "blocks",
              required: true,
              blocks: [Columns, MediaBlock, Text],
              admin: {
                condition: (data) => data.type === "page",
              },
            },
            {
              name: "homeLayout",
              type: "blocks",
              required: true,
              blocks: [Columns, Hero],
              admin: {
                condition: (data) => data.type === "home",
              },
            },
          ],
        },
      ],
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    tenant,
  ],
};
