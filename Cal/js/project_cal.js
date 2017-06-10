//creates the calendar
var now_float = new moment.utc();
var current = new moment.utc([now_float.format("YYYY"), now_float.format("MM") - 1, now_float.format("DD"), 0, 0, 0, 0]);
var begin = new moment.utc([2010, 4, 1, 0, 0, 0, 0]);


//Difference in months
var diff = current.diff(begin, 'months');
var current_cal = "#cal"
for (var month=0; month<=diff; month++){

	var month_str = current.format("MMMM 'YY");
	var month_id = current.format("MM") + "-" + current.format("YYYY");

	if (month > 12) {
		current_cal = "#cal2";
	}

	$(current_cal).append(
			$('<div/>', {
	            class: 'month-cal span2',
	            id: month_id,
	        })
		);

	$("#"+month_id).append(
			$('<div/>', {
	            class: 'month-str',
	            text: month_str,
	        })
		);

	var weekNumber = 1;

	//checks if we are in the current (unfinished) month
	var daysInMonth = current.format("D");

	if (current.format("MM") != now_float.format("MM")) {
		current.daysInMonth();
	}

	//loops through the days
	for (var day=0; day< daysInMonth; day++){

		$("#" + month_id).prepend(
				$('<div/>', {
		            class: 'day-cal ' + current.format("dd") + " week" + weekNumber,
		            title: current.format("dddd, MMMM Do YYYY"),
		            id: current.format("X")
	        	})
			);

		//increments the week number
		if (current.format("dd") == "Mo") {
			weekNumber++;
		}

		current.subtract(1, 'day');
	
	}

}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$.getJSON('/Cal/assets/project_events.json', function(data){
	$.each(data, function(id, evt) {
		evt_start_date = new moment.utc(evt.startdate).format("X");
		evt_end_date = new moment.utc(evt.enddate).format("X");
		evt_txts = evt["title"]
		if (evt["location"] != ""){
			evt_txts += " ("+ evt["location"] +")"
		}
		for (i = parseInt(evt_start_date); i<=parseInt(evt_end_date); i+=86400){
			if (evt.url != "") {
				$('#'+i).attr('onclick', "window.open('" + evt.url + "', '_blank')")
						.addClass("cursor")

			}
			$('#' + i).addClass(evt["type"])
					  .attr("data-toggle", "tooltip")
					  .attr("data-placement", "top")
					  .attr("title", evt_txts)
			$('#' + i).tooltip()
		}
	})
})

$('.note_anchor').each(function(){
	var currentIdName = $(this).attr("id")
	var footnote = $( "a[href=" + currentIdName + "]" )
	$(this).attr("data-toggle", "tooltip")
		   .attr("data-placement", "right")
		   .attr("title", footnote.attr('data-text'))
	$(this).tooltip({
  		template: '<div class="tooltip large-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
	});
});