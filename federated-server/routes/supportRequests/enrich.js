export function getStatus(sbot) {
    return (key) => {
        return new Promise((res) => {
            sbot.about.latestValue(
                { key: 'status', dest: key },
                (err, status) => res(status || 'requestNoSent')
            );
        });
    }
};
