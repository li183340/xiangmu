// import Vue from 'vue'
// const vm = new Vue()
export const telreg =()=>{
    return /^1[3-9]\d{9}$/
   
}
export const passreg = ()=>{
    return /^\w{6,12}$/
}
export const numberreg =()=>{
    return /^\d+$/
}
export const stringreg =()=>{
    return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
}
export const usernamereg=()=>{
    return /^[a-zA-Z]+$/
}