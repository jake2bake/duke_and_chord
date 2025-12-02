export const MiniInstrument = (instrument) => {
    return `
        <section class="instrument instrument--mini" id="instrument--${instrument.id}">
            <img class="instrument__image" src="/images/${instrument.fileName}" />
            <div class="instrument__price--mini">${
                instrument.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
        </section>
    `
}
