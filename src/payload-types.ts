/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    categories: Category;
    events: Event;
    footers: Footer;
    houses: House;
    media: Media;
    headers: Header;
    navigationMenu: NavigationMenu;
    news: News;
    pages: Page;
    tenants: Tenant;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    password: string;
    email: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  name: string;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenants".
 */
export interface Tenant {
  id: string;
  name: string;
  domains: {
    cmsDomain: string;
    frontendDomain: string;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  title: string;
  start: {
    date: string;
    time: string;
  };
  end: {
    date: string;
    time: string;
  };
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footers".
 */
export interface Footer {
  id: string;
  title: string;
  logo?: string | Media | null;
  primaryNavigation?: (string | null) | NavigationMenu;
  telephone?: string | null;
  email?: string | null;
  address?: string | null;
  disclaimer?: string | null;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  categories?:
    | {
        category: string | Category;
        id?: string | null;
      }[]
    | null;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    sm?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    md?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    lg?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xl?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigationMenu".
 */
export interface NavigationMenu {
  id: string;
  title: string;
  type: 'primary' | 'secondary' | 'footer';
  navItems?:
    | {
        type?: ('reference' | 'custom' | 'parent') | null;
        newTab?: boolean | null;
        label: string;
        showLabel?: boolean | null;
        disableLink?: boolean | null;
        reference?: (string | null) | Page;
        url?: string | null;
        icon?: string | null;
        color?: string | null;
        children?:
          | {
              type?: ('reference' | 'custom' | 'parent') | null;
              newTab?: boolean | null;
              label: string;
              reference?: (string | null) | Page;
              url?: string | null;
              children?:
                | {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    label: string;
                    reference?: (string | null) | Page;
                    url?: string | null;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  publishedAt?: string | null;
  title: string;
  type?: ('page' | 'home') | null;
  featuredImage?: string | Media | null;
  hero?: {
    showHousePoints?: boolean | null;
    slides?:
      | {
          image?: string | Media | null;
          primaryText?: string | null;
          secondaryText?: string | null;
          id?: string | null;
        }[]
      | null;
  };
  layout: (
    | {
        items?:
          | {
              title: string;
              content: (
                | {
                    embed?: string | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'embedBlock';
                  }
                | {
                    mode?: ('named' | 'byCategory') | null;
                    files?:
                      | {
                          embed?: boolean | null;
                          reference: string | Media;
                          id?: string | null;
                        }[]
                      | null;
                    category?: (string | null) | Category;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'fileBlock';
                  }
                | {
                    text?: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    } | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'text';
                  }
                | {
                    position?: ('default' | 'fullscreen') | null;
                    media: string | Media;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaBlock';
                  }
                | {
                    mediaPosition?: ('left' | 'right') | null;
                    media: string | Media;
                    text: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    };
                    readMore?: {
                      showReadMore?: boolean | null;
                      readMoreText?: string | null;
                      readMoreLink?: {
                        target?: ('page' | 'custom') | null;
                        page?: (string | null) | Page;
                        url?: string | null;
                      };
                    };
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaAndText';
                  }
              )[];
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'accordion';
      }
    | {
        buttons?:
          | {
              text?: string | null;
              backgroundColour?: string | null;
              backgroundImage?: string | Media | null;
              target?: ('reference' | 'custom') | null;
              newTab?: boolean | null;
              reference?: (string | null) | Page;
              url?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'buttonsBlock';
      }
    | {
        columns?:
          | {
              content: (
                | {
                    mode?: ('calendar' | 'carousel' | 'list') | null;
                    limit?: number | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'eventsBlock';
                  }
                | {
                    mode?: ('named' | 'byCategory') | null;
                    files?:
                      | {
                          embed?: boolean | null;
                          reference: string | Media;
                          id?: string | null;
                        }[]
                      | null;
                    category?: (string | null) | Category;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'fileBlock';
                  }
                | {
                    position?: ('default' | 'fullscreen') | null;
                    media: string | Media;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaBlock';
                  }
                | {
                    mediaPosition?: ('left' | 'right') | null;
                    media: string | Media;
                    text: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    };
                    readMore?: {
                      showReadMore?: boolean | null;
                      readMoreText?: string | null;
                      readMoreLink?: {
                        target?: ('page' | 'custom') | null;
                        page?: (string | null) | Page;
                        url?: string | null;
                      };
                    };
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaAndText';
                  }
                | {
                    mode?: ('carousel' | 'list') | null;
                    limit?: number | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'newsBlock';
                  }
                | {
                    text?: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    } | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'text';
                  }
              )[];
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'columnsBlock';
      }
    | {
        embed?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'embedBlock';
      }
    | {
        mode?: ('calendar' | 'carousel' | 'list') | null;
        limit?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'eventsBlock';
      }
    | {
        mode?: ('named' | 'byCategory') | null;
        files?:
          | {
              embed?: boolean | null;
              reference: string | Media;
              id?: string | null;
            }[]
          | null;
        category?: (string | null) | Category;
        id?: string | null;
        blockName?: string | null;
        blockType: 'fileBlock';
      }
    | {
        position?: ('default' | 'fullscreen') | null;
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        mediaPosition?: ('left' | 'right') | null;
        media: string | Media;
        text: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        readMore?: {
          showReadMore?: boolean | null;
          readMoreText?: string | null;
          readMoreLink?: {
            target?: ('page' | 'custom') | null;
            page?: (string | null) | Page;
            url?: string | null;
          };
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaAndText';
      }
    | {
        mode?: ('carousel' | 'list') | null;
        limit?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'newsBlock';
      }
    | {
        text?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'text';
      }
    | {
        tiles?:
          | {
              text?: string | null;
              colour?: string | null;
              icon?: string | null;
              target?: ('reference' | 'custom') | null;
              newTab?: boolean | null;
              reference?: (string | null) | Page;
              url?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'tiles';
      }
    | {
        myNewTermID?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'vacancies';
      }
  )[];
  slug?: string | null;
  tenant: string | Tenant;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "houses".
 */
export interface House {
  id: string;
  name: string;
  points?: number | null;
  houseColour?: string | null;
  logo?: string | Media | null;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "headers".
 */
export interface Header {
  id: string;
  title: string;
  logo?: string | Media | null;
  primaryNavigation?: (string | null) | NavigationMenu;
  secondaryNavigation?: (string | null) | NavigationMenu;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
  id: string;
  publishedAt?: string | null;
  title: string;
  featuredImage?: string | Media | null;
  layout: (
    | {
        items?:
          | {
              title: string;
              content: (
                | {
                    embed?: string | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'embedBlock';
                  }
                | {
                    mode?: ('named' | 'byCategory') | null;
                    files?:
                      | {
                          embed?: boolean | null;
                          reference: string | Media;
                          id?: string | null;
                        }[]
                      | null;
                    category?: (string | null) | Category;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'fileBlock';
                  }
                | {
                    text?: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    } | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'text';
                  }
                | {
                    position?: ('default' | 'fullscreen') | null;
                    media: string | Media;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaBlock';
                  }
                | {
                    mediaPosition?: ('left' | 'right') | null;
                    media: string | Media;
                    text: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    };
                    readMore?: {
                      showReadMore?: boolean | null;
                      readMoreText?: string | null;
                      readMoreLink?: {
                        target?: ('page' | 'custom') | null;
                        page?: (string | null) | Page;
                        url?: string | null;
                      };
                    };
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaAndText';
                  }
              )[];
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'accordion';
      }
    | {
        buttons?:
          | {
              text?: string | null;
              backgroundColour?: string | null;
              backgroundImage?: string | Media | null;
              target?: ('reference' | 'custom') | null;
              newTab?: boolean | null;
              reference?: (string | null) | Page;
              url?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'buttonsBlock';
      }
    | {
        columns?:
          | {
              content: (
                | {
                    mode?: ('calendar' | 'carousel' | 'list') | null;
                    limit?: number | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'eventsBlock';
                  }
                | {
                    mode?: ('named' | 'byCategory') | null;
                    files?:
                      | {
                          embed?: boolean | null;
                          reference: string | Media;
                          id?: string | null;
                        }[]
                      | null;
                    category?: (string | null) | Category;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'fileBlock';
                  }
                | {
                    position?: ('default' | 'fullscreen') | null;
                    media: string | Media;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaBlock';
                  }
                | {
                    mediaPosition?: ('left' | 'right') | null;
                    media: string | Media;
                    text: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    };
                    readMore?: {
                      showReadMore?: boolean | null;
                      readMoreText?: string | null;
                      readMoreLink?: {
                        target?: ('page' | 'custom') | null;
                        page?: (string | null) | Page;
                        url?: string | null;
                      };
                    };
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'mediaAndText';
                  }
                | {
                    mode?: ('carousel' | 'list') | null;
                    limit?: number | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'newsBlock';
                  }
                | {
                    text?: {
                      root: {
                        type: string;
                        children: {
                          type: string;
                          version: number;
                          [k: string]: unknown;
                        }[];
                        direction: ('ltr' | 'rtl') | null;
                        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                        indent: number;
                        version: number;
                      };
                      [k: string]: unknown;
                    } | null;
                    id?: string | null;
                    blockName?: string | null;
                    blockType: 'text';
                  }
              )[];
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'columnsBlock';
      }
    | {
        mode?: ('calendar' | 'carousel' | 'list') | null;
        limit?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'eventsBlock';
      }
    | {
        position?: ('default' | 'fullscreen') | null;
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        mediaPosition?: ('left' | 'right') | null;
        media: string | Media;
        text: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        readMore?: {
          showReadMore?: boolean | null;
          readMoreText?: string | null;
          readMoreLink?: {
            target?: ('page' | 'custom') | null;
            page?: (string | null) | Page;
            url?: string | null;
          };
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaAndText';
      }
    | {
        text?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'text';
      }
    | {
        mode?: ('named' | 'byCategory') | null;
        files?:
          | {
              embed?: boolean | null;
              reference: string | Media;
              id?: string | null;
            }[]
          | null;
        category?: (string | null) | Category;
        id?: string | null;
        blockName?: string | null;
        blockType: 'fileBlock';
      }
    | {
        myNewTermID?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'vacancies';
      }
  )[];
  slug?: string | null;
  tenant: string | Tenant;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  roles: ('super-admin' | 'user')[];
  tenants?:
    | {
        tenant: string | Tenant;
        roles: ('admin' | 'user')[];
        id?: string | null;
      }[]
    | null;
  sub?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}