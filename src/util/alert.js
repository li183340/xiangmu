import Vue from 'vue'
const vm = new Vue()


export const open1=(msg)=> {
    vm.$message(msg);
}

export const success=(msg)=>{
    vm.$message({
      message: msg,
      type: 'success'
    });
  }

  export const  warning=(msg) =>{
    vm.$message({
      message: msg,
      type: 'warning'
    });
  }

  export const error=(msg) =>{
    vm.$message.error(msg);
  }
