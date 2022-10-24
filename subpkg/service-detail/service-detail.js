// subpkg/service-detail/service-detail.js
import { getServiceDetail } from "../../api/home";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    itemData: {},
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
  },

  async loadServiceDetailData() {
    const res = await getServiceDetail(this.data.id);
    this.setData({
      itemData: res,
    });
  },
});
