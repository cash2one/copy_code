$(function(){
    var formdata={},dataArr=[];
    //formdata.data=moment().subtract('days',1);console.log(formdata.data)
    formdata.date=$('#reservation').val();
    base.data_conn('top_news','',getData,'get');
    $('#reservation').on('hide.daterangepicker', function() {
        formdata.date=$('#reservation').val();
    });
    $('.search-btn').click(function(){
        dataArr=[];
        base.data_conn('top_news',formdata,getData,'get');
    });
    function getData(e){
        var getDiv='',sTitle='',fTitle='';
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
                var platform_data=result[i].platform_data;


                getDiv+='<tr><td>'+(parseInt(i)+1)+'</td><td>'+result[i].title+'</td><td>'+result[i].channel+'</td><td>'+result[i]["click"]+'</td><td>'+result[i].show_num+'</td><td>'+(result[i]["click/show"]===null?"N":result[i]["click/show"])+'</td>';
                for(var k in platform_data){
                    getDiv+='<td>'+platform_data[k].click_num+'</td><td>'+platform_data[k].show_num+'</td><td>'+(platform_data[k]['click/show']===null?"N":platform_data[k]['click/show'])+'</td>';
                }
                getDiv+='</tr>';
                dataArr.push(resetJSON(result[i]));
            }
            fTitle+='<th rowspan="2">序号</th><th rowspan="2">新闻标题</th><th rowspan="2">频道</th><th rowspan="2">总点击量</th><th rowspan="2">总展示量</th><th rowspan="2">总点击/展示</th>';
            for(var j in result[0].platform_data){
                fTitle+='<th colspan="3">'+result[0].platform_data[j].platform_name+'</th>';
                sTitle+='<th>点击量</th><th>展示量</th><th>点击/展示</th>';
            }
            $('.fTitle').html(fTitle);
            $('.sTitle').html(sTitle);
            $('.dataBody').html(getDiv);
            $('.page-content').css('height',$(document).height());
        }
    }
    function percentNum(num, num2) {
        return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
    }

    var header=[
        [
            {title:"新闻标题",field:"title",rowspan:2},{title:"频道",field:"channel",rowspan:2}, {field:"click",title:"总点击量",rowspan:2},{field:"show_num",title:"总展示量",rowspan:2},{title:"总点击/展示",field:"click_show",rowspan:2},{field:"",title:"baipai-Android",colspan:3},{field:"",title:"安卓UV",colspan:3},{title:"安卓PV/UV",field:"",colspan:3},{field:"",title:"IOS PV",colspan:3}
        ],
        [
            {title:"点击量",field:"platform_data0click_num"},{title:"展示量",field:"platform_data0show_num"},{title:"点击/展示",field:"platform_data0click_show"},{title:"点击量",field:"platform_data1click_num"},{title:"展示量",field:"platform_data1show_num"},{title:"点击/展示",field:"platform_data1click_show"},{title:"点击量",field:"platform_data2click_num"},{title:"展示量",field:"platform_data2show_num"},{title:"点击/展示",field:"platform_data2click_show"},{title:"点击量",field:"platform_data3click_num"},{title:"展示量",field:"platform_data3show_num"},{title:"点击/展示",field:"platform_data3click_show"}
        ]
    ];
//        console.log(grid.datagrid("options").columns)
    $('#btn2').click(exportexcel);
    function exportexcel(filter) {
        console.log(dataArr);
        var obj = $.ExportExcelDlg({
            HeadInfo: header,
            RowInfo: dataArr,
            RowStart: 1,
            ColumStart: 1,
            SheetName: 'sheet名字',
            //MainTitle: { Displayname: '主标题', Alignment: 'Center' },
            //SecondTitle: { Displayname: '父标题', Alignment: 'Right' },
            SaveName: "js导出excel",
            Swf: 'ExportExcel.swf'
        });
        //obj.ExportExcelDlg('open');
    }
});