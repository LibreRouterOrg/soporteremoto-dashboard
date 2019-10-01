import React from 'react';
import { Icon } from 'antd';
import './Status.less';

const openStatus = (
    <span>
        <Icon className="status-icon status-icon--open" type="exclamation-circle" />
        Abierto
    </span>
);

const resolvedStatus = (
    <span>
        <Icon className="status-icon status-icon--closed" type="check-circle" />
        Resuelto
    </span>
);

export default ({status}) => {
    if (status === 'open') {
        return openStatus;
    } else {
        return resolvedStatus;
    }
}
