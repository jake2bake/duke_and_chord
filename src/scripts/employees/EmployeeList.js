import { getUs } from "../data/UserStateManager.js"

const container = document.querySelector("#content")

export const EmployeeList = () => {
    const us = getUs()

    return `
        <h2 class="header--centered">Our Mission</h2>

        <p class="mission">
            Ipsam voluptatum harum quia fugit voluptatem et. Sit quis quia reiciendis. Neque velit minima quia eius asperiores adipisci nam dolore. Repellat dolorem magni dolores quaerat corrupti voluptatibus. Voluptates possimus nam ipsa necessitatibus adipisci voluptatem. Maiores debitis alias et iure.
            Omnis dolore accusantium odit sit sit et illum.
        </p>

        <h2 class="header--centered">Introductions</h2>

        <article class="serfs">
            ${
                us.map(person => `
                <div class="card serf">
                    <div class="details">
                        <div class="user_photo horizontal_center" class="user_photo">
                            <img class="serf__prop serf__image" src="${person.picture.large}"></div>
                        <p class="serf__title">Hi, My name is </p>
                        <p class="serf__name">${person.name.first} ${person.name.last}</p>
                        <p class="serf__email">${person.email}</p>
                    </div>
                </div>
                `).join("")
            }
        </article>
    `
}
