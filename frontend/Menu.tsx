import EV from "../shared/Events"
import icon from "../assets/icons/icon.png"

const out: Menu = {
    theme: 'dark',  
    icon,
    sections: [{
        name: "Files",
            subSeperation: [
                [{ name: "Open Project", ev: 'option__' },
                 { name: "Import Image", ev: 'option__' }],
                [{ name: "Save Project", ev: "option__" },
                 { name: "Export As", dropdown: {
                items: [{ name: "PNG", ev: 'option__' },
                        { name: "JPG", ev: 'option__' }],
                },
                ev: "option__" }]
            ]},
        {   name: "Options",
            subSeperation: [[{ name: "Open Developers Tools", ev: EV.APP_OPEN_DEVTOOLS }]]
        },
        {   name: "Help",
            subSeperation: [ [{ name: "About", ev: "option__" }, { name: "Contact", ev: "option__" }]]
        }
    ]
}
export default out;