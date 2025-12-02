import { settings } from "./Settings.js"

const container = document.querySelector("#content")

const state = {
    currentUser: {},
    users: [],
    us: []
}

export const logout = () => {
    localStorage.removeItem("chord_user")
    state.currentUser = {}
}

export const login = (user) => {
    const encodedUser = btoa(JSON.stringify(user))
    localStorage.setItem("chord_user", encodedUser)
    setCurrentUser(user)
}

export const setCurrentUser = (user) => {
    state.currentUser = user
}

export const getCurrentUser = () => {
    return state.currentUser
}

export const fetchUsers = () => {
    return fetch(`${settings.apiURL}/api/users`)
        .then(response => response.json())
        .then(data => state.users = data)
}

export const findUser = (email) => {
    return fetch(`${settings.apiURL}/api/users?email=${email}`)
        .then(response => response.json())
}

export const getUsers = () => {
    return state.users.map(u => ({ ...u }))
}

export const isAuthenticated = () => {
    // Check if user is already in state
    if ("id" in state.currentUser) {
        return true
    }
    // Check if encoded user object in local storage
    else {
        const user = localStorage.getItem("chord_user")

        if (user) {
            const unencodedUser = atob(user)
            const parsedUser = JSON.parse(unencodedUser)
            setCurrentUser(parsedUser)
            return true
        }
    }

    // No user in state or in local storage
    return false
}

export const fetchUs = () => {
    return fetch(`https://randomuser.me/api/?results=10&inc=name,picture,email`)
        .then(res => res.json())
        .then(data => state.us = data.results)

}

export const getUs = () => {
    return state.us
}
