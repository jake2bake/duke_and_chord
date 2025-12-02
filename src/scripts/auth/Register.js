import { login } from "../data/UserStateManager.js"

const container = document.querySelector("#content")
const formState = {
    name: "",
    email: ""
}

container.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "register") {
        return fetch(`${settings.apiURL}/api/users`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        })
            .then(response => response.json())
            .then((newUser) => {
                login(newUser)
            })

    }
})

content.addEventListener("keyup", evt => {
    if (evt.target.classList.contains("register__input")) {
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
})

container.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "loginLink") {
            event.preventDefault()
            history.pushState(null, "view", `?view=login`)
            var popStateEvent = new PopStateEvent('popstate', { state: { view: "login" } })
            window.dispatchEvent(popStateEvent)
        }
    }
)


export const RegisterForm = () => {
    return `
        <div class="loginForm">
            <input class="register__input" value="${formState.name}" type="text" id="name" autofocus placeholder="Your name" />
            <input class="register__input" value="${formState.email}" type="text" id="email" placeholder="Email address" />
            <button id="register">Register</button>
        </div>

        <section class="register">
            <a id="loginLink" href="">Already a member?</a>
        </section>

    `
}
