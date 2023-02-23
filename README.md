# RBAC

Simple Role Based Access Control with zero dependency

## Installation

```sh
pnpm add @tawasukha/rbac
```

## Commands

```typescript
import { RBAC, RoleListAccess } from "@tawasukha/rbac"

const roleUser: RoleListAccess = {
  role: "[User]",
  inherit: [],
  access: [
    {
      on: "vendor_info",
      can: ["read", "view", "save"],
    },
    {
      on: "vendor_account",
      can: ["read", "save"],
    },
    {
      on: "vendor_approval",
      can: ["view", "read", "save"],
    },
    {
      on: "admin",
      can: ["read"],
    },
    {
      on: "user",
      can: ["read"],
    },
    {
      on: "category",
      can: ["read"],
    },
    {
      on: "mail",
      can: ["read"],
    },
  ],
}

const roleVerifier: RoleListAccess = {
  role: "[Verifier]",
  inherit: ["[User]"],
  access: [
    {
      on: "vendor_account",
      can: ["read", "view", "save"],
    },
  ],
}

const roleDBAdmin: RoleListAccess = {
  role: "[DBAdmin]",
  inherit: [],
  access: [
    {
      on: "vendor_info",
      can: ["read", "save"],
    },
    {
      on: "vendor_account",
      can: ["read", "save"],
    },
    {
      on: "vendor_approval",
      can: ["read", "save"],
    },
    {
      on: "category",
      can: ["read", "save"],
    },
    {
      on: "mail",
      can: ["read", "save"],
    },
    {
      on: "workflow",
      can: ["read", "save"],
    },
  ],
}

const roleAdmin: RoleListAccess = {
  role: "[Admin]",
  inherit: ["[User]"],
  access: [
    {
      on: "vendor_info",
      can: ["all"],
    },
    {
      on: "vendor_account",
      can: ["all"],
    },
    {
      on: "vendor_approval",
      can: ["all"],
    },
    {
      on: "category",
      can: ["all"],
    },
    {
      on: "user",
      can: ["all"],
    },
    {
      on: "mail",
      can: ["all"],
    },
    {
      on: "workflow",
      can: ["all"],
    },
  ],
}

export const roles: RoleListAccess[] = [
  roleUser,
  roleVerifier,
  roleDBAdmin,
  roleAdmin,
]

const acl = new RBAC(roles)

const permission = acl.can("[Admin]","read","user")

console.log(permission)
```

