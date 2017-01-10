var app = getApp()
Page({
  data: {
		totalList: [],
		list:[],
		_show:true
  },
  //事件处理函数
  onLoad: function () {
		let data = {}
		data.totalList = app.getList()
		this.setData(data)
  },
	select: function (event) {
		console.log('totalList',this.data.totalList);
		let currency = event.currentTarget.id
		this.data.totalList.forEach((c, i) => {
			if(c.key == currency){
				this.data.totalList[i].display = !c.display
			}
		})
		console.log(this.data.totalList);
		this.setData({
			totalList:this.data.totalList
		});
	
	},
	confirm:function(){
		let self = this;
		let data = this.data;
		 data.list = data.totalList.filter((c) => {
			return c.display == true
		})
		if(this.data.list.length < 2){
			 this.setData({
				 _show:false
			 });
			 setTimeout(function(){
				self.setData({
					_show:true
				});
			 },2000);
		}else{
			app.setList(this.data.totalList)
			wx.navigateBack()
		}
		
	}
})
