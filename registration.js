let registrationForm = document.getElementById('registrationForm')
let fullnameInput = document.getElementById('fullname')
let fullnamError = document.getElementById('fullnameError')
let emailInput = document.getElementById('email')
let loginError = document.getElementById('loginError')
let passwordInput = document.getElementById('password')
let passwordError = document.getElementById('passwordError')

registrationForm.addEventListener('submit', submit)

function submit(event) {
	event.preventDefault()
	let fullname = fullnameInput.value.trim()
	let email = emailInput.value.trim()
	let password = passwordInput.value.trim()
	let count = 0

	if(fullname == ""){
		fullnamError.classList.remove('hidden')
	}else{
		fullnamError.classList.add('hidden')
		count++
	}
	if(email == ""){
		loginError.classList.remove('hidden')
	}else{
		loginError.classList.add('hidden')
		count++
	}
	if(password == ""){
		passwordError.classList.remove('hidden')
	}else{
		passwordError.classList.add('hidden')
		count++
	}
	if(count == 3){
		fetchRregistration(fullname, email, password)
	}

	
}

async function fetchRregistration(fullname, email, password) {
	try {
		let response = await fetch(
			'https://api.ashyo.fullstackdev.uz/auth/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fullname: fullname,
					email: email,
					password: password,
				}),
			}
		)

		let data = await response.json()
		localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
		localStorage.setItem('me', JSON.stringify(data.user))
		console.log(data)
	} catch (error) {
		console.error('Xatolik:', error)
	}
}
