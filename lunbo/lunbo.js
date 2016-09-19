(function(win){

	function Lunbo(opts){
		if(opts) $.extend(this.options, opts);
		this.init();
	}	

	var obj = {

		options: {
			urls: [],
			
		},

		get: function(key){
			return this.options[key];
		},

		init: function(){
			this.$el = $(this.get('wrapper'));
			this.render();
			//this.moveToLeft();
		},

		render: function(){
			var imgarr = this.get('urls'),
				imghtml = '';
			for(var i = 0; i<imgarr.length; i++){
				imghtml+='<img src="'+imgarr[i]+'">';
			}
			this.$el.html(imghtml);
			this.$imgs = $('img',this.$el);
		},

		moveToLeft: function(){
			this.$imgs.each(function(){
				switch($(this).index()){
					case 0:
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
				}
				var action = {
					'left'    : '0px',
					'z-index' : '3',
					'width'  : '190px',
					'opacity' : '0.5'
				};
				$(this).animate(action,1000);
			});
		},

		moveToRight: function(){

		}

	}

	$.extend(Lunbo.prototype, obj);

	win.Lunbo = Lunbo;

})(window);