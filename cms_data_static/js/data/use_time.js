$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_version','',getVersion,'get');
    var formdata={},qudaodata={},dataArr=[];
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('app_use',formdata,getData,'get');
    $('.qudao').change(function(){
        formdata.platform=$('.qudao>option:selected').html();
        qudaodata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);
        qudaodata.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        base.data_conn('get_version',qudaodata,getVersion,'get');
    });
    $('.ptype').change(function(){
        qudaodata.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        qudaodata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);
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
        base.data_conn('app_use',formdata,getData,'get');
    });
    function getData(e){
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
                getData+='<tr><td>'+result[i].date+'</td><td>'+result[i].platform+'</td><td>'+result[i].ptype+'</td><td>'+result[i].version_text+'</td><td>'+result[i].uv+'</td><td>'+(result[i]['utime/min']===null?"N":result[i]['utime/min'])+'</td></tr>';
                dataArr.push(resetJSON(result[i]));
            }
            $('.dataBody').html(getData);
        }
    }
    (function(){
        //var getsel='';
        var getsel='<option value="All" selected> 全部</option><option value="Android"> Android</option><option value="IOS"> IOS</option>';
        $("#ptype").html(getsel);
        $('#ptype').selectpicker('refresh');
    })();
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
            {title:"时间",field:"date"},{title:"渠道",field:"platform"},{title:"客户端",field:"ptype"}, {field:"version_text",title:"版本号"},{field:"uv",title:"有效UV"},{title:"平均日使用时长（min）",field:"utime_min"}
        ]
    ];
    $('#btn2').click(exportexcel);
    function exportexcel(filter) {
        //console.log(dataArr)
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