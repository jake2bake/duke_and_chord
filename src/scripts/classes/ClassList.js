import { getClasses } from "../data/ClassStateManager.js"
import { changeView } from "../data/ViewStateManager.js"

const container = document.querySelector("#content")

container.addEventListener(
    "click",
    event => {
        if (event.target.id.startsWith("class__detail")) {
            event.preventDefault()
            const [,id] = event.target.id.split("--")
            changeView(`class&classId=${id}`)
        }
    }
)

export const ClassList = () => {
    const classes = getClasses()

    return `
        <h2 class="header--centered header--sale">Master Classes</h2>

        <article class="classes">
            ${classes.map(clazz => {
                return `<section class="class" id="class--${clazz.id}">

                        <h2 class="class__title"> ${clazz.title} </h2>
                        <div class="class__description">
                            ${clazz.description.substring(0, 150)}...
                            <a href="" id="class__detail--${clazz.id}">[more]</a>
                        </div>
                        <div class="class__price">
                            ${clazz.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                        <div class="class__musician">With ${clazz.musician.name}</div>
                        <div class="class__date">Starts on ${new Date(clazz.start).toLocaleDateString('en-US')}</div>
                    </section>
                `
            }).join("")}
        </article>
    `
}
