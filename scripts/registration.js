(async () => {
    const inPersonNode = document.getElementById("attendance-person");
    const virtualNode = document.getElementById("attendance-virtually");
    const no_accommodation = document.getElementById("no-accommodation");
    const accommodation = document.getElementById("accommodation");
    const select = document.getElementById("type-accomodation");
    const form = document.getElementById("grab-Form");
    const virtual = document.getElementById('virtual');
    

    const togglefields = (hide) => {
        const notVirtualElements = document.getElementsByClassName("not-virtual")
        Array.from(notVirtualElements).forEach(element => {
            if (hide) {
                element.style.display = "none"
                element.removeAttribute("required")
                virtual.style.display = "inline-block"
                virtual.style.fontWeight = "bold"
                virtual.innerText = 'Virtual Attendance Fee: $25'
            } else {
                element.style.display = "inline-block"
                element.setAttribute("required", "")
                element.required = true;
                virtual.style.display = "none"
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

    const msg = document.getElementById("msg")
    const scriptURL = "https://script.google.com/macros/s/AKfycbyW2_2diylogBRguVJX5QDAbYMDmA45C9gqL3IjTInAxXg_wEVWSZlODpcvG5wJIJQm/exec";
    const form_reg = document.forms["submit-to-google-sheet"];
    const modalTitle = document.querySelector('#exampleModalLabel');
    const anchorModal = document.getElementById('anchor_modal');
    const modal = document.getElementById('exampleModal')
    anchorModal.removeAttribute('href');
    modalTitle.innerText = "Please fill out form";


    form.addEventListener('submit', e => {
        e.preventDefault();
        modalTitle.innerText = "Please wait...";
        fetch(scriptURL, { method: "POST", body: new FormData(form_reg) })
            .then(response => {
                modalTitle.innerText = "Submission Complete";
                anchorModal.setAttribute('href', '../index.html')
                msg.classList.toggle("alert")
                msg.classList.toggle("alert-success")
                msg.classList.toggle("text-center")
                msg.innerHTML = "Thank you for your submission!"
                form.reset();
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
        const payment_para = document.getElementById("payment_label_union");
        const langAlert = document.getElementById("language_alert");
        const firstAndLast = document.getElementById("first_and_last");
        if(lang == "fr"){
            para.innerText = "Selectionnez votre Union"
        }else {
            data.unions["en"]
            para.innerText = "Select your Union"
        }

        if(lang == "fr") {
            payment_para.innerText = "Je paierai mes propres dépenses par l'intermédiaire de mon union."
        }else if(lang == "es") {
            payment_para.innerText = "Pagaré mis propios gastos a través de mi union."
        }else {
            payment_para.innerText = "I will pay my own expenses through my union."
        }

        if(lang == 'fr'){
            langAlert.innerText = "Pour vous inscrire, sélectionnez votre langue à l'endroit indiqué : Select Language en haut à droite de la page."
        }else if(lang == 'es'){
            langAlert.innerText = "Para registrarse, seleccione su idioma  donde dice: Select Language en la parte superior a la derecha de la página."
        }
        else{
            langAlert.innerText = "To register, select your language where it says: Select Language at the top right of the page."
        }

        if(lang == 'es') {
            firstAndLast.innerText = "Nombre y apellido:"
        }else if(lang == 'fr'){
            firstAndLast.innerText = "Prénom et nom:"
        }else{
            firstAndLast.innerText = "First & Last Name:"
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






