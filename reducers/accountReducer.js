import FlumeReduce from 'flumeview-reduce'

const accountReducer = (result = [], item) => {
    if(!result) result  = []
    if (item && item.type === 'account') {
        console.log(item)
        result.push(item)
    }
    return result;
}

export default FlumeReduce(1,accountReducer, (a)=>a )