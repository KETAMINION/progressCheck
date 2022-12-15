import {createContext, useState} from 'react'

const UseEffectTrigger = createContext()

function UseEffectTriggerProvider(props){
    const [effectTrigger, setEffectTrigger]=useState(false)
    const toggleEffectTrigger = () => {
        setEffectTrigger(!effectTrigger)
    }
    return (
        <div>
            <UseEffectTrigger.Provider value={{effectTrigger, toggleEffectTrigger}}>
                {props.children}
            </UseEffectTrigger.Provider>
        </div>
    )
}

export {UseEffectTrigger, UseEffectTriggerProvider}