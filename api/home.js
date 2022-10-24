import request from "../utils/request";

export function getCategoryList() {
  return request({
    url: "/v1/category",
  });
}

//获取服务列表数据
export function getServiceList({ page, count, category_id = "", type = "" }) {
  return request({
    url: "/v1/service/list",
    data: {
      page,
      count,
      category_id,
      type,
    },
  });
}

// 获取服务详情
export function getServiceDetail(id) {
  return request({
    url: "/v1/service/" + id,
  });
}
