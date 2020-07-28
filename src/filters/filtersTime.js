export default (time)=>{
    var data = new Data(time)
    var year = data.getFullYear()
    var month = (data.getMonth()+1+"").padStart(2,'0')
    var day = (data.getData()+'').padStart(2,'0')
    return `${year}-${month}-${day}`
}