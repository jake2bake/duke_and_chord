import { getInstrumentTypes, saveInstrument } from "../data/InstrumentsStateManager.js"
import { getCurrentUser } from "../data/UserStateManager.js"

const content = document.querySelector("#content")
let formState = {}

content.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newInstrument__submit") {
        saveInstrument(formState)
    }
})


const checkForStateChange = (evt) => {

    if (evt.target.classList.contains("newInstrument__input")) {
        const type = evt.target.type
        let value = null



        switch (type) {
            case "select-one":
            case "number":
                value = parseInt(evt.target.value)
                break;

            case "text":
                value = evt.target.value
                break;

            case "checkbox":
                value = evt.target.checked
                break;

            default:
                break;
        }


        formState[evt.target.id] = value
        console.log(formState)

    }
}

content.addEventListener("keyup", evt => {
    checkForStateChange(evt)
})

content.addEventListener("change", evt => {
    checkForStateChange(evt)
})

export const InstrumentForm = () => {
    const types = getInstrumentTypes()
    formState = {
        "fileName": "",
        "name": "",
        "instrumentTypeId": 0,
        "audio": "",
        "used": false,
        "price": 0,
        "description": "",
        "userId": getCurrentUser().id
    }

    return `
        <h2 class="header--centered">Sell Your Instrument</h2>
        <div class="newInstrument">
            <div class="newInstrument__field">
                <label class="prompt">Name:</label>
                <input value="${formState.name}" id="name"
                    class="newInstrument__input" type="text"
                    placeholder="e.g. Trumpet"  />
            </div>

            <div class="newInstrument__field">
                <label class="prompt">Type:</label> <select id="instrumentTypeId" class="newInstrument__input">
                    <option value="0">Choose type...</option>
                    ${
                        types.map(type => `<option value="${type.id}">${type.name}</option>`).join("")
                    }
                </select>
            </div>

            <div class="newInstrument__field">
                <label class="prompt">Price:</label>
                <input value="${formState.audio}" id="price" class="newInstrument__input" type="number" />
            </div>

            <div class="newInstrument__field">
                <label class="prompt">Used:</label>
                <div class="newInstrument__input">
                    <label class="switch">
                        <input value="${formState.used}" id="used" type="checkbox" class="newInstrument__input" />
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="newInstrument__field">
                <label class="prompt">Audio file:</label>
                <input value="${formState.audio}" id="audio" class="newInstrument__input" type="text" />
            </div>

            <div class="newInstrument__field">
                <label class="prompt">Image file:</label>
                <input value="${formState.audio}" id="fileName" class="newInstrument__input" type="text" />
            </div>

            <textarea id="description" value="${formState.description}"
                class="newInstrument__input newInstrument__description"
                placeholder="Description of instrument."></textarea>

            <button id="newInstrument__submit">Save</button>
            <button id="newInstrument__cancel">Cancel</button>
        </div>
        `
}
