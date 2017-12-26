$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_version','',getVersion,'get');
    var formdata={},qudaodata={},dataArr=[];
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    formdata.order='click_num';
    //formdata.platform=0;
    base.data_conn('channel_data_v2',formdata,getData,'get');
    $('.qudao').change(function(){
        formdata.platform=$('.qudao>option:selected').val();
        qudaodata.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        base.data_conn('get_version',qudaodata,getVersion,'get');
    });
    $('#reportrange').on('hide.daterangepicker', function() {
        var dates=$('.dates').html().split(' - ');
        formdata.begin_date=dates[0];
        formdata.end_date=dates[1];
    });
    $('.search-btn').click(function(){
        dataArr=[];
        formdata.platform=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        formdata.version_text=MultiSelect($('.version>option')).substring(0, MultiSelect($('.version>option')).length - 1);
        formdata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);

        base.data_conn('channel_data_v2',formdata,getData,'get');
    });
    $('.machine_click').click(function(){
        dataArr=[];
        formdata.order='machine_click';
        base.data_conn('channel_data_v2',formdata,getData,'get');
    });
    $('.artificial_click').click(function(){
        formdata.order='artificial_click';
        base.data_conn('channel_data_v2',formdata,getData,'get');
    });
    $('.hot_click').click(function(){
        formdata.order='hot_click';
        base.data_conn('channel_data_v2',formdata,getData,'get');
    });
    $('.common_click').click(function(){
        formdata.order='common_click';
        base.data_conn('channel_data_v2',formdata,getData,'get');
    });
    $('.click_num').click(function(){
        formdata.order='click_num';
        base.data_conn('channel_data_v2',formdata,getData,'get');
    });

    function getData(e){
        var getDiv='';
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
                getDiv+='<tr><td>'+parseInt(i)+'</td><td>'+result[i].channel+'</td><td>'+result[i].click_num+'</td><td>'+result[i].read_num+'</td><td>'+(result[i]["click/read"]===null?"N":result[i]["click/read"])+'</td><td>'+result[i].machine_click+'</td>';
                getDiv+='<td>'+result[i].machine_read+'</td><td>'+(result[i]["machine_click/read"]===null?"N":result[i]["machine_click/read"])+'</td><td>'+result[i].artificial_click+'</td><td>'+result[i].artificial_read+'</td><td>'+(result[i]["artificial_click/read"]===null?"N":result[i]["artificial_click/read"])+'</td><td>'+result[i].hot_click+'</td><td>'+result[i].hot_read+'</td>';
                getDiv+='<td>'+(result[i]["hot_click/read"]===null?"N":result[i]["hot_click/read"])+'</td><td>'+result[i].common_click+'</td><td>'+result[i].common_read+'</td><td>'+(result[i]["common_click/read"]===null?"N":result[i]["common_click/read"])+'</td></tr>';
                dataArr.push(resetJSON(result[i]));
            }
        }
        $('.dataBody').html(getDiv);
        $('.page-content').css('height',$(document).height());
    }
    function getCtype(e){
        var getSel='';
        if(e.code==200){
            var result= e.results;
            getSel+='<option value="All"> 全部</option>';
            for(var i in result){
                getSel+='<option value="'+result[i].name+'"> '+result[i].show_name+'</option>';
            }

            $('#qudao').append(getSel);

        }

        $('#qudao').selectpicker('refresh');
        //$('.version').selectpicker('show');
    }
    function getVersion(e){
        var getsel='';
        if(e.code==200){
            var result= e.results;
            getsel+='<option value="All"> 全部</option>';
            for(var i in result){
                getsel+='<option > '+result[i].name+'</option>';
            }

            $('#version').html(getsel);

        }
        $('#version').selectpicker('refresh');
    }
    function MultiSelect(data){
        var   selectedValue="";
        var   objSelect   =   data;
        for(var   i   =   0;   i   <   objSelect.length;   i++)
        {
            if   (objSelect[i].selected   ==   true)
                selectedValue   +=   objSelect[i].value   +   ",";
        }
        return selectedValue;
    }
    (function(){
        //var getsel='';
        var getsel='<option value="All" selected> 全部</option><option value="Android"> Android</option><option value="IOS"> IOS</option>';
        $("#ptype").html(getsel);
        $('#ptype').selectpicker('refresh');
    })();
    var header=[
        [
            {title:"频道",field:"channel",rowspan:2},{title:"点击量",field:"click_num",rowspan:2},{title:"展示量",field:"read_num",rowspan:2}, {field:"click_read",title:"点击/展示",rowspan:2},{field:"",title:"机器推荐",colspan:3},{title:"人工推荐",field:"",colspan:3},{field:"",title:"热点推荐",colspan:3},{field:"",title:"普通推荐",colspan:3}
        ],
        [
            {title:"点击量",field:"machine_click"},{title:"展示量",field:"machine_read"},{title:"点击/展示",field:"machine_click_read"},{title:"点击量",field:"artificial_click"},{title:"展示量",field:"artificial_read"},{title:"点击/展示",field:"artificial_click_read"},{title:"点击量",field:"hot_click"},{title:"展示量",field:"hot_read"},{title:"点击/展示",field:"hot_click_read"},{title:"点击量",field:"common_click"},{title:"展示量",field:"common_read"},{title:"点击/展示",field:"common_click_read"}
        ]
    ];
//        console.log(grid.datagrid("options").columns)
    $('#btn2').click(exportexcel);
    function exportexcel(filter) {
        console.log(dataArr)
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
