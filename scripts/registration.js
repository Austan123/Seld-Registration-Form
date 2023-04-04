(async () => {
    const inPersonNode = document.getElementById("attendance-person")
    const virtualNode = document.getElementById("attendance-virtually")
    const no_accommodation = document.getElementById("no-accommodation")
    const accommodation = document.getElementById("accommodation")
    const select = document.getElementById("type-accomodation")
    const form = document.getElementById("grab-Form")

    const togglefields = (hide) => {
        const notVirtualElements = document.getElementsByClassName("not-virtual")
        Array.from(notVirtualElements).forEach(element => {
            if (hide) {
                element.style.display = "none"
                element.removeAttribute("required")
            } else {
                element.style.display = "inline-block"
                element.setAttribute("required", "")
                element.required = true;
            }

        });

        
    }

    const togglefields_2 = (hide) => {
        const notAccommodationElements = document.getElementsByClassName("not-accommodation")

        Array.from(notAccommodationElements).forEach(item => {
            if(hide) {
                item.style.display = "none"
                item.removeAttribute("required")
            } else {
                item.style.display = "inline-block"
                item.setAttribute("required", "")
                item.required = true;
            }
        });

    }

    const togglefields_3 = (hide) => {
        const notSingleElements = document.getElementsByClassName("not-single")

        Array.from(notSingleElements).forEach(item => {
            if(hide) {
                item.style.display = "none"
                item.removeAttribute("required")
            } else {
                item.style.display = "inline-block"
                item.setAttribute("required", "")
                item.required = true;
            }
        });
    }

    inPersonNode.addEventListener("click", (e) => {
        togglefields(false)
    })

    virtualNode.addEventListener("click", (e) => {
        togglefields(true)
    })
    accommodation.addEventListener("click", (e) => {
        togglefields_2(false)
    })
    no_accommodation.addEventListener("click", (e) => {
        togglefields_2(true)
    })
    select.addEventListener("click", function() {
        select.addEventListener("change", (e) => {
            if(select.value == "Single Room"){
                togglefields_3(true)
            }else{
                togglefields_3(false)
            }
        })

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
        const para = document.getElementById("union-para");
        if(lang == "fr"){
            para.innerText = "Selectionnez votre Union"
        }else {
            data.unions["en"]
            para.innerText = "Select your Union"
        }


        const optionElements = options.map((option) => {
            const optionElement = document.createElement("option")
            const optionTxtNode = document.createTextNode(option)
            optionElement.appendChild(optionTxtNode)
            return optionElement


        })

        unionElement.replaceChildren(defaultOption, ...optionElements)


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






