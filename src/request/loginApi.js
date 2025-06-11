import request from '../axios/request';

export async function login(username, password) {
  try {
    const response = await request({
      url: '/login',
      method: 'post',
      data: {
        username: username,
        password: password
      }
    });
    console.log('Full response object:', response); // 打印整个响应对象
    console.log('Response data:', response.data); // 打印响应数据部分
    return response.data;
  }
  catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
}

export async function register(username, password, email) {
  try {
    const response = await request({
      url: '/register',
      method: 'post',
      data: {
        username: username,
        password: password,
        email: email
      }
    });
    console.log('Full response object:', response); // 打印整个响应对象
    console.log('Response data:', response.data); // 打印响应数据部分
    return response.data;
  }
  catch (error) {
    console.error('Error fetching register:', error);
    throw error;
  }
}