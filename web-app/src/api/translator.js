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
        comments: messages.filter(removeFirst).map(extractOption('key'))
    }
}

function removeFirst (_, key){
  return key > 0
}

function extractOption(option=''){
  return (value)=> value[option]
}

export const formatUser = (account) => ({
  username: account.name,
  avatar: account.avatar,
  node: account.node,
  key: account.key,
})