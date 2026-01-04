    $(function(){
    $('#selectdate').datepicker({
		format: $("#dateFormat").html(),
		startDate: $("#dateStart").html(),
		endDate: $("#dateEnd").html(),
		startView: parseInt($("#dateStartView").html()),
		maxViewMode: parseInt($("#dateMaxView").html()),
		autoclose: true
    });
    $('#selectdate2').datepicker({
		format: $("#dateFormat").html(),
		startDate: $("#dateStart2").html(),
		endDate: $("#dateEnd2").html(),
		startView: parseInt($("#dateStartView").html()),
		maxViewMode: parseInt($("#dateMaxView").html()),
		autoclose: true
    });
	});
