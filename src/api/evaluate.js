import request from "../utils/request";

export const scoreStatistics= params => {
  return request({
    url: '/evaluation/scoreStatistics',
    method: 'GET',
    params
  })
}