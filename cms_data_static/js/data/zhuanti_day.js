$(function(){
    var data={};
    data.date=$('#reservation').val();
    base.data_conn('topic_data_v3',data,getData,'get');
    $('#reservation').on('hide.daterangepicker', function() {
        data.date=$('#reservation').val();
    });
    $('.search-btn').click(function(){
        base.data_conn('topic_data_v3',data,getData,'get');
    });
    function getData(e){
        var getDiv='';
        if(e.code==200){
            var datas= e.results;
            if(datas==''){
                //alert('此日无专题');
                $('.panel-body').hide();
                $('.noWord').show();
                return;
            }
            $('.noWord').hide();
            $('.panel-body').show();
            for(var i in datas){
                if(datas[i].data!=''){
                    var datanum=datas[i]["data"];
                    getDiv+='<tr><td rowspan="'+datanum.length+'">'+datas[i].create_time+'</td><td rowspan="'+datanum.length+'">'+datas[i].topic_name+'</td><td>'+datanum[0]["ctype"]+'</td><td>'+datanum[0].ptype+'</td><td>'+datanum[0].click_num+'</td><td>'+datanum[0].show_num+'</td><td>'+(datanum[0]['click/show']===null?"N":datanum[0]['click/show'])+'</td><td>'+datanum[0].news_click_num+'</td><td>'+(datanum[0].click_percent==null?0:datanum[0].click_percent)+'</td></tr>';
                    for(var j=1;j<datanum.length;j++){
                        getDiv+='<tr><td>'+datanum[j].ctype+'</td><td>'+datanum[j].ptype+'</td><td>'+datanum[j].click_num+'</td><td>'+datanum[j].show_num+'</td><td>'+(datanum[j]['click/show']===null?"N":datanum[j]['click/show'])+'</td><td>'+datanum[j].news_click_num+'</td><td>'+(datanum[j].click_percent==null?0:datanum[j].click_percent)+'</td></tr>';
                    }
                }
            }
            $('.dataBody').html(getDiv);
            $('.page-content').css('height',$(document).height());
        }
    }
    function percentNum(num, num2) {
        return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
    }
    //console.log(percentNum(50,100))
});