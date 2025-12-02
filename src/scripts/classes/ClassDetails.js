import { getClasses } from "../data/ClassStateManager.js"
import { getURLParameter } from "../data/ViewStateManager.js"

export const ClassDetails = () => {
    const id = getURLParameter("classId")
    const clazz = getClasses().find(c => c.id === parseInt(id))

    return `
        <section class="class" id="class--${clazz.id}">
            <h2 class="class__title"> ${clazz.title} </h2>
            <div class="class__description"> ${clazz.description} </div>
            <div class="class__price">${clazz.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            <div class="class__musician">With ${clazz.musician.name}</div>
            <div class="class__date">Starts on ${new Date(clazz.start).toLocaleDateString('en-US')}</div>
        </section>
    `
}
