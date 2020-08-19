import request from "@/utils/request";

/**
 *分页
 */
export function SearchDetailDocList(data) {
  return request({
    url: "/api/NuclearNoteI/SearchDetailDocList",
    method: "post",
    data
  });
}
