var app = getApp()
Page({
  data: {
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
    tradeType:'xc_buy_price',
    mybank:''
  },
  onLoad:function(){
    // 生命周期函数--监听页面加载
    // this.updataTradeBank();
  },
  //银行类型的切换
  bankType:function(e){

    //改变active
    var index = e.currentTarget.dataset.index;
    let bank = this.data.bank;
    bank.forEach((c,i)=>{
      bank[i].checked=false ;
    });
    bank[index].checked=true;
    this.setData({
      bank:bank
    }) 
    //选择银行的类型
    this.setData({
        mybank:e.currentTarget.dataset.value
    })
    this.updataTradeBank();
  },
  //交易类型
   radioChange: function(e) {
      this.setData({
        tradeType:e.detail.value
      })
  },

  //拉取数据
  updataTradeBank:function(){
    let that= this
    wx.request({
			url: "https://api.fundusd.com/v1/exchanges/wxapp",
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
      data: {},
			success: (res) => {
        var currencylist = app.getList();
        currencylist = currencylist.filter((c) => {
          return c.display == true
        })
        let bank = res.data.bank;
        let chooseCurrency=[];
        let chooseBank = [];
        let _tradeType = that.data.tradeType;
        for(let j in bank){
           currencylist.forEach((c,i)=>{
              if(c.key == j){
                chooseBank=bank[j].filter((curr)=>{
                 return  curr.bank == that.data.mybank
                })
                chooseCurrency.push(c.key +":"+chooseBank[0][that.data.tradeType]);
                console.log(chooseCurrency);
              }
           })
        }
        // for(let i = 0 ; i ){

        // }
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
 
  confirm:function(){
      wx.navigateBack()
  }
})