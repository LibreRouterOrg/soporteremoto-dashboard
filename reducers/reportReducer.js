import FlumeReduce from 'flumeview-reduce'

const reportReducer = (result = [], item) => {
    if(!result) result  = []
    if (item && item.type === 'report') {
        console.log(item)
        result.push(item)
    }
    return result;
}

export default FlumeReduce(1,reportReducer, (a)=>a )