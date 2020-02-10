export const state=()=>({
  
      userInfo:{
         token:'',
         user:{}
    }
    
})


export const mutations ={
     setuserinfo(state,data){
        //  console.log(state);        
        state.userInfo=data
       
     }
}

export const actions= {
    onSubmit(store,data){
        // console.log(store);
        
            return  this.$axios({
                  url:'/accounts/login',
                  method:'POST',
                  data:data
              }).then(res=>{
                // console.log(res);
                const {data} =res 
                
                store.commit('setuserinfo',data)                
              })  
  },

    getCaptcha(store,data){
      return  this.$axios({
          url:'/captchas',
          method:'POST',
          data:data
        }).then(res=>{
          // console.log(res);
            return res
        })

      },

      RegSubmit(store,data){
      return  this.$axios({
          url:'/accounts/register',
          method:'POST',      
          data:data
        }).then(res=>{
          console.log(res);
          const {data} =res
          $store.commit('setuserinfo',data)
          
        })

      }
}