export const MiniClass = (clas) => {
    return `
        <section class="class class--mini" id="class--${clas.id}">

            <div class="class__title--mini">
                <a href="" id="class__detail--${clas.id}">${clas.title}</a>
            </div>
            <div class="class__musician">With ${clas.musician.name}</div>
            <div class="class__price class__price--mini">${clas.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            <div class="class__date class__date--mini">Starts on ${new Date(clas.start).toLocaleDateString('en-US')}</div>
        </section>
    `
}
