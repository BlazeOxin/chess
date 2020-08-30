import * as React from 'react'
import EV from "../../shared/Events";
import "./TitleBar.scss"

interface TitleBarProps {
    emitter: emitter;
    menu: Menu;
}
interface BaseMiniDropDownProps {
    name: string | React.FC<any>;
    ev: string;
}
interface MiniDropDownProps extends BaseMiniDropDownProps {
    emitter: emitter;
    revert: ()=>void;
}
interface BaseDropDownProps {
    name: string | React.FC<any>;
    ev: string;
    dropdown?: {
        items: Array<BaseMiniDropDownProps>;
    };
    revert: ()=>void;
}
interface DropDownProps extends BaseDropDownProps {
    emitter: emitter;
    revert: ()=>void;
}

const MiniDropDown: React.FC<MiniDropDownProps> = ({ name, ev, emitter, revert }) => {
    return (
        <div className="subdd__item">
            <button
                className="dropdown__label"
                onClick={() => { emitter({ ev }).then(revert) }}
            >{name}</button>
        </div>
    )
}
const MenuOption: React.FC<DropDownProps> = ({ name, ev, emitter, revert }) => {
    return (
        <div className="dropdown__item">
            <button
                onClick={() => { emitter({ ev }).then(()=>{revert()}) }}
                className="dropdown__label"
            >
                {name}
            </button>
        </div>
    )

}
const DropDown: React.FC<DropDownProps> = ({ name, ev, dropdown, emitter, revert }) => {
    const [isDropdownOpen, setisDropDownOpen] = React.useState(false)
    return (
        <div className="dropdown__item ">
            <button
                onMouseOver={() => {
                    if (!isDropdownOpen) setisDropDownOpen(true)
                }}
                className={`dropdown__label ${dropdown ? "with__sub" : ""}`}
            >
                {name}
                <svg
                    className="dropdown__arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 8 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M7 8.46154L1 2L5 8.46154L1 14L7 8.46154Z" fill="currentColor" />
                </svg>
            </button>
            {isDropdownOpen ? (
                <div className="small__dropdown">
                    {dropdown.items.map((subdd, i) => (
                        <MiniDropDown  key={i} {...subdd} revert={revert} emitter={emitter} />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

const TitleBar: React.FC<TitleBarProps> = ({ emitter, menu }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openedMenu, setOpenMenu] = React.useState<null | string>(null)
    const [isMaximized, setIsMaximized] = React.useState(false);
    React.useEffect(() => {
        function listner(e: UIEvent) {
            emitter({ ev: EV.APP_IS_MAXIMIZED }).then((v) => {
                setIsMaximized(v)
            })
        }
        window.addEventListener('resize', listner);
        return () => { window.removeEventListener('resize', listner) }
    }, [isMaximized])

    React.useEffect(()=>{ 
        let wrapper = document.getElementById('tb-wrapper')
        let wrapperW = wrapper.clientWidth
        let wrapperH = wrapper.clientHeight
        let sectionW = document.getElementById('tb-menu').clientWidth
        let iconW = document.getElementById('tb-icon').clientWidth
        let controlW = document.getElementById('tb-controls').clientWidth
        let consumedW = sectionW + iconW + controlW
        let freeW = wrapperW - consumedW
        let dragbar = document.getElementById('tb-dragbar')
        dragbar.style.width = freeW + 'px'
        dragbar.style.height = wrapperH + 'px'
    }, [])

    return (
        <div
            id="tb-wrapper"
            className={`titlebar__wrapper ${menu.theme}`}
        >
            <img src={menu.icon} alt="" id="tb-icon" className="app__icon" />
            <div id="tb-menu" className="menu__section">
                {menu.sections.map((sec, i) => (
                    <div key={i} className="main__menu">
                        <button
                            onClick={() => {
                                if (isOpen) { setOpenMenu(null); setIsOpen(false) }
                                else { setOpenMenu(sec.name); setIsOpen(true) }
                            }}
                            onMouseOver={() => {
                                if (isOpen) { setOpenMenu(sec.name) }
                            }}
                            children={sec.name}
                            className={`menu__label ${isOpen && openedMenu === sec.name ? "active" : ""}`}
                            datatype={sec.name}
                        />
                        {isOpen && openedMenu === sec.name ? (
                            <div className="menu__dropdowns">
                                {sec.subSeperation.map((sub, i) => (
                                    <div key={i} className="dropdown__subsection">
                                        {sub.map((subbottom, j) => (
                                            subbottom.dropdown ? <DropDown key={j} revert={()=>{setIsOpen(false)}} {...subbottom} emitter={emitter} /> : <MenuOption key={j} revert={()=>{setIsOpen(false)}} {...subbottom} emitter={emitter} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="app__dragbar" id="tb-dragbar" />
            <div className="app__controls" id="tb-controls">
                <svg
                    onClick={() => emitter({ ev: EV.APP_MINIMIZE })}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="4"
                        y="14"
                        width="24"
                        height="4"
                        fill="currentColor"
                    />
                </svg>
                {isMaximized ? (
                    <svg
                        onClick={() => { emitter({ ev: EV.APP_UNMAXIMIZE }) }}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 27V9H23V27H5Z"
                            stroke="currentColor"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 6.5H7.5V7V9.5H8.5V7.5H25.5V24.5H22.5V25.5H26H26.5V25V7V6.5H26H8Z"
                            fill="currentColor" />
                    </svg>
                ) : (
                        <svg
                            onClick={() => { emitter({ ev: EV.APP_MAXIMIZE }) }}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 25V7H25V25H7Z"
                                stroke="currentColor"
                            />
                        </svg>
                    )}
                <svg
                    onClick={() => emitter({ ev: EV.APP_QUIT })}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 25L16 16M25 7L16 16M16 16L25 25L7 7"
                        stroke="currentColor"
                        strokeWidth="3"
                    />  
                </svg>
            </div>
        </div>
    );
}

export default TitleBar;