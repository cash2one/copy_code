$(function () {
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_version','',getVersion,'get');
    var formdata={},qudaodata={},dataArr=[];
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn("data_reference",formdata,getData,"get");
    $('.qudao').change(function(){
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
        formdata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);
        formdata.platform=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        formdata.version_text=MultiSelect($('.version>option')).substring(0, MultiSelect($('.version>option')).length - 1);
        base.data_conn('data_reference',formdata,getData,'get');
    });
    function getData(e){
        var getDiv='';
        var result= e.results;
        if(result==''){
            $('.panel-body').hide();
            $('.noWord').show();
            return;
        }
        $('.noWord').hide();
        $('.panel-body').show();
        for(var i in result){
            getDiv+='<tr><td>'+result[i].date+'</td><td>'+result[i].version_text+'</td><td>'+(result[i].DAU==null?"N":result[i].DAU)+'</td><td>'+(result[i].CPC==null?"N":parseFloat(result[i].CPC).toFixed(2))+'</td><td>'+(result[i].DDPC==null?"N":parseFloat(result[i].DDPC).toFixed(2))+'</td>';
            getDiv+='<td>'+(result[i].DVPC==null?"N":parseFloat(result[i].DVPC).toFixed(2))+'</td><td>'+(result[i].CTR==null?"N":result[i].CTR)+'</td><td>'+(result[i].UTR==null?"N":result[i].UTR)+'</td><td>'+(result[i]["new_user"]==null?"N":result[i]["new_user"])+'</td><td>'+(result[i].user_left_1==null?"N":parseFloat(result[i].user_left_1).toFixed(2))+'</td><td>'+(result[i].user_left_7==null?"N":parseFloat(result[i].user_left_7).toFixed(2))+'</td></tr>';
            dataArr.push(resetJSON(result[i]));
        }
        $(".dataBody").html(getDiv);
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
    (function(){
        //var getsel='';
        var getsel='<option value="All" selected> 全部</option><option value="Android"> Android</option><option value="IOS"> IOS</option>';
        $("#ptype").html(getsel);
        $('#ptype').selectpicker('refresh');
    })();
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
//    导出
    var header=[
        [
            {title:"时间",field:"date"},{title:"版本号",field:"version_text"},{title:"DAU",field:"DAU"}, {field:"CPC",title:"CPC人均日阅读量"},{field:"DDPC",title:"DDPC人均日停留时长(min)"},{title:"DVPC人均日游览量",field:"DVPC"},{field:"CTR",title:"CTR点展比"},{field:"UTR",title:"UTR价值dau占比"},{title:"日均新增",field:"new_user"},{field:"user_left_1",title:"次日留存"},{field:"user_left_7",title:"周留存"}
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