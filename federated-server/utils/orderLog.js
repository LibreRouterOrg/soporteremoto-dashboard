export const orderLog = ({
    author,
    content,
    hash,
    previous,
    sequence, 
    timestamp,
    signature
}) => ({
    previous,
    sequence,
    author,
    timestamp,
    hash,
    content,
    signature
})
