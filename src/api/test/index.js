import request from "@/utils/request";

/**
 *分页
 */
export function GetRecordListPagedList(data) {
  return request({
    url: "/api/CusDecPrepartManagementImported/GetRecordListPagedList",
    method: "post",
    data
  });
}
