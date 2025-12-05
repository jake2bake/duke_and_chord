import { getInstrument, getLoading } from "../data/InstrumentsStateManager.js"
import { getURLParameter } from "../data/ViewStateManager.js"
import { LoadingSpinner } from "../LoadingSpinner.js"

export const InstrumentDetail = () => {
    const instrumentId = getURLParameter("instrumentId")
    const instrument = getInstrument(parseInt(instrumentId))
    const isLoading = getLoading()

    if (isLoading || !instrument.hasOwnProperty("id")) { // Check for isLoading or if instrument data is not yet available
        return LoadingSpinner()
    }

    return `
        <section class="instrument instrument--details" id="instrument--${instrument.id}">
            <div class="instrument__price--detail">
                ${instrument.price.toLocaleString(
                    'en-US',
                    { style: 'currency', currency: 'USD' }
                )}
            </div>
            <img class="instrument__image instrument__image--detail" src="/images/${instrument.fileName ? instrument.fileName : 'dukechord.jpeg'}" />
            <h3 class="header--centered instrument__name">${instrument.name}</h3>
            <h4 class="header--centered instrument__type">(${instrument.instrumentType.name})</h4>

            <div class="instrument__seller--detail">
                <div>
                    Seller is <a href="#">${instrument?.user?.name}</a>
                </div>
            </div>
        </section>
    `
}
