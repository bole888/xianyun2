import {Message} from 'element-ui'

export default (data)=>{
    // console.log(data);
    data.$axios.onError(err=>{
         const{statusCode,message}=err.response.data

         if(statusCode===400){
            Message.error(message)
         }
    })
    
}

