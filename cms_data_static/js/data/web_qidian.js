$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    var formdata={};
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('web_data',formdata,getWebdata,'get');
    $('#reportrange').on('hide.daterangepicker', function() {
        var dates=$('.dates').html().split(' - ');
        formdata.begin_date=dates[0];
        formdata.end_date=dates[1];
    });
    $('.search-btn').click(function(){
        formdata.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        base.data_conn('web_data',formdata,getWebdata,'get');
    });
    function getCtype(e){
        var getSel='';
        if(e.code==200){
            var result= e.results;
            getSel+='<option value="All" selected> 全部</option>';
            for(var i in result){
                getSel+='<option value="'+result[i].name+'"> '+result[i].show_name+'</option>';
            }
            $('#qudao').append(getSel);
        }
        $('#qudao').selectpicker('refresh');
    }
    function getWebdata(e){
        var getData='';
        if(e.code==200){
            var result= e.results;
            if(result==''){
                $('.panel-body').hide();
                $('.noWord').show();
                return;
            }
            $('.noWord').hide();
            $('.panel-body').show();
            for(var i in result){
                getData+='<tr><td>'+result[i].date+'</td><td>'+result[i].uv+'</td><td>'+result[i].news_click_num+'</td><td>'+result[i].avg_time+'</td>';
                getData+='<td>'+result[i].news_relate_click_num+'</td><td>'+result[i].news_relate_show_num+'</td><td>'+result[i]["news_relate_show/click"]+'</td><td>'+result[i].relate_pull_num+'</td></tr>';
            }
            $('.dataBody').html(getData);
        }
    }
    function MultiSelect(data){
        var   selectedValue   =   "";
        var   objSelect   =   data;
        for(var   i   =   0;   i   <   objSelect.length;   i++)
        {
            if   (objSelect[i].selected   ==   true)
                selectedValue   +=   objSelect[i].value   +   ",";
        }
        return selectedValue;
    }
});