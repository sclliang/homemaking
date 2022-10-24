import { getServiceDetail, getServiceRating } from "../../api/home";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    itemData: {},
    isPublisher: false,
    ratingList: [],
    page: 1,
    count: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    if (options.data) {
      this.setData({
        id: options.data,
      });
    }
    this.loadServiceDetailData();
    this._checkRole();
    this.loadRatingList();
  },

  // 获取服务详情
  async loadServiceDetailData() {
    const res = await getServiceDetail(this.data.id);
    this.setData({
      itemData: res,
    });
  },

  // 获取当前登录用户信息
  _checkRole() {
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo && userInfo.id === this.data.itemData.publisher.id) {
      this.setData({
        isPublisher: true,
      });
    }
  },
  /**
   * 获取评价列表
   */
  async loadRatingList() {
    const res = await getServiceRating({
      service_id: this.data.id,
      page: this.data.page,
      count: this.data.count,
    });
    console.log(res);
    this.setData({
      ratingList: [...this.data.ratingList, ...res.data],
    });
  },

  // 点击评论图片显示大图
  handleImageClick(e){
    const arr = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index

    // current表示当前显示图片
    // arr表示总共显示哪些图片
    wx.previewImage({
      current: arr[index],
      urls: arr
      
    });
      
    
  }
});
