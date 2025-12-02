import { setFilter } from "../data/InstrumentsStateManager.js"
import { changeView } from "../data/ViewStateManager.js"

document.querySelector("#header").addEventListener(
    "click",
    () => {
        setFilter("")
        changeView("home")
    }
)

export const Header = () => {
    return `
        <header>
            <img class="title--icon" src="/images/dukechord.png" height="150rem" />
            <h1 class="title--name" id="header">Duke &amp; Chord</h1>
            <hr/>
        </header>
    `
}
