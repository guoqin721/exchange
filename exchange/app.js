//app.js
App({
  onLaunch: function () {

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
	setList: function (list) {
		wx.setStorageSync('currencylist', list)
	},
  getList: function () {
		let list = [
		  { key: 'CNY', name: '人民币', symbol: '¥', display: true },
		  { key: 'USD', name: '美元', symbol: '$', display: true  },
		  { key: 'HKD', name: '港币', symbol: '$', display: true  },
		  { key: 'EUR', name: '欧元', symbol: '€', display: true  },
		  { key: 'JPY', name: '日元', symbol: '¥' },
		  { key: 'GBP', name: '英镑', symbol: '£', display: true  },
		  { key: 'TWD', name: '新台币', symbol: 'NT$' },
		  { key: 'MOP', name: '澳门币', symbol: 'MOP' },
		  { key: 'AUD', name: '澳元', symbol: '$' },
		  { key: 'CAD', name: '加拿大元', symbol: '$' }
		]

		let currencylist = wx.getStorageSync('currencylist') || list
		currencylist.forEach((c, i) => {
			currencylist[i].image = '/images/currency/' + c.key.toLowerCase() + '.png'
		})

		return currencylist
  }
})
