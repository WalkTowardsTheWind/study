/**
 * 角色查询参数
 */
export interface RoleQuery extends PageQuery {
  role_name?: string;
}

/**
 * 角色查询参数
 */
export interface LogQuery extends PageQuery {
  path?: string;
  ip?: string;
  admin_id?: string;
}
