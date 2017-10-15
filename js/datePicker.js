(function(){
	//定义一个datepicker
	var datepicker = {};

	//数据获取
	datepicker.getMonthData = function(year,month){
		//定义一个返回结果的数组
		var ret = [];
		//如果未传入日期 使用当前日期  
		if((!year || !month) && month !=0 ){
			//获取当前日期
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth()+1;	
		}

		//定义日期对象 获取当月第一天
		var firstDay = new Date(year, month-1, 1);
		//获取当月第一天是周几
		var firstDayWeekDay = firstDay.getDay();
		//如果第一天是周日(0) 给其赋值为7
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;
		//根据本月第一天获取到年份月份
		year = firstDay.getFullYear();
		month = firstDay.getMonth()+1;

		//获取上个月的最后一天
		var lastDayOfLastMonth = new Date(year, month-1, 0);
		//存储上个月最后一天的日期
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		//在日历中显示上个月的天数  所以周和日期能够对应
		var preMonthDayCount = firstDayWeekDay - 1; 

		//获取当月最后一天
		var lastDay = new Date(year, month, 0);
		//存储当月最后一天的日期
		var lastDate = lastDay.getDate();

		//用循环获取当月数据
		for(var i=0; i<7*6; i++){
			//得到当前是哪一天 可能负值可能越界
			var date = i - preMonthDayCount + 1;
			//正常日期显示
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				//上一月
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate){
				//下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}
			
			if(thisMonth == 0) thisMonth = 12;
			if(thisMonth == 13) thisMonth = 1;
			
			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			})
		}
		return {
			year: year,
			month: month,
			days: ret
		};
	}

	window.datepicker = datepicker;
})();