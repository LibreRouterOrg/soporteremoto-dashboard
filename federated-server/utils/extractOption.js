
/* Return a clojure that extremes values. Compativle with map in arrays. */
export function extractOption(option=''){
    return (value)=> value[option]
}
  