import api from ".";

export const formatReport  = async({messages, full}) => {
    const { timestamp, author, content } = messages[0].value;
    const { node, common_issue, title, body}  = content
    const user = await api.account.get(author);
    return {
        id: messages[0].key,
        timestamp,
        user,
        status: 'open',
        node,
        commonIssueId: common_issue.id,
        title,
        body,
        comments: messages.splice(0,1).map(msg => msg.key)
    }
}

export const formatUser = (account) => ({
  username: account.name,
  avatar: account.avatar,
  node: account.node,
  key: account.key,
})