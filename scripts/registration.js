(async () => {
    const inPersonNode = document.getElementById("attendance-person")
    const virtualNode = document.getElementById("attendance-virtually")
    const form = document.getElementById("grab-Form")

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
        const formData = new FormData(e.target);
        const data = [...formData.entries()]

        console.log(data);
    })

    const button = document.getElementById("form_button");
    const msg = document.getElementById("msg")
    const scriptURL = "https://script.google.com/macros/s/AKfycbyW2_2diylogBRguVJX5QDAbYMDmA45C9gqL3IjTInAxXg_wEVWSZlODpcvG5wJIJQm/exec";
    const form_reg = document.forms["submit-to-google-sheet"];
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form_reg) })
            .then(response => {
                msg.classList.toggle("alert")
                msg.classList.toggle("alert-success")
                msg.classList.toggle("text-center")
                msg.innerHTML = "Thank you for your submission!"
                setTimeout(function () {
                    msg.innerHTML = ""
                    msg.classList.toggle("alert")
                    msg.classList.toggle("alert-success")
                    msg.classList.toggle("text-center")
                }, 5000)
                form.reset();
                setTimeout(function () {
                    button.onclick = document.location.href = "../index.html"
                }, 2000)

            })
            .catch(error => console.error("Error!", error.message))
    })
    const response = await fetch("../data.json")
    const data = await response.json()

    const unionElement = document.getElementById('selection')
    console.log(unionElement)

    function callback(mutationList) {
        const mutation = mutationList[0]
        const lang = mutation.target.getAttribute("lang")
        const options = data.unions[lang]
        const defaultOption = unionElement.children[0]


        const optionElements = options.map((option) => {
            const optionElement = document.createElement("option")
            const optionTxtNode = document.createTextNode(option)
            optionElement.appendChild(optionTxtNode)
            return optionElement


        })

        unionElement.replaceChildren(defaultOption,...optionElements)


        console.log(("lang", lang, options));
    }

    const htmlEl = document.documentElement;
    const observer = new MutationObserver(callback);

    observer.observe(htmlEl, {
        attributeFilter: ['lang'],
        attributeOldValue: false,
        subtree: false,
    });




})()






