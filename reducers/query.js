import FlumeQuery from 'flumeview-query'

export default FlumeQuery(3, { indexes:[
    {key:'acc', value: [[ 'value','content','key'],['key']]}, //by key
    {key:'rep', value: [[ 'value','content','report']]}, //get reports keys
]});
