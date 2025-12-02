const container = document.querySelector("#content")

export const changeView = (view) => {
    history.pushState(null, "view", view === "" ? "?" : `?view=${view}`)

    var popStateEvent = new PopStateEvent('popstate', { state: { view } })
    window.dispatchEvent(popStateEvent)
}

export const getURLParameter = (name = "home") => {
    return decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}
