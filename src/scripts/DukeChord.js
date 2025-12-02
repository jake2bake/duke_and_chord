import { Home } from "./Home.js"
import { NavBar } from "./nav/NavBar.js"
import { ClassDetails } from "./classes/ClassDetails.js"
import { ClassList } from "./classes/ClassList.js"
import { getURLParameter } from "./data/ViewStateManager.js"
import { InstrumentDetail } from "./instruments/InstrumentDetail.js"
import { InstrumentForm } from "./instruments/InstrumentForm.js"
import { InstrumentList } from "./instruments/InstrumentList.js"
import { EmployeeList } from "./employees/EmployeeList.js"

export const DukeChord = () => {
    return `
        ${NavBar()}
        ${buildView()}
    `
}

const buildView = () => {
    const view = getURLParameter("view")

    switch (view) {
        case "home":
            return Home()

        case "sell":
            return InstrumentForm()

        case "store":
            return InstrumentList()

        case "instrument":
            return InstrumentDetail()

        case "classes":
            return ClassList()

        case "class":
            return ClassDetails()

        case "about":
            return EmployeeList()

        default:
            return Home()
    }
}
