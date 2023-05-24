/**
 * 角色查询参数
 */
export interface invoiceQuery extends PageQuery {
  invoice_name?: string;
  tax_land_id?: string;
  invoice_type?: string;
  category_id?: string;
  start_time?: string;
  end_time?: string;
  status?: number;
}
