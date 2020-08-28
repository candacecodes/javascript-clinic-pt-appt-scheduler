document.addEventListener('DOMContentLoaded', (e) => {

    let success = false 
    while (!success) {
        success = login() 
        return success
    }
}) 

let editAppointmentDetails 
let user 

const login = () => { 
    let return_value = false 
    let loginForm = document.getElementById('login-form') 
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault() 

        fetch('http://localhost:3000/users') 
        .then(res => res.json()) 
        .then(json => {
            let foundUser

            json.forEach(user => {
                if (user.name === e.target[0].value) {
                    let landingDiv = document.getElementById('landing') 
                    foundUser = user 
                    return_value = true
                    landingDiv.innerText = `Login successful, welcome ${user.name}.`

                    findAppointments(foundUser) // finds matching appts with user 
                    findProviders() // finds matching provider with
                    
                }
            })
            if (!foundUser) {
                let error = document.getElementById('login-error')
                error.innerText = "" 
                error.innerText = "Sorry, name is not found. Please try again or sign up."
                loginForm.reset()
            }

            else {
                let landingDiv = document.getElementById('landing') 

                // landingDiv.style.display = "none"
                // renderHomePage(foundUser)
                user = foundUser // used for a wider scope 

                let form = document.getElementById('form')
                form.addEventListener('submit', (e) => {
                    e.preventDefault()

                    if (!editAppointmentDetails) {
                        addAppointment(e, foundUser)
                    } 
                    else {
                        editAppointmentFunction(e, editAppointmentDetails, foundUser)
                    }
                    
                })

            }
        })

    })


    //Sign up 
    let signupForm = document.getElementById("signup-form")
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if (e.target[0].value === e.target[1].value){
            let data = {
                name: e.target[1].value
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {

                let landingDiv = document.getElementById("landing")
                landingDiv.innerText = `Sign up successful, welcome ${e.target[0].value}, please login.`
                return_value = true
            })

        }
        else {
            let error = document.getElementById("login-error")
            error.innerText = ""
            error.innerText = "Sorry, names do not match. Please try again."
            loginForm.reset()
        }
    })
    return return_value
}

const findAppointments = (user) => {

    fetch(`http://localhost:3000/appointments`)
    .then(res => res.json())
    .then(json => {
        let div = document.getElementById('appointment-list')
        div.innerHTML = '' 
        let render = false 
        json.forEach(appointment => {
            if (appointment.user_id == user.id) {
                fetch(`http://localhost:3000/appointments/${appointment.id}`)
                .then(res => res.json())
                .then(json => {
                    renderAppointments(json, user) // puts appts onto appointment list 

                })
            }
        })
    })
}

const renderAppointments = (json, user) => {

    let div = document.getElementById('appointment-list')
    let title = document.getElementById('appointment-title')
    let appointment = document.createElement('li')
    title.innerHTML = '' // way to style.display.none? 
    appointment.innerHTML = ''
    appointment.id = json.id
    appointment.innerHTML = `${json.date}` 
    div.appendChild(appointment)
    appointment.addEventListener('click', (e) => getAppointmentDetails(e, json, user))

}

// output appointment details 
// added edit button to appointment 
const getAppointmentDetails = (e, json, user) => {
    console.log(json)
    let div = document.getElementById('appointment-details')
    let title = document.getElementById('appointment-detail-title')
    // div.innerHTML = `<h4>Appointment Details</h4>`
    title.innerHTML = '' 

    //add details to div 
    let appointmentDetails = document.createElement('p')
    appointmentDetails.id = json.id 
    div.innerHTML = ''
    appointmentDetails.innerHTML = 
            `Appointment Date: ${json.date}
            <br>
            Provider: ${json.provider_id}
            <br>
            <id="appointment-note">Note: ${json.note}
            <br><br>`
    
    div.appendChild(appointmentDetails)

    //add edit button to appointmentDetails 
    let editAppointmentButton = document.createElement('button') 
    editAppointmentButton.id = `{json.id}` 
    editAppointmentButton.innerHTML = 'Edit' 
    appointmentDetails.appendChild(editAppointmentButton) 

    //add edit button event listener 
    editAppointmentButton.addEventListener('click', (e) => editAppointment(e, json, user))

    //add delete button to appointmentDetails 
    let deleteAppointmentButton = document.createElement('button') 
    deleteAppointmentButton.id = `{json.id}` 
    deleteAppointmentButton.innerHTML = 'Delete' 
    appointmentDetails.appendChild(deleteAppointmentButton) 

    //delete button event listener 
    deleteAppointmentButton.addEventListener('click', (e) => deleteAppointment(e, json, user)) 

}

const editAppointment = (e, json, user) => {
    console.log(json)

    editAppointmentDetails = json 

    let form = document.getElementById('form')
    let fdate = document.getElementById('fdate')
    let fprovider = document.getElementById('fprovider')
    let fnote = document.getElementById('fnote')
    let editAppointmentHeader = document.getElementById('add-appointment-sign')
    let submitButton = document.getElementById('submit')


    fdate.value = `${json.date}`
    fprovider.value = `${json.provider_id}`
    fnote.value = `${json.note}`

    editAppointmentHeader.innerHTML = ''
    editAppointmentHeader.innerHTML = 'Edit Appointment'
} 

const editAppointmentFunction = (e, json, user) => {
    let data = {
        date: e.target[0].value,
        provider_id: e.target[1].value,
        note: e.target[2].value,
        user_id: user.id
    }

    fetch(`http://localhost:3000/appointments/${json.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => updateAppointmentNote(json)) 

    resetForm() 
    findAppointments(user)
}

const updateAppointmentNote = (json) => {
    console.log(json)
    let div = document.getElementById('appointment-details')
    div.innerHTML = `<h4>Appointment Details</h4>`

    let appointmentDetails = document.createElement('ul')
    appointmentDetails.id = json.id 
    div.innerHTML = ''
    appointmentDetails.innerHTML = 
    `Appointment Date: ${json.date}
    <br>
    Provider: ${json.provider_id}
    <br>
    <id="appointment-note">Note: ${json.note}
        <br><br>`
    
    div.appendChild(appointmentDetails)

}

// possibilities for rerendering appt dates:
// have an array/var at the beginning that keeps track of all appts
// it'll update on the front end rather than fetching multiple times
// another solution: refetch  

const deleteAppointment = (e, json, user) => {
    fetch(`http://localhost:3000/appointments/${json.id}`, {
        method: 'DELETE'
    })
    .then(res => {
        let deleteThisAppointment = document.getElementById(`${json.id}`)
        deleteThisAppointment.remove() 
            
    })

    let div = document.getElementById('appointment-details')
    div.innerHTML = `<h4>Appointment Details</h4>
    <br> Appointment deleted.`
} 


// add appointment function 

const addAppointment = (e, user) => {
    let data = {
        date: e.target[0].value,
        note: e.target[2].value,
        provider_id: e.target[1].value,
        user_id: user.id
    }

    fetch(`http://localhost:3000/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(appt => renderAppointments(appt))

    resetForm()
}

//find matching providers 

const findProviders = () => {
    fetch(`http://localhost:3000/providers`)
    .then(res => res.json()) 
    .then(json => json.forEach(provider => renderProvider(provider)))
} 

//json => json.forEach(provider => renderProvider(provider))

const renderProvider = (provider) => {
    let list = document.getElementById('providers-list')
    let title = document.getElementById('provider-title')

    title.innerHTML = '' // way to style.display.none? 
    let providerInfo = document.createElement('li') 
    // providerInfo.id = provider.id 
    providerInfo.innerHTML = `${provider.name} at ${provider.hospital}`
    list.appendChild(providerInfo)
}

const resetForm = () => {
    const form = document.getElementById('form')
    const fdate = document.getElementById('fdate')
    const fprovider = document.getElementById('fprovider')
    const fnote = document.getElementById('fnote')
    const headerText = document.getElementById('add-appointment-sign')
    const button = document.getElementById('submit')

    fdate.value = ''
    fprovider.value = ''
    fnote.value = ''

    headerText.innerHTML = ''
    headerText.innerHTML = 'Add Appointment'
}

// when making fetch that grabs provider info, 
// also grab the form => provider collection select
// for each provider create an option tag that 
// appends to the select tag 
// append a select tag and iterate through providers