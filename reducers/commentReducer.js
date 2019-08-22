import FlumeReduce from 'flumeview-reduce'

const commentReducer = (result = [], item) => {
    if(!result) result  = []
    if (item && item.type === 'comment') {
        console.log(item)
        result.push(item)
    }
    return result;
}

export default FlumeReduce(1,commentReducer, (a)=>a )