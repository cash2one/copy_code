$(function(){
    getData('http://bdp.deeporiginalx.com/v2/re/top?ptype=1&ctype=1');
    var ptype,ctype,dataArr=[];
    $('#ptype,#ctype').change(function(){
//        console.log($('#ptype>option:selected').val()+'--'+$('#ctype>option:selected').val());
        ptype=$('#ptype>option:selected').val();
        ctype=$('#ctype>option:selected').val();


    });
    $('.search-btn').click(function(){
        dataArr=[];
        getData('http://bdp.deeporiginalx.com/v2/re/top?ptype='+ptype+'&ctype='+ctype);
    });
    //$('.search-btn').click(function(){
    //    getData('http://bdp.deeporiginalx.com/v2/re/top?ptype='+ptype+'&ctype='+ctype);
    //})
    function getData(url){
        $.ajax({
            url:url,
            dataType:'json',
            type:'get',
            async:true,
            success:function(e){
                var data= e.data,dataDiv='';
                for(var i in data){
                    var title=data[i]['title'];
                    var clickcount=data[i]['clickcount'];
                    var showcount=data[i]['showcount'];
//                    alert(typeof (i));
                    dataDiv+='<tr><td>'+(parseInt(i)+1)+'</td><td>'+title+'</td><td>'+clickcount+'</td><td>'+showcount+'</td><td>'+(showcount==0?0:percentNum(clickcount,showcount))+'</td></tr>';
                    dataArr.push(resetJSON(data[i]));
                }
                $('.dataBody').html(dataDiv);
                $('.page-content').css('height',$(document).height());
            }
        })
    }
    function percentNum(num, num2) {
        return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
    }

    var header=[
        [
            {title:"新闻标题",field:"title",rowspan:2},{title:"点击量",field:"clickcount",rowspan:2},{title:"展示量",field:"showcount",rowspan:2}, {field:"",title:"点击/展示",rowspan:2}
        ]
    ];
    //$('#btn2').click(exportexcel);
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