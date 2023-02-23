import { Access, Action, Permission, RoleAccess, RoleListAccess } from "./type"


export const createCacheKeyFromArgs = (args: any[]) =>
  args.reduce((cacheKey, arg) => (cacheKey += `_${typeof arg === 'object' ? JSON.stringify(args) : `${arg}`}_`), '');

export function memo<Args extends unknown[], T>(fn: (...args: Args) => T) {
  const cache: Record<string, T> = {}
  return (...args: Args): T => {
    const cacheKey = createCacheKeyFromArgs(args);
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    const asyncFn = fn.call(undefined, ...args);
    cache[cacheKey] = asyncFn;
    return asyncFn;
  }
}

function _flattenRole(roleListAccess: RoleListAccess[]): RoleAccess[] {
  const roleAccess = []
  for (let i = 0; i < roleListAccess.length; i++) {
    const opt = roleListAccess[i]
    if (opt) {
      const access = opt.access
      for (let j = 0; j < access.length; j++) {
        roleAccess.push({ ...access[j], role: opt.role, inherit: opt.inherit })
      }
    }
  }
  return roleAccess
}

function _mergeAccess(source: Access[], target: Access[]) {
  const combine = [...source, ...target]
  const uniq = (v: string, i: number, s: string[]) => s.indexOf(v) === i
  const reducer = (
    acc: Record<string, any>,
    obj: { on: string | number; can?: string[] },
  ) => {
    if (acc[obj.on]) {
      acc[obj.on].can = [...(acc[obj.on].can || []), ...(obj.can || [])].filter(
        uniq,
      )
    } else {
      acc[obj.on] = { ...obj }
    }
    return acc
  }
  const merged = combine.reduce(reducer, {})
  return Object.keys(merged).map((v) => merged[v])
}

function _mergeInherit(source: RoleListAccess[], opt: RoleListAccess) {
  const immutable = { ...opt }
  let inherit = [...immutable.inherit]
  for (let i = 0; i < immutable.inherit.length; i++) {
    const inheritRole = immutable.inherit[i]
    let inheritOpt = source.find((opt) => opt.role === inheritRole)
    if (inheritOpt) {
      if (inheritOpt.inherit.length !== 0) {
        inheritOpt = _mergeInherit(source, inheritOpt)
      }
      inherit = inherit.concat(inheritOpt.inherit)
      immutable.access = mergeAccess(immutable.access, inheritOpt.access)
    }
  }
  immutable.inherit = inherit

  return immutable
}

export function flatten(roleListAccess: RoleListAccess[]) {
  const immutable = [...roleListAccess]
  for (let i = 0; i < roleListAccess.length; i++) {
    const opt = immutable[i]
    if (!!opt && opt.inherit.length !== 0) {
      immutable[i] = mergeInherit(roleListAccess, opt)
    }
  }
  return flattenRole(immutable)
}

export function _can(
  this: any,
  role: string | string[],
  action: Action,
  target: string,
): Permission {
  const roles = Array.isArray(role) ? role : [role]
  const access = this.roleAccess.find(
    (opt: RoleAccess) =>
      (opt.can!.includes("all") || opt.can!.includes(action)) &&
      opt.on === target &&
      roles.includes(opt.role),
  )

  return access ? { granted: true, access } : { granted: false }
}

export function _getAllRoles(this: any, role: string | string[]): string[] {
  const roles = Array.isArray(role) ? role : [role]
  const inheritRoles: any[] = this.roleAccess
    .filter((opt: RoleAccess) => roles.includes(opt.role))
    .map((opt: RoleAccess) => opt.inherit)

  return [...roles, ...inheritRoles.flat(Infinity)].filter(
    (v, i, a) => a.indexOf(v) === i,
  )
}

export const flattenRole = memo(_flattenRole)
export const mergeAccess = memo(_mergeAccess)
export const mergeInherit = memo(_mergeInherit)
