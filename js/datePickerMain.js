(function(){

	var datepicker = window.datepicker;
	var monthData;
	var $wrapper;

	//渲染函数
	datepicker.buildUi = function(year, month){
		//获取一个月的数据
		monthData = datepicker.getMonthData(year, month);
		//console.log(monthData);
		var html ='<div class="ui-datepicker-header">'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
			'<span class="ui-datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'+
		'</div>'+
		'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<tr>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>';

				for(var i=0; i<monthData.days.length;i++){
					var date = monthData.days[i];
					//一周的第一天
					if(i%7 === 0){
						html += '<tr>';
					}
					html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
					//一周的最后一天
					if(i%7 === 6){
						html +='</tr>';
					}
				}

				html += '</tbody>'+
			'</table>'+
		'</div>';

		return html;
	};

	datepicker.render = function(direction){
		//开始year，month不存在
		var year,month;
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}

		if(direction === 'prev' ) month--;
		if(direction === 'next' ) month++;


		var html = datepicker.buildUi(year, month);
		//$input.innerHTML = html;
		//<div class="ui-datepicker-wrapper">
		//在页面生成wrapper
		if(!$wrapper){
			$wrapper = document.createElement('div');
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;

		if(typeof direction === 'object'){
			
			direction.parentNode.appendChild($wrapper);
			//direction.after($wrapper);

		}

		//document.body.appendChild($wrapper);
		
	};

	datepicker.init = function(input){
		
		//获取input
		var $input = document.querySelector(input);
		var isOpen = false;
		datepicker.render($input);

		//console.log($input.getBoundingClientRect());
		$input.addEventListener('click', function(e){
			e.stopPropagation();
			//判断是否开启
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				//样式和input绝对定位
				//console.log($input.clientWidth);
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height =$input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		},false);

		//如果给 按钮加事件每次都会销毁  导致无法执行
		$wrapper.addEventListener('click', function(e){
			e.stopPropagation();
			var $target = e.target;
			//如果点击的不是按钮则直接break
			if(!$target.classList.contains('ui-datepicker-btn')) return;
			//如果点击了按钮
			if($target.classList.contains('ui-datepicker-prev-btn')){
				//上个月
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				//下个月
				datepicker.render('next');
			}

		},false);

		//点击选择日期
		$wrapper.addEventListener('click', function(e){
			e.stopPropagation();
			//console.log(e);
			var $target = e.target;
			
			
			if($target.tagName.toLowerCase() !== 'td') return;
			//兼容ie
			if (!!window.ActiveXObject || "ActiveXObject" in window){
				var date = new Date(monthData.year, monthData.month - 1, $target.getAttribute('data-date'));
				//console.log($target.getAttribute('data-date'));
			}else{
			  	var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
			  	//console.log($target.dataset.date);
			}
			
			$input.value = format(date);
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;
		},false)

		//点击空白区关闭
		document.addEventListener('click', function () {
			if(isOpen){
				//console.log("打开"+isOpen);
				//$wrapper.remove();
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}
	      	
		});
		/* $input.on("click", function (event) {
		    //取消事件冒泡
		    var e = arguments.callee.caller.arguments[0] || event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
		    if (e && e.stopPropagation) {
		        // this code is for Mozilla and Opera
		        e.stopPropagation();
		    } else if (window.event) {
		        // this code is for IE
		        window.event.cancelBubble = true;
		    }
		});*/

	};

	function format(date){
		ret = '';
		var padding = function(num){
			if(num <= 9){
				return '0' + num;
			}
			return num;
		}
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());
		return ret;
	}




})();