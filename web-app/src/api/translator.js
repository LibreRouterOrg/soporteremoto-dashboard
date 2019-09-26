export const formatReport  = async({value, key}) => {
    const { timestamp, author, content } = value;
    const { node, common_issue, title, body, status, comments }  = content
    return {
        id: key,
        timestamp,
        user: author,
        status,
        node,
        commonIssueId: common_issue && common_issue.id? common_issue.id : 'not-defined',
        title,
        body, 
        comments
    }
}

export const formatReportComments = async ({ messages, full }) => {
    return messages.filter(removeFirst).map(message => formatComment(message.value))
}

export const formatComment = (value) => {
    const { author, timestamp, content } = value;
    const { body } = content;
    return { userId: author, timestamp, body }
}

export const formatUser = (account) => ({
    username: account.name,
    avatar: account.avatar,
    node: account.node,
    key: account.key,
})

export const formatStatus = ({ value }) => ({
    account: value.author,
    timestamp: value.timestamp,
    status: value.content.status
})
