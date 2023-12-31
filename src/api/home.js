import request from '../utils/https';

//登录
export const login = (data) =>
  request({
    method: "post",
    url: "/auth/account/login",
    data,
  });

//退出登录
export const loginOut = (data) =>
  request({
    method: "post",
    url: "/auth/logout",
    data,
  });

//获取手机验证码
export const getSmsCode = (data) =>
  request({
    method: "post",
    url: "/auth/code/sms",
    data,
  });

//新建设计室
export const createStudio = (data) =>
  request({
    method: "post",
    url: "/api/studio/main",
    data,
  });

//获取设计室列表
export const getStudioList = () =>
  request({
    method: "get",
    url: "/api/studio/main/tpl",
  });


