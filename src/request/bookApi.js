import request from '../axios/request';

export async function bookDetail(id) {
  try {
    const response = await request({
      url: `/bookDetail/${id}`,
      method: 'post', // 明确使用POST方法
      data: { id: id } // 将id作为请求体数据传递
    });
    return response;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}
