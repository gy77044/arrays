
export const NewContent = () => {
    return (<>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, rem magni. Sapiente et commodi est ea dolorem hic autem a incidunt facilis, 
    natus explicabo enim omnis nostrum molestiae deserunt! Iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, rem magni. Sapiente et commodi 
    est ea dolorem hic autem a incidunt facilis, natus explicabo enim omnis nostrum molestiae deserunt! Iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Sunt, rem magni. Sapiente et commodi est ea dolorem hic autem a incidunt facilis, natus explicabo enim omnis nostrum molestiae deserunt! Iusto. Lorem ipsum dolor sit amet 
    consectetur adipisicing elit. Sunt, rem magni. Sapiente et commodi est ea dolorem hic autem a incidunt facilis, natus explicabo enim omnis nostrum molestiae deserunt! Iusto.</>)
}

export const NewContent2 = () => {
    return (<>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, rem magni. Sapiente et commodi est ea dolorem hic autem a incidunt facilis, natus explicabo enim omnis nostrum molestiae deserunt! Iusto.</>)
}

export const ModalList = [
    {
        tooltip: "Module Configuration",
        title: "moduleconfiguration",
    },
    {
        tooltip: "Inverter Configuration",
        title: "inverterconfiguration",
    },
]

export const ModalListItem = {
    moduleconfiguration: {
        title: "moduleconfiguration",
        Component: NewContent,
        btnTitle: "Add Module",
        headerName: "Multiple Capacity Module Type",
    },
    inverterconfiguration: {
        title: "inverterconfiguration",
        Component: NewContent2,
        btnTitle: "Add Inverter",
        headerName: "Multiple Capacity Inverter Type",
    },
}

export type btnTitleType = 'Generate BOQ' | 'Design Summary'
