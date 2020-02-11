export const state=()=>({
     userInfo:{
         token:'',
         user:{}
     }
})

export const mutations={
      setuserinfo(state,data){
        console.log(state);
        console.log(data);
        
        state.userInfo=data
      }
}

export const actions= {
    login(store,data){
      return  this.$axios({
            url:"/accounts/login",
            method:'POST',
            data:data
        }).then(res=>{
            console.log(res);
            const {data}= res
            store.commit('setuserinfo',data)
        })
    },
    

    getcaptchas(store,data){
      console.log(store);
     return  this.$axios({
        url:'/captchas',
        method:'POST',
        data:data
    }).then(res=>{
        console.log(res);
        return res
    })    
    },


    getregisterdata(store,data){
        return this.$axios({
                
            url:'/accounts/register',
            method:'POST',
            data:data
        }).then(res=>{
            console.log(res);    
            // return  res  
            const {data} = res
            store.commit('setuserinfo',data)
        })
    }
}

