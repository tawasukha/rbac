import { RoleListAccess, RBAC } from "../src/index"

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

const roles: RoleListAccess[] = [
    roleUser,
    roleVerifier,
    roleDBAdmin,
    roleAdmin,
]

const resultRoleAccess = [{ "can": ["read", "view", "save"], "inherit": [], "on": "vendor_info", "role": "[User]" }, { "can": ["read", "save"], "inherit": [], "on": "vendor_account", "role": "[User]" }, { "can": ["view", "read", "save"], "inherit": [], "on": "vendor_approval", "role": "[User]" }, { "can": ["read"], "inherit": [], "on": "admin", "role": "[User]" }, { "can": ["read"], "inherit": [], "on": "user", "role": "[User]" }, { "can": ["read"], "inherit": [], "on": "category", "role": "[User]" }, { "can": ["read"], "inherit": [], "on": "mail", "role": "[User]" }, { "can": ["read", "view", "save"], "inherit": ["[User]"], "on": "vendor_account", "role": "[Verifier]" }, { "can": ["read", "view", "save"], "inherit": ["[User]"], "on": "vendor_info", "role": "[Verifier]" }, { "can": ["view", "read", "save"], "inherit": ["[User]"], "on": "vendor_approval", "role": "[Verifier]" }, { "can": ["read"], "inherit": ["[User]"], "on": "admin", "role": "[Verifier]" }, { "can": ["read"], "inherit": ["[User]"], "on": "user", "role": "[Verifier]" }, { "can": ["read"], "inherit": ["[User]"], "on": "category", "role": "[Verifier]" }, { "can": ["read"], "inherit": ["[User]"], "on": "mail", "role": "[Verifier]" }, { "can": ["read", "save"], "inherit": [], "on": "vendor_info", "role": "[DBAdmin]" }, { "can": ["read", "save"], "inherit": [], "on": "vendor_account", "role": "[DBAdmin]" }, { "can": ["read", "save"], "inherit": [], "on": "vendor_approval", "role": "[DBAdmin]" }, { "can": ["read", "save"], "inherit": [], "on": "category", "role": "[DBAdmin]" }, { "can": ["read", "save"], "inherit": [], "on": "mail", "role": "[DBAdmin]" }, { "can": ["read", "save"], "inherit": [], "on": "workflow", "role": "[DBAdmin]" }, { "can": ["all", "read", "view", "save"], "inherit": ["[User]"], "on": "vendor_info", "role": "[Admin]" }, { "can": ["all", "read", "save"], "inherit": ["[User]"], "on": "vendor_account", "role": "[Admin]" }, { "can": ["all", "view", "read", "save"], "inherit": ["[User]"], "on": "vendor_approval", "role": "[Admin]" }, { "can": ["all", "read"], "inherit": ["[User]"], "on": "category", "role": "[Admin]" }, { "can": ["all", "read"], "inherit": ["[User]"], "on": "user", "role": "[Admin]" }, { "can": ["all", "read"], "inherit": ["[User]"], "on": "mail", "role": "[Admin]" }, { "can": ["all"], "inherit": ["[User]"], "on": "workflow", "role": "[Admin]" }, { "can": ["read"], "inherit": ["[User]"], "on": "admin", "role": "[Admin]" }]
const resultCan = { "access": { "can": ["all", "read"], "inherit": ["[User]"], "on": "user", "role": "[Admin]" }, "granted": true }

const acl = new RBAC(roles)

describe('RBAC', () => {
    it('All Roles include Inherits', () => {
        expect(acl.getAllRoles("[Admin]")).toEqual(["[Admin]", "[User]"]);
    });
    it('Role Access', () => {
        expect(acl.getRoleAccess()).toEqual(resultRoleAccess);
    });
    it('Can', () => {
        expect(acl.can("[Admin]", "read", "user")).toEqual(resultCan);
    });
});
