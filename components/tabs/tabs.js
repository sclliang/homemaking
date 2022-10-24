Component({
	properties: {
		tabs:{
			type:Array,
			value:[]
		},
		currentIndex:{
			type:Number,
			value:0
		}
	},
	data: {

	},
	methods: {
		onHandleItem(e){
			const index = e.currentTarget.dataset.index
			this.setData({
				currentIndex:index
			})
			this.triggerEvent('click',index)
		},
	}
});
