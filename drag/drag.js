(function(win){

	function Drag(opts){
		this.init(opts);
	};

	Drag.prototype = {
		constructor: Drag,

		options: {
			container: '',
			data: ['应用1','应用2','应用3','应用4','应用5','应用6'], //可以是数据，也可以是html标签
			className: 'item'
		},

		init: function(opts){
			$.extend(this.options, opts);
			this.$el = $(this.get('container'));
			this._render();
			this._bindEvent();
		},

		get: function(key){
			return this.options[key];
		},

		_render: function(){
			var me = this, lis = '',
				data = me.get('data') || [];
			for(var i=0,len=data.length;i<len;i++) lis+='<li class="drag-item" id="drag-item-'+i+'">'+ data[i]+'</li>';
			me.$el.append(lis)
			      .find('li').attr('draggable',true)
			           		 .addClass(this.get('className'));
		},

		_bindEvent: function(){
			var me = this,
				$lis = $('li', me.$el),
				events = ['dragstart', 'dragenter', 'dragover', 'drop'];
			$.each(events, function(index, item){
				$lis.on(item, function(e){
					me['_'+item+'Handle'] && me['_'+item+'Handle'](e);
				});
			})
		},

		_dragstartHandle: function(e){
			var me = this;
			me.$drag = $(e.currentTarget);
		},

		_dragenterHandle: function(e){
			var me = this;
			me.$drop = $(e.currentTarget);
			if(me.$drag.attr('id') !== me.$drop.attr('id')){
				me._createMask();
				if(me.$drag.index()<me.$drop.index()) me.$drag.insertAfter(me.$drop);
				else me.$drag.insertBefore(me.$drop);
			}
		},

		//持续发生 new 在拖动元素时，每隔 350 毫秒会触发 ondragover 事件。
		_dragoverHandle: function(e){
			e.preventDefault();
			return false;
		},

		_dropHandle: function(e){
			console.log(222);
			this.$mask.remove();
		},

		_createMask: function(){
			var $mask = this.$mask = $('<div class="drag-mask"></div>');
			$mask.css({
				position: 'absolute',
				width: this.$drop.outerWidth(),//new
				height: this.$drop.outerHeight(),//new
				left: this.$drop.position().left,
				top: this.$drop.position().top+this.$el.scrollTop(),//new
				backgroundColor: '#fff'
			});
			this.$el.find('.drag-mask').remove();
			this.$el.append($mask);
		}


	};

	win.Drag = Drag;
})(window);