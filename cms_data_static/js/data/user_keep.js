$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_version','',getVersion,'get');
    var formdata={},qudaodata={},dataArr=[];
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('user_remain',formdata,getData,'get');
    $('.qudao').change(function(){
        formdata.platform=$('.qudao>option:selected').html();
        qudaodata.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        qudaodata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);
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
        formdata.ptype=MultiSelect($('.ptype>option')).substring(0, MultiSelect($('.ptype>option')).length - 1);
        formdata.version_text=MultiSelect($('.version>option')).substring(0, MultiSelect($('.version>option')).length - 1);
        base.data_conn('user_remain',formdata,getData,'get');
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
                getDiv+='<tr><td>'+result[i].date+'</td><td>'+result[i].all_count+'</td><td>'+(result[i]["1"]===null?"N":result[i]["1"])+'</td><td>'+(result[i]["2"]===null?"N":result[i]["2"])+'</td><td>'+(result[i]["3"]===null?"N":result[i]["3"])+'</td><td>'+(result[i]["4"]===null?"N":result[i]["4"])+'</td>';
                getDiv+='<td>'+(result[i]["5"]===null?"N":result[i]["5"])+'</td><td>'+(result[i]["6"]===null?"N":result[i]["6"])+'</td><td>'+(result[i]["7"]===null?"N":result[i]["7"])+'</td><td>'+(result[i]["14"]===null?"N":result[i]["14"])+'</td><td>'+(result[i]["30"]===null?"N":result[i]["30"])+'</td></tr>';
                dataArr.push(resetJSON(result[i]));
            }
            $('.dataBody').html(getDiv);
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
            {title:"时间",field:"date",rowspan:2},{title:"新增用户",field:"all_count",rowspan:2},{title:"N日留存率",field:"",colspan:9}
        ],
        [
            {field:"1",title:"+1日"},{field:"2",title:"+2日"},{title:"+3日",field:"3"},{field:"4",title:"+4日"},{field:"5",title:"+5日"},{field:"6",title:"+6日"},{field:"7",title:"+7日"},{field:"14",title:"+14日"},{field:"30",title:"+30日"}
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