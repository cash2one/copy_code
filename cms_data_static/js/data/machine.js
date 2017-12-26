$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_version','',getVersion,'get');
    var formdata={},qudaodata={},dataArr=[];
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('machine_push_v2',formdata,getData,'get');
    $('.qudao').change(function(){
        formdata.platform=$('.qudao>option:selected').html();
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
        base.data_conn('machine_push_v2',formdata,getData,'get');
    });
    function getData(e){
        var getDiv='';
        if(e.code==200){
            var result= e.reaults;
            if(result==''){
                $('.panel-body').hide();
                $('.noWord').show();
                return;
            }
            $('.noWord').hide();
            $('.panel-body').show();
            for(var i in result){
                getDiv+='<tr><td>'+result[i].date+'</td><td>'+result[i].theme_read+'</td><td>'+result[i].theme_click+'</td><td>'+result[i]["theme_click/read"]+'</td>';
                getDiv+='<td>'+result[i].kmeans_read+'</td><td>'+result[i].kmeans_click+'</td><td>'+result[i]["kmeans_click/read"]+'</td>';
                getDiv+='<td>'+result[i].cf_read+'</td><td>'+result[i].cf_click+'</td><td>'+result[i]['cf_click/read']+'</td></tr>';
                dataArr.push(resetJSON(result[i]));
            }
            $('.dataBody').html(getDiv);
            $('.page-content').css('height',$(document).height());
        }
    }
    function getCtype(e){
        var getSel='';
        if(e.code==200){
            var result= e.results;
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
                getsel+='<option value="'+result[i].name+'"> '+result[i].name+'</option>';
            }

            $('#version').html(getsel);

        }

        $('#version').selectpicker('refresh');
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
    var header=[
        [
            {title:"时间",field:"date"},{title:"主题模型推荐展示量",field:"theme_read"},{title:"主题模型推荐点击量",field:"theme_click"}, {field:"theme_click_read",title:"主题模型推荐点击率"},{field:"kmeans_read",title:"kmeans推荐展示量"},{title:"kmeans推荐点击量",field:"kmeans_click"},{field:"kmeans_click_read",title:"kmeans推荐点击率"},{field:"cf_click",title:"协同过滤推荐展示量"},{title:"协同过滤推荐点击量",field:"cf_read"},{field:"cf_click_read",title:"协同过滤推荐点击率"}
        ]
    ];
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