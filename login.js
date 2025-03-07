let loginForm = document.getElementById('loginForm')
let emailInput = document.getElementById('email')
let loginError = document.getElementById('loginError')
let passwordInput = document.getElementById('password')
let passwordError = document.getElementById('passwordError')

loginForm.addEventListener('submit', submit)


function submit(event) {
	event.preventDefault()
	let email = emailInput.value.trim()
	let password = passwordInput.value.trim()
	let count = 0

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
	if(count == 2){
		fetchLogin(email, password)
	}
}

async function fetchLogin(email, password) {
	try {
		let response = await fetch('https://api.ashyo.fullstackdev.uz/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})

		let data = await response.json()
		localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
		localStorage.setItem('me', JSON.stringify(data.user))
		window.location.href = "student-table.html"	
	} catch (error) {
		console.error('Xatolik:', error)
	}
}

function openTable(){
	let accessToken =  JSON.parse(localStorage.getItem('accessToken'))?JSON.parse(localStorage.getItem('accessToken')):[]
	if(accessToken !=""){
		window.location.href = "student-table.html"	
	}
}
openTable()