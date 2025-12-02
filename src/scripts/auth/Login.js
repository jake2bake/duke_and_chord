import { findUser, login } from "../data/UserStateManager.js"
import { changeView } from "../data/ViewStateManager.js"

const container = document.querySelector("#content")

container.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registerLink") {
        clickEvent.preventDefault()
        changeView("register")
    }
})

container.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        const email = document.querySelector("input[name='email']").value

        findUser(email)
            .then((data) => {
                if (data.length > 0) {
                    login(data[0])
                    changeView("", false)
                }
                else {
                    window.alert("Invalid account email")
                }
            })
    }
})


export const LoginForm = () => {
    return `
        <div class="loginForm">
            <input value="meg@ducharme.com" type="text" name="email" autofocus placeholder="Email address" />
            <button id="loginButton">Login</button>
        </div>

        <section class="register">
            <a id="registerLink" href="">Not a member yet?</a>
        </section>
    `
}
