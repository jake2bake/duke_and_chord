export const Instrument = (instrument) => {
    return `
        <section class="instrument" id="instrument--${instrument.id}">
            <img class="instrument__image" src="/images/${instrument.fileName}" />
            <h3 class="header--centered instrument__name">${instrument.name}</h3>
            <h4 class="header--centered instrument__type">(${instrument.instrumentType.name})</h4>

            <div class="instrument__seller">
                <div class="instrument__price">
                    ${instrument.price.toLocaleString(
                        'en-US',
                        { style: 'currency', currency: 'USD' }
                    )}
                </div>
                <div>
                    Seller is <a href="#">${instrument.user.name}</a>
                </div>
            </div>

            <audio id="audio--${instrument.id}">
                <source src="/audio/${instrument.audio}"></source>
                <source src="/audio/oops.wav"></source>
                Your browser isn't invited for super fun audio time.
            </audio>
        </section>
    `
}
