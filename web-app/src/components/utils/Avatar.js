import React from 'react';
import { Avatar as AvatarAntd } from 'antd';

export function Avatar({ user, size}) {
    return (
        <>
            {user.is_bot ?
                <AvatarAntd icon='robot' size={size} />
                : (user.avatar ?
                    <AvatarAntd src={user.avatar} size={size} />
                    :
                    <AvatarAntd size={size}>{user.username[0].toUpperCase()}</AvatarAntd>
                )}
        </>
    );
}