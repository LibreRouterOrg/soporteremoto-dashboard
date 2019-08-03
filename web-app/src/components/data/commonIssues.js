export const commonIssues = [
    {
        id: "unavailable_network",
        parent: null,
        text: "Red wifi no disponible",
    },
    {
        id: "unreachable_network",
        parent: null,
        text: "Veo mi red wifi disponible pero no puedo conectarme",
    },
    {
        id: "unreachable_resources",
        parent: null,
        text: "Puedo conectarme a mi red, pero tengo problemas para navegar",
    },
    {
        id: "all_resources",
        parent: "unreachable_resources",
        text: "No puedo visitar ninguna página ni usar ninguna aplicación",
    },
    {
        id: "some_of_them",
        parent: "unreachable_resources",
        text: "Puedo visitar algunas páginas pero otras no",
    },
    {
        id: "only_by_ip",
        parent: "unreachable_resources",
        text: "Puedo utilizar algunas aplicaciones como whatsapp pero no puedo navegar",
    },
    {
        id: "slow_connection",
        parent: null,
        text: "Puedo navegar pero anda lento",
    },
    {
        id: "from_precise_moment",
        parent: "slow_connection",
        text: "Empezó a andar lento en un momento puntual",
    },
    {
        id: "periodically",
        parent: "slow_connection",
        text: "Siempre me anda lento en los mismos días/horarios",
    },
    {
        id: "only_with_some_sites",
        parent: "slow_connection",
        text: "Funciona lento una página/aplicación en particular. Ej (Netflix)",
    },
    {
        id: "cuts_out_connection",
        parent: null,
        text: "Puedo navegar pero de a ratos se corta",
    }
];

