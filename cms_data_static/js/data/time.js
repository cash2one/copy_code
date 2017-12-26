$(function(){
    var data={},dataArr=[];
    data.begin_date=$('#reservation').val();
    base.data_conn('pv_hourly',data,getData,'get');
    $('#reservation').on('hide.daterangepicker', function() {
        data.begin_date=$('#reservation').val();
    });
    $('.search-btn').click(function(){
        base.data_conn('pv_hourly',data,getData,'get');
    });
    function getData(e){
        var getData='';
        if(e.code==200){
            var data= e.results;
            if(data==''){
                $('.panel-body').hide();
                $('.noWord').show();
                return;
            }
            $('.noWord').hide();
            $('.panel-body').show();
            for(var i in data){
                getData+='<tr><td>'+data[i].date+'</td><td>'+data[i]["item"].hour+'</td><td>'+data[i].platform+'</td><td>'+data[i].version+'</td><td>'+data[i]['item'].pv_prod+'</td><td>'+data[i]['item'].pv_web+'</td><td>'+data[i]['item'].pv_other+'</td><td>'+data[i]['item'].uv_prod+'</td>';
                getData+='<td>'+data[i]['item'].uv_web+'</td><td>'+parseFloat(data[i]['item']['pv/uv']).toFixed(3)+'</td><td>'+data[i]['item']['Android'].pv+'</td><td>'+data[i]['item']['Android'].pv_feed+'</td><td>'+data[i]['item']['Android'].pv_detail+'</td><td>'+data[i]['item']['Android'].pv_channel+'</td><td>'+data[i]['item']['Android'].uv+'</td><td>'+parseFloat(data[i]['item']['Android']['pv/uv']).toFixed(3)+'</td>';
                getData+='<td>'+data[i]['item']['Ios'].pv+'</td><td>'+data[i]['item']['Ios'].pv_feed+'</td><td>'+data[i]['item']['Ios'].pv_detail+'</td><td>'+data[i]['item']['Ios'].pv_channel+'</td><td>'+data[i]['item']['Ios'].uv+'</td><td>'+parseFloat(data[i]['item']['Ios']['pv/uv']).toFixed(3)+'</td><td>'+data[i]['item']['value_uv']+'</td></tr>';
                dataArr.push(resetJSON(data[i]));
            }
            $('.dataBody').html(getData);
            $('.page-content').css('height',$(document).height());
        }
    }
//    导出
    var header=[
        [
            {title:"时间",field:"date",rowspan:2},{title:"小时",field:"itemhour",rowspan:2},{title:"渠道",field:"platform",rowspan:2},{title:"版本号",field:"version",rowspan:2}, {field:"",title:"总PV",colspan:3},{field:"",title:"UV",colspan:2},{title:"PV/UV",field:"itempv_uv",rowspan:2},{field:"",title:"安卓总PV",colspan:4},{field:"itemAndroiduv",title:"安卓UV",rowspan:2},{title:"安卓PV/UV",field:"itemAndroidpv_uv",rowspan:2},{field:"",title:"IOS PV",colspan:4},{field:"itemIosuv",title:"IOS UV",rowspan:2},{title:"IOS PV/UV",field:"itemIospv_uv",rowspan:2},{title:"价值UV",field:"itemvalue_uv",rowspan:2}
        ],
        [
            {title:"产品PV",field:"itempv_prod"},{title:"网页PV",field:"itempv_web"},{title:"第三方",field:"itempv_other"},{title:"产品总UV",field:"itemuv_prod"},{title:"网页UV",field:"itemuv_web"},{title:"总",field:"itemAndroidpv"},{title:"列表",field:"itemAndroidpv_feed"},{title:"详情",field:"itemAndroidpv_detail"},{title:"频道",field:"itemAndroidpv_channel"},{title:"总",field:"itemIospv"},{title:"列表",field:"itemIospv_feed"},{title:"详情",field:"itemIospv_detail"},{title:"频道",field:"itemIospv_channel"}
        ]
    ];
    $('#btn2').click(exportexcel);
    function exportexcel(filter) {
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