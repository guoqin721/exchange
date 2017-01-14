var app = getApp()
Page({
  data:{
      list:{},
      navbar:0,
      country:"",
      tradeType:"mid_price",
      result:1,
      trade: [
        {name: 'xc_buy_price', value: '钞买价', checked: 'true'},
        {name: 'xh_buy_price', value: '汇买价'},
        {name: 'xc_sell_price', value: '钞/汇卖价'},
        {name: 'mid_price', value: '中间价'},
     ],
      bank: [
        {name: 'icbc', value: '工商银行',src:'../../images/bank/gongshang.png',checked: true},
        {name: 'boc', value: '中国银行', src:'../../images/bank/zhonghang.png'},
        {name: 'abchina', value: '农业银行',src:'../../images/bank/nongye.png'},
        {name: 'bankcomm', value: '交通银行',src:'../../images/bank/jiaohang.png'},
        {name: 'ccb', value: '建设银行',src:'../../images/bank/jianhang.png'},
        {name: 'cmbchina', value: '招商银行',src:'../../images/bank/zhaoshang.png'},
        {name: 'cebbank', value: '光大银行',src:'../../images/bank/guangda.png'},
        {name: 'spdb', value: '浦发银行',src:'../../images/bank/pufa.png'},
        {name: 'cib', value: '兴业银行',src:'../../images/bank/xingye.png'},
        {name: 'ecitic', value: '中信银行',src:'../../images/bank/zhongxin.png'},
      ],
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    let currencylist = app.getList()
    let list = currencylist.filter((c)=>{
      return  c.key == options.key
    })
    this.setData({
        list:list[0]
    })
    this.setData({
        country:options.key
    })
    this.updataTradeBank(this.data.country)
  }, 
  navbar:function(e){
      this.setData({
         navbar: e.target.dataset.index
      })
      this.setData({
         tradeType: e.target.dataset.value
      })
      this.updataTradeBank(this.data.country)
  },
  //拉取数据
  updataTradeBank:function(options){
    let that= this
    wx.request({
			url: "https://api.fundusd.com/v1/exchanges/wxapp",
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
      data: {},
			success: (res) => {
        let bank = res.data.bank;
         let currentBank = [];
         let mybank = that.data.bank
         let tradeType = that.data.tradeType
        for(let j in bank){
          if(j == options){
              currentBank =  bank[j]
              for(let i = 0; i < currentBank.length;i++){
                 if(currentBank[i][tradeType] == "--"){
                    mybank[i].rate="--"
                    mybank[i].hidden = false
                 }else{
                    mybank[i].rate= (currentBank[i][tradeType]/100).toFixed(4)
                    mybank[i].hidden = false
                 }
              }
              that.setData({
                bank:mybank
              })
          }
        }
        //默认的值值
        let refer = res.data.refer;
        let _result = 0
        for(let j in refer){
          if(j == options){
              _result = (refer[j]/100).toFixed(4)
              that.setData({
                result:_result
              })
          }
        }
			},
			fail: (res) => {
				 wx.showToast({
					title: '数据请求失败',
					icon: 'loading',
					duration: 500
				});
			}
		})
  },
 //计算结果
  bankChoose:function(e){
    let bank = this.data.bank;
      var index = e.currentTarget.dataset.index;
    if(e.currentTarget.dataset.rate !== "--"){
      this.setData({
        result:e.currentTarget.dataset.rate
      })
      bank.forEach((c,i)=>{
        bank[i].hidden=false ;
      });
      bank[index].hidden=true;
    }
    this.setData({
      bank:bank
    })
  }
})