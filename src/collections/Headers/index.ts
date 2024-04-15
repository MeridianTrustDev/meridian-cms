import { CollectionConfig } from "payload/types";
import { tenant } from "../../fields/tenant";
import { tenants } from "../Pages/access/tenants";
import { loggedIn } from "../Pages/access/loggedIn";
import { tenantAdmins } from "../Pages/access/tenantAdmins";

export const Headers: CollectionConfig = {
  slug: "headers",
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "primaryNavigation",
      type: "relationship",
      relationTo: "navigationMenu",
    },
    {
      name: "secondaryNavigation",
      type: "relationship",
      relationTo: "navigationMenu",
    },
    tenant,
  ],
};
