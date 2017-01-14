//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
function ratesCompute(rates,data){
	let _data = data 

	//获得正在输入货币的汇率
	let rate = 1
	_data.list.forEach((c, i) => {
		_data.list[i]['rate'] = rates[c.key]
		if(c.key === _data.focus) {
			rate = rates[c.key]
		}
	})

	//计算换算结果
	_data.valueList = {} 
	_data.list.forEach((c, i) => {
		if(c.key != _data.focus) {
			_data.valueList[c.key] = (data.value * rate/c.rate).toFixed(2)
		} else {
			_data.valueList[c.key] = data.value
		}
	})
	return _data;
	//this.setData(data)
}
Page({
  data: {
		list: [],
		focus: 'CNY',
		value: 100,
		valueList: {},
		time: util.formatTime2(new Date()),
		rates:{},
		close:false
  },
  //事件处理函数
	onLoad: function () {
		
	},
	onReady:function(){
		this.updateCurrency()
		this.updateValue()	
	},
	onShow: function () {
		this.updateCurrency()
		this.updateValue()	
	},
	updateCurrency: function () {
		//得到主页显示的货币
		let data = this.data 
		let currencylist = app.getList()
	  data.list = currencylist.filter((c) => {
			return c.display == true
		})
		this.setData(data)
	},
	updateValue: function () {
		let that = this
		this.getExchange(function(refer){
				let rates = refer;
				rates.CNY="100";
				that.setData({
					rates:rates
				})
				//数据获取成功，遍历汇率
				that.setData({
					valueList:ratesCompute(rates,that.data).valueList
				})
		}, function(res) {
			console.log("失败");
		})		
	},
	getExchange: function (success, fail) {
		wx.request({
			url: "https://api.fundusd.com/v1/exchanges/wxapp",
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
            data: {},
			success: (res) => {
				success(res.data.refer)
			},
			fail: (res) => {
				console.log("失败");
			}
		})
      /*
		let res = {
			data: {
				"USD":"6.9223",
				"HKD":"0.8916",
				"EUR":"7.2838",
				"JPY":"0.0591",
				"GBP":"8.4992",
				"TWD":"0.2154",
				"MOP":"0.8661",
				"AUD":"5.0525",
				"CAD":"5.2303"
			}
		}
		success(res) */
	},
	choose: function () {
		wx.navigateTo({ url: '/pages/list/list' })
	},
	setPage:function(){
		wx.navigateTo({ url: '/pages/setPage/setPage' })
	},
	keyInput: function (e) {
		this.setData({
			focus:e.target.id,
			value:e.detail.value
		})
		this.updateValue()
	},
	onPullDownRefresh: function () {
		let data = this.data
		data.time = "正在更新"
		this.setData(data)
        wx.showNavigationBarLoading()
		/*
		let that = this
		this.getExchange(function(res){
			let rates = res.data;
				rates.CNY="1";
				that.setData({
					rates:rates
				})
				//数据获取成功，遍历汇率
				that.updateValue();
				// this.setData({
				// 	data:ratesCompute(rates,this.data)
				// })
				that.setData({
					time:util.formatTime2(new Date())
				})
				 wx.showToast({
					title: '刷新成功',
					icon: 'success',
					duration: 500
				});
				wx.hideNavigationBarLoading();
				wx.stopPullDownRefresh()
		}, function(res){
			that.setData({
					time:"更新失败"
				})
				 wx.showToast({
					title: '刷新失败',
					icon: 'loading',
					duration: 500
				});
				wx.hideNavigationBarLoading();
				wx.stopPullDownRefresh()
		})*/

		wx.request({
			url: "https://api.fundusd.com/v1/exchanges/wxapp",
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
            data: {},
			success: (res) => {
				let rates = res.data.refer;
				rates.CNY="100";
				this.setData({
					rates:rates
				})
				//数据获取成功，遍历汇率
				this.updateValue();
				// this.setData({
				// 	data:ratesCompute(rates,this.data)
				// })
				this.setData({
					time:util.formatTime2(new Date())
				})
				 wx.showToast({
					title: '刷新成功',
					icon: 'success',
					duration: 500
				});
				wx.hideNavigationBarLoading();
				wx.stopPullDownRefresh()
			},
			fail: (res) => {
				this.setData({
					time:"更新失败"
				})
				 wx.showToast({
					title: '刷新失败',
					icon: 'loading',
					duration: 500
				});
				wx.hideNavigationBarLoading();
				wx.stopPullDownRefresh()
			}
		})
		
	},
	onShareAppMessage :function(){
		return {
			title: '汇率换算宝',
			desc: '汇率计算，实时更新，方便查询',
			path: '/pages/index/index'
		}
	},
	currencySkip:function(e){
		wx.navigateTo({
			url: '/pages/listItem/listItem?key='+e.currentTarget.dataset.value
		})
	},
	close:function(){
		this.setData({
			close:true
		})
	}
})
