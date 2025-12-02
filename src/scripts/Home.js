import { getInstruments } from "./data/InstrumentsStateManager.js";
import { getClasses } from "./data/ClassStateManager.js";
import { MiniInstrument } from "./instruments/MiniInstrument.js"
import { MiniClass } from "./classes/MiniClass.js"


export const Home = () => {
    const allInstruments = getInstruments()
    const instruments = allInstruments.slice(allInstruments.length - 6, allInstruments.length - 1)
    const classes = getClasses().filter(clas => {
        const startDate = new Date(clas.start)
        const now = new Date()
        if (startDate > now) {
            return true
        }
        return false
    })

    return `
        <div class="welcome">
            Duke &amp; Chord is your destination for a distinctive musical experience. You can find
            new instruments, used instruments, and sign up for expert classes with legendary
            performers who will help you can hone your craft.
        </div>

        <article class="recents">
            <section class="recentInstruments">
                <h3>Hot Deals</h3>

                <div class="instruments">
                    ${ instruments.map(MiniInstrument).join("") }
                </div>
                </section>

                <section class="recentClasses">
                <h3>Upcoming Classes</h3>

                <div class="classes--mini">
                    ${ classes.map(MiniClass).join("") }
                </div>
            </section>
        </article>
    `
}
