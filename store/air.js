 export const state=()=>{
    return  {
        historydata:[],
        orderdetail:{
          seat_infos:{}
        },
        allprice:0
    }       
}

export const mutations= {
      sethistory (state,data){
        state.historydata.unshift(data);
       
        if(state.historydata.length>5){
          state.historydata.length=5;
        }
      },

      setorderdetail(state,data){
        state.orderdetail=data;
      },

      setallprice(state,data){
          state.allprice=data
      }

    
}