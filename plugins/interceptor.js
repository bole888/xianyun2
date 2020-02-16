import {Message} from 'element-ui'

export default (data)=>{
    // console.log(data);
    data.$axios.onError(err=>{
         const{statusCode,message}=err.response.data

         if(statusCode===400){
            Message.error(message)
         }
        //  说明请求的token有问题,401是token错误或者过期了,403是没有传toekn;
         if(statusCode===401||statusCode===403){
             console.log(data);
             data.redirect(200,'/user/login',{
                 returnUrl:data.route.fullPath
             })
               
         }
    })
    
}

