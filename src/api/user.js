import request from '../utils/https';

//获取历史图片
export const uploadUserAvatar = (data) =>
  request({
    method: "post",
    url: "/api/users/avatar",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });
