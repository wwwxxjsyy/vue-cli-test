import request from "@/utils/request";

/**
 *分页
 */
export function SearchDetailDocList(data) {
  return request({
    url: "/apil/DeskTop/BaseData/GetBaseDataList",
    method: "post",
    data
  });
}
