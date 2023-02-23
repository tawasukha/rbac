export type Action = "read" | "save" | "delete" | "view" | "all"

export type Permission = {
    granted: boolean
    access?: RoleAccess
}

export type Access = {
    on: string
    can: Action[]
}

export type RoleListAccess = {
    role: string
    inherit: string[]
    access: Access[]
}

export type RoleAccess = Partial<Access> & { role: string; inherit: string[] }
