import request from "../utils/request";

export const scoreStatistics= params => {
  return request({
    url: '/evaluation/scoreStatistics',
    method: 'GET',
    params
  })
}
export const selectByMember= () => {
  return request({
    url: '/evaluation/selectByMember',
    method: 'POST',
  })
}
export const deleteEvaluation= params => {
  return request({
    url: '/evaluation/deleteEvaluation',
    method: 'POST',
    params
  })
}