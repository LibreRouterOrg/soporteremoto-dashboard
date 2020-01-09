import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import moment from 'moment';
import './SupportRequests.less';
import api from '../../api';

const statusFriendlyTexts = {
    'requestNoSent': 'Pendiente',
    'requestSent': 'Solicitado',
    'requestFinished': 'Finalizado',
};

export const SupportRequestsPure = ({ loading, supportRequests, onRequestSupport, submitting }) => {
    return (
        <div className="support-requests">
            <List
                header={<div className='support-requests-header'>Solicitudes de SoporteRemoto</div>}
                itemLayout="horizontal"
                dataSource={supportRequests}
                locale={{ 'emptyText': loading ? 'Cargando...' : 'No hay solicitudes' }}
                renderItem={request => (
                    <List.Item>
                        <span>Solicitado el {moment(request.timestamp).format('LLL')} por {request.user.username}. Estado: {statusFriendlyTexts[request.status]}</span>
                    </List.Item>
                )}
            />
            <div className="new-request">
                <Button onClick={onRequestSupport} loading={submitting} type='link' icon="fire" size='small'>
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

const SupportRequests = ({ reportId }) => {
    const [supportRequests, setSupportRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const onRequestSupport = () => {
        setSubmitting(true);
        api.supportRequests.create({reportId: reportId}).then( async request => {
            request = await addUserData(request);
            setSupportRequests(supportRequests.concat(request));
            setSubmitting(false);
        })
    };

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

    return <SupportRequestsPure loading={loading} supportRequests={supportRequests}
        onRequestSupport={onRequestSupport} submitting={submitting}/>
}

export default SupportRequests
