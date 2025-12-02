import { getInstruments, shouldPlaySounds, getLoading } from "../data/InstrumentsStateManager.js"
import { changeView } from "../data/ViewStateManager.js"
import { Instrument } from "./Instrument.js"
import { Options } from "./Options.js"
import { LoadingSpinner } from "../LoadingSpinner.js"

const container = document.querySelector("#content")
let audio = null

container.addEventListener(
    "click",
    (pointerEvent) => {
        const instrumentClicked = pointerEvent.target.closest(".instrument")
        if (instrumentClicked) {
            const [, id] = pointerEvent.target.id.split("--")
            changeView(`instrument&instrumentId=${id}`)
        }
    }
)

container.addEventListener(
    "mouseover",
    (pointerEvent) => {
        if (shouldPlaySounds()) {
            const instruments = getInstruments()
            if (pointerEvent.target.id.startsWith("instrument--")) {
                const [, id] = pointerEvent.target.id.split("--")
                const instrument = instruments.find(instr => instr.id === parseInt(id))

                if (instrument.audio !== "") {
                    audio = new Audio(`/audio/${instrument.audio}`);
                    audio.play()
                }
            }
        }
    }
)

container.addEventListener(
    "mouseout",
    (pointerEvent) => {
        if (shouldPlaySounds()) {
            if (pointerEvent.target.id.startsWith("instrument--")) {
                audio.pause()
                audio.currentTime = 0
            }
        }
    }
)

export const InstrumentList = () => {
    const instruments = getInstruments()
    const isLoading = getLoading()

    if (isLoading) {
        return LoadingSpinner()
    }

    return `
        <h2 class="header--centered header--sale">Instruments for Sale</h2>

        ${ Options() }

        <article class="instruments">
            ${instruments.map(Instrument).join("")}
        </article>
    `
}
