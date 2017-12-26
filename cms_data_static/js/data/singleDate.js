$(document).ready(function() {
    $('#reservation').daterangepicker({singleDatePicker: true,showDropdowns: true,startDate: moment().subtract('days', 7)}, function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
    });
    $('#reservation ').val(moment().subtract('days', 1).format('YYYY-MM-DD'));

});