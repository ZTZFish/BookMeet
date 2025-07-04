import request from '../axios/request';

export async function bookDetail(id) {
  try {
    const response = await request({
      url: `/bookDetail/${id}`,
      method: 'get', // 明确使用get方法
    });
    return response;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}
