 export const state=()=>{
    return  {
        historydata:[],
        orderDetail:{
          seat_infos:{}
        },
        allPrice:0
    }       
}

export const mutations= {
      sethistory (state,data){
        state.historydata.unshift(data);
       
        if(state.historydata.length>5){
          state.historydata.length=5;
        }
      },

      setorderDetail(state,data){
        state.orderDetail=data;
      },

      setallPrice(state,data){
        state.allPrice=data;
      }
}