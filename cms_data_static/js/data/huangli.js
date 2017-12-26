$(function(){
    var formdata={},qudaodata={},dataArr=[];
    qudaodata.ctype="huangli";
    base.data_conn('get_version',qudaodata,getVersion,'get');
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('statements',formdata,getData,'get');

    $('#reportrange').on('hide.daterangepicker', function() {
        var dates=$('.dates').html().split(' - ');
        formdata.begin_date=dates[0];
        formdata.end_date=dates[1];
    });
    $('.search-btn').click(function(){
        dataArr=[];
        formdata.version_text=MultiSelect($('.version>option')).substring(0, MultiSelect($('.version>option')).length - 1);
        if(formdata.version_text.match('shoulong')){
            formdata.version_text=formdata.version_text.replace("shoulong","");
            if (formdata.version_text.substr(0,1)==',') formdata.version_text=formdata.version_text.substr(1);
            formdata.gather=true;
        }else{
            formdata.gather="";
        }
        base.data_conn('statements',formdata,getData,'get');
    });
    function getData(e){
        if(e.code==200){
            var results= e.results,getData='',uv_total=0,cost_total= 0,pv_total=0;
            if(results==''){
                $('.panel-body').hide();
                $('.noWord').show();
                return;
            }
            $('.noWord').hide();
            $('.panel-body').show();
            for(var i in results){
                if(results[i]!=null){
                    getData+='<tr><td>'+results[i].date+'</td><td>'+results[i].version_text+'</td><td>'+results[i].once+'</td><td>'+results[i].twice+'</td><td>'+results[i].three_times+'</td><td>'+results[i].four_times+'</td><td>'+results[i].five_times+'</td><td>'+results[i].five_times_above+'</td><td>'+(results[i].uv==undefined?"N":results[i].uv)+'</td><td>'+(results[i].pv==undefined?"N":results[i].pv)+'</td><td>'+(results[i].cost==undefined?"N":results[i].cost)+'</td></tr>';
                    uv_total+=(results[i].once+results[i].twice+results[i].three_times+results[i].four_times+results[i].five_times+results[i].five_times_above);
                    //uv_total+=(results[i].uv==undefined?0:results[i].uv);
                    cost_total+=(results[i].cost==undefined?0:results[i].cost);
                    pv_total+=(results[i].pv==undefined?0:results[i].pv);
                    dataArr.push(resetJSON(results[i]));
                }

            }
            if(pv_total==0){
                $('.pv_show').hide();
            }else{
                $('.pv_show').show();
                $('.pv_total').html(pv_total+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            }
            $('.uv_total').html(uv_total);
            $('.cost_total').html(cost_total);
            $('.dataBody').html(getData);
            $('.page-content').css('height',$(document).height());
        }
    }
    function getCtype(e){
        var getSel='';
        if(e.code==200){
            var result= e.results;

            for(var i in result){
                getSel+='<option > '+result[i].name+'</option>';
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
            getsel+='<option value="shoulong">收拢</option>';
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
            {title:"时间",field:"date"},{title:"版本号",field:"version_text"},{title:"1次请求uv数",field:"once"},{title:"2次请求uv数	",field:"twice"}, {field:"three_times",title:"3次请求uv数	"},{field:"four_times",title:"4次请求uv数	"},{title:"5次请求uv数",field:"five_times"},{field:"five_times_above",title:">5次请求uv数"},{field:"uv",title:"总UV"},{title:"滑动PV",field:"pv"},{field:"cost",title:"计入支出（元）"}
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