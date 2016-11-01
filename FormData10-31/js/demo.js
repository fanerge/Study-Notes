window.onload = function () {
    var result,
        div,
        input = document.getElementById('file-input');
    if(typeof FileReader === 'undefined'){
        result.innerHTML = "抱歉你的浏览器不支持FileReader，请更新浏览器吧！";
        input.setAttribute('disabled','disabled');
    }else{
        input.addEventListener('change',readFile,false);
    }

    /*
    *arguments none
    *function 阅读文件
    *return none
    */
    function readFile(){
        var fd = new FormData();
        for(var i=0; i<this.files.length; i++){
            if(!input['value'].match(/.jpg|.gif|.png|.bmp/i)){//判断上传内容是否为图片
                return alert("上传的图片格式不对，请重新选择");    
            }
            var reader = new FileReader();
            reader.readAsDataURL(this.files[i]);
            fd.append(i,this.files[i]);
            reader.onload = function (e) {
                result = '<div class="preview" id="result"><img src="'+this.result+'" alt=""></div>';
                div = document.createElement('div');
                div.innerHTML = result;
                document.getElementById('body').appendChild(div);
            }
        }
        //jquery--上传图片
        /*$.ajax({
            url:'',
            type:'post',
            data:fa,
            success:function(data){
                console.log(data,'上传成功')
            }
        });*/
    }
}
//