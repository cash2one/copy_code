$(function(){
    base.data_conn('get_ctype','',getCtype,'get');
    base.data_conn('get_ad_platform','',adPlatform,'get');
//    添加渠道
    $("#add_ctype").click(function(){
        var getDatas=new FormData();
        getDatas.append("name",$("input[name='ctype_name']").val());
        getDatas.append("show_name",$("input[name='ctype_show_name']").val());
        getDatas.append("ptype",$("#add_ptype").val());
        base.data_send('create_ctype',getDatas,sucess,'post');
    });
    //添加广告位
    $("#add_ad_position").click(function(){
        var getData=new FormData();
        getData.append("ptype",$("#ad_ptype").val());
        getData.append("ad_platform",$("#ad_platforms").val());
        getData.append("aid",$("input[name='aid']").val());
        getData.append("position",$("#ad_positions").val());
        getData.append("platform",$("#qudao").val());
        base.data_send('create_ad_position',getData,sucess,'post');
    });
    //添加广告平台
    $("#add_ad_platform").click(function(){
        var getData=new FormData();
        getData.append("name",$("input[name='ad_platform_name']").val());
        base.data_send('create_ad_platform',getData,sucess,'post');
    });
    //添加版本
    $("#add_version").click(function(){
        var getData=new FormData();
        getData.append("name",$("input[name='version_name']").val());
        getData.append("ptype",$("#ver_ptype").val());
        getData.append("ctype",$("#qudaos").val());
        base.data_send('create_version',getData,sucess,'post');
    });
    function isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    function sucess(e){
        alert("添加成功");
    }
    //添加渠道
    function getCtype(e){
        var getSel='';
        if(e.code==200){
            var result= e.results;
            //getSel+='<option value="All"> 全部</option>';
            for(var i in result){
                getSel+='<option value="'+result[i].name+'"> '+result[i].show_name+'</option>';
            }

            $('#qudao').append(getSel);
            $('#qudaos').append(getSel);

        }
        $('#qudao').selectpicker('refresh');
        $('#qudaos').selectpicker('refresh');
        //$('.version').selectpicker('show');
    }
    function adPlatform(e){
        var getsel='';
        if(e.code==200){
            var result= e.results;
            //getsel+='<option value="All"> 全部</option>';
            for(var i in result){
                getsel+='<option > '+result[i].name+'</option>';
            }

            $('#ad_platforms').html(getsel);

        }

        $('#ad_platforms').selectpicker('refresh');
    }
});