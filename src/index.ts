import { RoleAccess, RoleListAccess } from "./type"
import { _can, _getAllRoles, flatten, memo } from "./util"
export { Permission, Access, RoleAccess, RoleListAccess } from "./type"

export class RBAC {
    protected roleAccess: RoleAccess[] = []
    public can = memo(_can.bind(this))
    public getAllRoles = memo(_getAllRoles.bind(this))

    constructor(roleListAccess: RoleListAccess[] = []) {
        this.roleAccess = flatten(roleListAccess)
    }

    public init(roleListAccess: RoleListAccess[]) {
        this.roleAccess = flatten(roleListAccess)
    }

    public getRoleAccess() {
        return this.roleAccess
    }
}

