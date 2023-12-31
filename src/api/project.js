import request from '../utils/https';

//获取历史图片
export const getHistoryImage = (params) =>
  request({
    method: "get",
    url: "/api/studio/works",
    params,
  });

//获取历史提示语
export const getHistoryPrompt = (params) =>
  request({
    method: "get",
    url: `/api/studio/prompt/${params.mainId}`,
    params,
  });

//获取生成图片的任务ID
export const getStudioProjectID = (data) =>
  request({
    method: "post",
    url: "/api/studio/works",
    data,
  });

//查询任务ID执行结果
export const getStudioProjectResult = (id) =>
  request({
    method: "get",
    url: `/api/task/${id}`,
  });

//轮播图中的上传功能
export const uploadStudioImage = (data) =>
  request({
    method: "post",
    url: "/api/studio/works/upload",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });

//轮播图中的上传功能
export const getStructureStudioProject = (data) =>
  request({
    method: "post",
    url: "/api/studio/works/structure",
    data,
  });

//查询设计师列表
export const getMyStudioProject = (params) =>
  request({
    method: "get",
    url: "/api/studio/main",
    params,
  });

//我的画风-添加
export const addMyStyle = (data) =>
  request({
    method: "post",
    url: "/api/user/style",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });

//我的画风-列表
export const getMyStyle = (params) =>
  request({
    method: "get",
    url: "/api/user/style",
    params,
  });
