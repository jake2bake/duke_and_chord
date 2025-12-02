import { getCurrentUser, logout } from "../data/UserStateManager.js"
import { changeView } from "../data/ViewStateManager.js"

const container = document.querySelector("#content")

container.addEventListener(
    "click",
    (event) => {
        if (event.target.className === "navLink") {
            if (event.target.id === "logout") {
                logout()
                changeView("login")
            }
            else {
                changeView(event.target.id)
            }
        }
    }
)

export const NavBar = () => {
    const user = getCurrentUser()

    return `
        <nav>
            <ul class="navLinks">
                <li id="home" class="navLink">Home</li>
                <li id="store" class="navLink">Store</li>
                <li id="sell" class="navLink">Sell</li>
                <li id="classes" class="navLink">Classes</li>
                <li id="about" class="navLink">About Us</li>
                <li id="logout" class="navLink">Logout ${user?.name.split(" ")[0]}</li>
            </ul>
        </nav>
    `
}
