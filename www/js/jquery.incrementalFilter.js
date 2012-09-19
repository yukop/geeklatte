(function($) {
	var IncrementalFilter = function(params){
		var setting = this.setting = {
			input: undefined,
			items: undefined,
			doLoop: true,
			doMigemo: true,
			searchScope: '*',
			minChars: 1,
			useHighlight: true,
			foundCounter: undefined,
			totalCounter: undefined,
			highlightElem: $('<mark class="highlight" />'),
			foundClass: 'found',
			zeroClass: 'zero'
		}
		$.extend(setting,params)
	
		this.input = $(setting.input);
		this.items = $(setting.items);
		this.minChars = setting.minChars;
		if(setting.foundCounter){
			this.totalCounter = setting.totalCounter;
			this.foundCounter = new IncrementalFilter.Counter(setting);
		}
		this.formerQuery = '';
		this.itemData = [];
		this.init();
	}
	
	IncrementalFilter.prototype = {
	
		makeData: function(){
			var that = this;
			this.items.each(function(){
				var obj = [$(this)]
				if($(this).is('dt')){
					obj.push($(this).next())
				}
				that.itemData.push(new IncrementalFilter.SearchedItem(obj,that.setting));
			})
			if(this.foundCounter){
				this.foundCounter.refresh(this.itemData.length);
				if(this.totalCounter){
					$(this.totalCounter).html(this.foundCounter.all)
				}
			}
		},
		
		processQuery: function(query){
			var tempq = this.escapeQuery(query)
			tempq = $.trim(tempq).split(/\s+/);
			var queries = []
		
			for(var i=0,l=tempq.length;i<l;i++){
				for(var j=0,m=tempq.length;j<m;j++){
					if(i!=j && tempq[i] && (tempq[i] == tempq[j]
					   || RegExp(tempq[i]).test(tempq[j])
					   || tempq[i].length < this.minChars)){
						tempq.splice(i,1)
						l = m = tempq.length;
					}
				}
				if(tempq[i]){
					queries.push(tempq[i])
				}
			}
	
			if(queries.join(' ') != this.formerQuery){
				this.search(queries);
				this.formerQuery = queries.join(' ');
			}
		},
		
		escapeQuery: function(query){
			var escapeChars = '.+*^$?()[]{}';
			var res = query;
			for(var i=0,l=escapeChars.length;i<l;i++){
				var ec = escapeChars.charAt(i);
				res = res.replace(RegExp('\\'+ec,'g'),'\\'+ec);
			}
			return res;
		},
	
		search: function(queries){
			var that = this;
			var count = 0;
			$(that.itemData).each(function(){
				var self = this;
				var matchCount = 0;
				$.each(queries,function(){
					if(RegExp(this,'i').test(self.text))
						matchCount++;
				})
				if(matchCount == queries.length){
					this.showItem()
					this.clearHighlight(function(){
						$.each(queries,function(){
							self.highlightWord(this)
						})
					});
					count++;
				}else{
					this.hideItem();
				}
			})
			if(this.foundCounter){
				this.foundCounter.refresh(count)
			}
		},
		
		reset: function(){
			var that = this;
			$(this.itemData).each(function(){
				this.showItem();
				this.clearHighlight();
				if(that.foundCounter){
					that.foundCounter.reset();
				}
			})
		},
	
		setEvent: function(){
			var that = this;
			var search = function(){
				var val = that.input.val();
				if(val.length >= that.minChars){
					that.processQuery(val)
				}else{
					that.reset();
				}
			}

			this.input.bind('keyup',search)
			if(that.setting.doLoop){
				var loop = setInterval(search,500);
			}
		},
	
		init: function(){
			this.makeData();
			this.setEvent();
			if(this.input.val().length >= this.minChars){
				this.processQuery(this.input.val())
			}
		}
	}
	
	/**
	 *@param obj {array}
	 **/
	IncrementalFilter.SearchedItem = function(obj,setting){
		this.useHighlight = (setting.useHighlight && $.fn.highlightText && $.fn.removeOuterTag)
		if(this.useHighlight){
			this.highlightElem = setting.highlightElem || $('<mark class="highlight" />');
			this.highlightExpr = /^<(\w+)/.exec($('<div />').append(this.highlightElem).html())[1]
							   + '.'+this.highlightElem.attr('class').split(/\s/).join('.');
		}
		this.text = '';
		this.obj = [];
		for(var i=0,l=obj.length;i<l;i++){
			var temp = obj[i];
			this.obj[i] = {'elem':temp,'orgsrc':temp.html()}
			this.text += obj[i].text();
		}
	}
	
	IncrementalFilter.SearchedItem.prototype = {
		hideItem: function(){
			$(this.obj).each(function(){
				this.elem.hide();
			})
			return this;
		},
	
		showItem: function(){
			$(this.obj).each(function(){
				this.elem.show();
			})
			return this;
		},
	
		clearHighlight: function(callback){
			if(!this.useHighlight) return this;
			var that = this;
			$(this.obj).each(function(){
				$(that.highlightExpr,this.elem).removeOuterTag()
			})
			if(callback) callback();
			return this;
		},
	
		highlightWord: function(word){
			if(!this.useHighlight) return this;
			var that = this;
			var query = new RegExp(word,'gi')
			$(this.obj).each(function(){
				this.elem.highlightText(query,that.highlightElem)
			})
			return this;
		}
	}
	
	IncrementalFilter.Counter = function(setting){
		if(!setting || !setting.foundCounter) return undefined;
		this.obj = $(setting.foundCounter);
		this.foundClass = setting.foundClass || 'found';
		this.zeroClass = setting.zeroClass || 'zero';
		this.all = undefined;
		
		this.refresh = function(count){
			this.obj.html(count);
			if(!this.all){
				this.all = count;
			}
			
			if(count == 0){
				this.zero()
			}else if(count < this.all){
				this.highlight();
			}
		}
	
		this.reset = function(){
			this.refresh(this.all);
			this.obj
				.removeClass(this.foundClass)
				.removeClass(this.zeroClass)
		}
	
		this.highlight = function(){
			this.obj
				.removeClass(this.zeroClass)
				.addClass(this.foundClass)
		}
	
		this.zero = function(){
			this.obj
				.removeClass(this.foundClass)
				.addClass(this.zeroClass)
		}
		
		return this;
	}

	$.fn.incrementalFilter = function(params){
		return this.each(function(){
			if(typeof params == 'string' || params.size){
				new IncrementalFilter({input:$(this),items:params})
			}else if(typeof params == 'object'){
				params.input = $(this);
				new IncrementalFilter(params)
			}
		});
	};
})(jQuery);