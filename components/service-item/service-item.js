Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    onServiceItemClick() {
      wx.setStorageSync(
        "serviceData",
        JSON.stringify(this.properties.itemData)
      );
      wx.navigateTo({
        url:
          "/subpkg/service-detail/service-detail?data=" +this.properties.itemData.id,
      });
    },
  },
  options: {},
});
