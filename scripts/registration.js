const inPersonNode = document.getElementById("attendance-person")
const virtualNode = document.getElementById("attendance-virtually")
const form = document.getElementById("grab-Form")


const submission = (event) => {
    console.log("event", event)
}

const togglefields = (hide) => {
    const notVirtualElements = document.getElementsByClassName("not-virtual")
    Array.from(notVirtualElements).forEach(element => {
        if (hide) {
            element.style.display = "none"
            element.removeAttribute("required")
        } else {
            element.style.display = "block"
            element.setAttribute("required", true)
        }

    });
}

inPersonNode.addEventListener("click", (e) => {
    togglefields(false)
})

virtualNode.addEventListener("click", (e) => {
    togglefields(true)
})
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new  FormData(e.target);
    const data = [...formData.entries()]
       
    console.log(data);
})



