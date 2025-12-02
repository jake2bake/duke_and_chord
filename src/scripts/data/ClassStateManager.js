import { settings } from "./Settings.js"

const state = {
    classes: [],
    chosenClass: {}
}

const container = document.querySelector("#content")

export const setInstrument = (id) => {
    state.chosenClass = state.classes.find(i => i.id === id) || {}
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getInstrument = () => {
    return state.chosenClass
}

export const turnOffSounds = () => {
    state.playSounds = false
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const turnOnSounds = () => {
    state.playSounds = true
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const shouldPlaySounds = () => {
    return state.playSounds
}

export const fetchAllClasses = () => {
    return fetch(`${settings.apiURL}/api/classes?_expand=musician`)
        .then(response => response.json())
        .then(
            (classes) => {
                state.classes = classes
            }
        )
}

export const getClasses = () => {
    return structuredClone(state.classes)
}
