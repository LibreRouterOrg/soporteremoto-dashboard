import gferrero_avatar from '../../assets/gferrero_avatar.jpeg';

export const user = {
    username: "gferrero",
    client: {
        ip: "192.168.1.4",
        hostname: "gf",
    },
    avatar: gferrero_avatar,
    is_bot: false,
};

export const issue = {
    id: 10,
    timestamp: new Date('2019-06-20T14:40:10Z').getTime(),
    user: user,
    status: 'open',
    node: 'ql-gferrero',
    common_issue: 'unreachable_network',
    body: 'Desde ayer a la mañana que no puedo conectarme a la red desde mi laptop',
    comments: [],
}
