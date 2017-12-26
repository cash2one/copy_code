$(function(){
    var formdata={},qudaodata={},dataArr=[],qudaodata2={};
    //base.data_conn('web_ad_daily','',getCtype,'get');
    qudaodata.ptype="Web";
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_ad_platform',qudaodata,adPlatform,'get');
    base.data_conn('get_ad_position',qudaodata,adPosition,'get');

    //formdata.ptype='Android';
    //formdata.source='gdtSDK';
    var dates=$('.dates').html().split(' - ');
    formdata.begin_date=dates[0];
    formdata.end_date=dates[1];
    base.data_conn('web_ad_daily',formdata,getData,'get');
    $('.qudao').change(function(){
        qudaodata2.ptype="Web";
        qudaodata2.ctype=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);console.log("aaa"+qudaodata.ctype)
        //base.data_conn('get_version',qudaodata2,getVersion,'get');
        base.data_conn('get_ad_platform',qudaodata2,adPlatform,'get');
        base.data_conn('get_ad_position',qudaodata2,adPosition,'get');
    });

    $('#reportrange').on('hide.daterangepicker', function() {
        var dates=$('.dates').html().split(' - ');
        formdata.begin_date=dates[0];
        formdata.end_date=dates[1];
    });
    $('.search-btn').click(function(){
        dataArr=[];
        formdata.platform=MultiSelect($('.qudao>option')).substring(0, MultiSelect($('.qudao>option')).length - 1);
        formdata.source=MultiSelect($('.ad_platform>option')).substring(0, MultiSelect($('.ad_platform>option')).length - 1);
        formdata.aid=MultiSelect($('.ad_position>option')).substring(0, MultiSelect($('.ad_position>option')).length - 1);
        formdata.ptype="Web";
        base.data_conn('web_ad_daily',formdata,getData,'get');
    });
    function getData(e){
        var getDiv='',r_total= 0,show_total= 0,click_total=0;
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
                getDiv+='<tr><td>'+data[i].date+'</td><td>'+data[i].ctype+'</td><td>'+data[i].version_text+'</td><td>'+data[i].source+'</td><td>'+data[i].aid+'</td>';
                getDiv+='<td>'+data[i].r_times+'</td><td>'+data[i].r_num+'</td><td>'+data[i].r_suc+'</td><td>'+data[i].r_fail+'</td><td>'+data[i].show_num+'</td>';
                getDiv+='<td>'+data[i].s_ads_num+'</td><td>'+data[i].ads_num+'</td><td>'+data[i].click_num+'</td><td>'+(data[i].show_per===null?"N":data[i].show_per)+'</td><td>'+(data[i].click_per===null?"N":data[i].click_per)+'</td></tr>';
                r_total+=parseInt(data[i].r_times);
                show_total+=parseInt(data[i].show_num);
                click_total+=parseInt(data[i].click_num);
                dataArr.push(resetJSON(data[i]));
            }
            $('.dataBody').html(getDiv);
            $('.r_total').html(r_total);
            $('.show_total').html(show_total);
            $('.click_total').html(click_total);
            $('.click_pre').html(parseFloat(click_total/show_total).toFixed(2));

        }
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
    function adPlatform(e){
        var getsel='';
        if(e.code==200){
            var result= e.results;
            getsel+='<option value="All"> 全部</option>';
            for(var i in result){
                getsel+='<option > '+result[i].name+'</option>';
            }

            $('#ad_platform').html(getsel);

        }

        $('#ad_platform').selectpicker('refresh');
    }
    function adPosition(e){
        var getsel='';
        if(e.code==200){
            var result= e.results;
            getsel+='<option value="All"> 全部</option>';
            for(var i in result){
                getsel+='<option > '+result[i].position+'</option>';
            }

            $('#ad_position').html(getsel);

        }

        $('#ad_position').selectpicker('refresh');
    }
    function MultiSelect(data){
        var   selectedValue="";
        var   objSelect=data;
        for(var i=0;i<objSelect.length;i++)
        {
            if(objSelect[i].selected==true)
                selectedValue+=objSelect[i].value+",";
        }
        return selectedValue;
    }
    var header=[
        [
            {title:"时间",field:"date"},{title:"渠道",field:"ctype"},{title:"版本号",field:"version_text"}, {field:"source",title:"平台方"},{field:"aid",title:"广告位"},{title:"请求数",field:"r_times"},{field:"r_num",title:"1次请求广告数"},{field:"r_suc",title:"请求返回成功数"},{field:"r_fail",title:"请求返回失败数"},{field:"show_num",title:"展现数"},{field:"ads_num",title:"独立展现数"},{field:"ad_num",title:"独立广告数"},{field:"click_num",title:"点击数"},{field:"show_per",title:"展示率"},{field:"click_per",title:"点击率"}
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