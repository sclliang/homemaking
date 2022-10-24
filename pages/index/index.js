// index.js
// 获取应用实例
import { getCategoryList, getServiceList } from "../../api/home";

Page({
  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    currentIndex: 0,
    swiperList: [],
    page: 1,
    count: 10,
    serviceList: [],
    total: 0,
    category_id: "",
    loading: true,
  },

  showloading() {
    wx.showLoading({
      title: "加载中",
    });
    this.setData({
      loading: true,
    });
  },
  hideloading() {
    wx.hideLoading();
    this.setData({
      loading: false,
    });
  },

  async onLoad() {
    this.showloading();
    await this.loadCategoryList();
    await this.loadServiceList();
    this.hideloading();
  },

  //  内容区域左右滑动切换nabbar
  currentChange(e) {
    this.setData({
      currentIndex: e.detail.current,
      category_id: "",
      serviceList: [],
      page: 1,
    });
    this.showloading();
    this.loadServiceList().then(this.hideloading);
  },

  //  navbar点击切换内容区域
  onHandleNavBarClick(e) {
    this.setData({
      currentIndex: e.detail,
    });
  },

  //  获取分类信息
  async loadCategoryList() {
    const res = await getCategoryList();

    this.setData({
      swiperList: [{ id: 0, name: "全部" }, ...res],
    });
  },

  //获取服务列表信息
  async loadServiceList() {
    const res = await getServiceList({
      page: this.data.page,
      count: this.data.count,
      category_id: this.data.category_id,
      type: this.data.currentIndex,
    });

    this.setData({
      serviceList: [...this.data.serviceList, ...res.data],
      total: res.total,
    });
  },

  //上啦加载更多
  onReachBottom() {
    if (this.data.total <= this.data.serviceList.length) {
      return wx.showToast({
        title: "无更多数据",
        icon: "none",
        duration: 2000,
        mask: true,
      });
    }
    this.setData({
      page: this.data.page + 1,
    });
    this.loadServiceList();
  },

  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      serviceList: [],
    });
    this.loadServiceList().then(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000,
      });
    });
  },
  handleSwiperItem(e) {
    const id = e.currentTarget.dataset.item.id;
    this.showloading();
    this.setData({
      category_id: id,
      serviceList: [],
      page: 1,
    });
    this.loadServiceList().then(this.hideloading);
  },
});
