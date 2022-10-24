const BASEURL='https://qinchenju.com/homemaking'

function request({url,data,method='GET'}){
	return new Promise((resolve, reject)=>{
		wx.request({
			url:BASEURL+url,
			data,
			method,
			success:(res)=>{
				if (res.statusCode<400){
					resolve(res.data.data)
				}
				else{
					switch (res.statusCode){
						case 401:
							wx.showToast({
								title:'登录过期，请重新登录',
								icon:'none',
								mask:true,
								duration:2000
							})
							break
						case 400:
							wx.showToast({
								title: JSON.stringify(Object.values(res.data.message.join(','))),
								icon:'none',
								mask:true,
								duration:2000
							})
							break
						default:
							wx.showToast({
								title:'未知异常',
								icon:'none',
								mask:true,
								duration:2000
							})
					}
					reject(res.data.message)
				}
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}
export default request
