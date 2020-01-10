import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import moment from 'moment';
import './SupportRequests.less';
import api from '../../api';

const statusFriendlyTexts = {
    'requestNoSent': 'Pendiente',
    'requestSent': 'Solicitado',
    'requestCanceled': 'Cancelado',
    'requestFinished': 'Finalizado',
};

export const SupportRequest = ({request, onCancel}) => {
    const [canceling, setCanceling] = useState(false);
    const isCancelable = request.status === "requestNoSent" || request.status === "requestSent";
    const cancel = () => {
        setCanceling(true);
        onCancel().then(() => setCanceling(false));
    }

    return (
        <div className="support-request-row">
            <span>Solicitado el {moment(request.timestamp).format('LLL')} por {request.user.username}. Estado: {statusFriendlyTexts[request.status]}</span>
            {isCancelable &&
                <Button onClick={cancel} loading={canceling} type='danger' size='small'>Cancelar</Button>
            }
        </div>
    )
}

export const SupportRequests = ({ loading, supportRequests, onRequestSupport, onCancel }) => {
    const [submitting, setSubmitting] = useState(false);
    const requestSupport = () => {
        setSubmitting(true);
        onRequestSupport().then(() => setSubmitting(false));
    }

    return (
        <div className="support-requests">
            <List
                header={<div className='support-requests-header'>Solicitudes de SoporteRemoto</div>}
                itemLayout="horizontal"
                dataSource={supportRequests}
                locale={{ 'emptyText': loading ? 'Cargando...' : 'No hay solicitudes' }}
                rowKey={request => request.key}
                renderItem={request => (
                    <List.Item>
                        <SupportRequest request={request} onCancel={onCancel(request.key)}/>
                    </List.Item>
                )}
            />
            <div className="new-request">
                <Button onClick={requestSupport} loading={submitting} type='link' icon="fire" size='small'>
                    Solicitar Soporte Remoto
                </Button>
            </div>
        </div>
    )
}

const addUserData = async (request) => {
    const user = await api.account.get(request.author);
    return {...request, user: user}
}

const SupportRequestsContainer = ({ reportId }) => {
    const [supportRequests, setSupportRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const onCancel = (key) => async () => api.supportRequests.cancel({ id: key })
        .then(() => {
            setSupportRequests(requests => {
                const canceledIndex = requests.map(x => x.key).indexOf(key);
                let resultingRequests = requests.splice(0);
                resultingRequests[canceledIndex].status = 'requestCanceled';
                return resultingRequests
            });
        })

    const onRequestSupport = async () => api.supportRequests.create({ reportId: reportId }).then(async (request) => {
        request = await addUserData(request);
        setSupportRequests(supportRequests.concat(request));
    });

    useEffect(() => {
        setLoading(true);
        api.reports.getSupportRequests(reportId)
            .then(requests => Promise.all(
                requests.map(async request => await addUserData(request)))
            )
            .then(requests => {
                setSupportRequests(requests);
                setLoading(false);
            });
    }, [reportId])

    return <SupportRequests loading={loading} supportRequests={supportRequests}
        onRequestSupport={onRequestSupport} onCancel={onCancel}/>
}

export default SupportRequestsContainer
