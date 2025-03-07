let profilInfo = document.getElementById('profilInfo')
let iconsNavOpenClose = document.getElementById('iconsNavOpenClose')
let nav = document.getElementById('nav')
let profilPhoto = document.getElementById('profilPhoto')
let navBar = document.getElementById('nav-bar')
let tagsElement1 = document.getElementById('tagsElement1')
let tagsElementText = document.getElementById('tagsElementText')
let logout = document.getElementById('logout')
let logoutText = document.getElementById('logoutText')
let navTitle = document.getElementById('navTitle')
let iconsNavOpenClose2 = document.getElementById('iconsNavOpenClose2')
let navTitle1 = document.getElementById('navTitle1')
let search = document.getElementById('search')
let addStudent = document.getElementById('addStudent')
let tbody = document.querySelector('tbody')

let madalAdd = document.getElementById('madalAdd')
let fullnameInput = document.getElementById('fullname')
let fullnamError = document.getElementById('fullnameError')
let emailInput = document.getElementById('email')
let loginError = document.getElementById('loginError')
let passwordInput = document.getElementById('password')
let passwordError = document.getElementById('passwordError')
let numberInput = document.getElementById('number')
let numberError = document.getElementById('numberError')
let modalError = document.getElementById('modalError')
let modalErrorText = document.getElementById('modalErrorText')
let modalClose = document.getElementById("modalClose")
let closeAdd = document.getElementById('closeAdd')
let addContainer  = document.getElementById('addContainer')

let editPasswordInput =document.getElementById('editPassword')
let editeNumberInput = document.getElementById('editeNumber')
let editefullnameInput = document.getElementById('editefullname')
let editeEmailInput = document.getElementById('editeEmail')
let editModal = document.getElementById('editModal')
let updadeModal = document.getElementById('updadeModal')
let closeEdite = document.getElementById('closeEdite')
let fullnamError1 =document.getElementById('fullnameError1')
let loginError1 =document.getElementById('loginError1')
let passwordError1 =document.getElementById('fullnameError1')
let numberError1 =document.getElementById('fullnameError1')


function read() {
	let userData = JSON.parse(localStorage.getItem('me'))
		? JSON.parse(localStorage.getItem('me'))
		: []

	profilInfo.innerHTML = `
		<div class="text-center ">
		<h1 id="userName" class = "mb-[10px] font-Montserrat text-[17px] text-[#000000] font-[700] tracking-[0%] leading-[100%]">${userData.fullname}</h1>
		<h1 id="userRole" class = "text-[#FEAF00] font-Montserrat text-[14px] font-[500] tracking-[0%] leading-[100%]">${userData.role}</h1>
		</div>
	`
}
read()
let count = 0

iconsNavOpenClose.addEventListener('click', mdRespon)
iconsNavOpenClose2.addEventListener('click', Respon)

function mdRespon() {
	nav.classList.toggle('md:max-w-[52px]')
	nav.classList.toggle('md:px-[5px]')
	iconsNavOpenClose.classList.toggle('rotate-[180deg]')
	profilPhoto.classList.toggle('md:max-w-[30px]')
	profilInfo.classList.toggle('md:block')
	tagsElement1.classList.toggle('max-w-[50px]')
	tagsElementText.classList.toggle('md:block')
	logoutText.classList.toggle('md:block')
	logout.classList.toggle('md:left-[18px]')
	navTitle.classList.toggle('md:max-w-[40px]')
	navTitle.classList.toggle('md:ml-[15px]')

	if (count == 0) {
		navTitle.innerHTML = `A`
		count++
	} else {
		navTitle.innerHTML = `Admin Students`
		count = 0
	}
}

function Respon() {
	nav.classList.toggle('max-w-[52px]')
	nav.classList.toggle('w-[300px]')
	nav.classList.toggle('px-[5px]')
	nav.classList.toggle('px-[30px]')
	nav.classList.toggle('min-w-[285.5px]')

	navTitle1.classList.toggle('w-[30px]')
	navTitle1.classList.toggle('w-[285.5px]')
	navTitle1.classList.toggle('ml-[15px]')
	navTitle1.classList.toggle('ml-[-10px]')
	navTitle1.classList.toggle('text-[15px]')

	iconsNavOpenClose2.classList.toggle('rotate-[180deg]')

	profilPhoto.classList.toggle('max-w-[128px]')
	profilInfo.classList.toggle('hidden')
	tagsElement1.classList.toggle('max-w-[50px]')
	tagsElement1.classList.toggle('max-w-[193px]')

	tagsElementText.classList.toggle('hidden')

	logoutText.classList.toggle('hidden')
	logout.classList.toggle('left-[20px]')

	if (count == 0) {
		navTitle1.innerHTML = `Admin Students`
		count++
	} else {
		navTitle1.innerHTML = `A`
		count = 0
	}
}

logout.addEventListener('click', function () {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('me')
	window.location.href = 'index.html'
})

addStudent.addEventListener('click', function () {
	addContainer.classList.remove('scale-0')
})

madalAdd.addEventListener('submit', function (event) {
	event.preventDefault()
	let fullname = fullnameInput.value.trim()
	let email = emailInput.value.trim()
	let password = passwordInput.value.trim()
	let number = numberInput.value.trim()

	let on = 0

	if (fullname == '') {
		fullnamError.classList.remove('hidden')
	} else {
		fullnamError.classList.add('hidden')
		on++
	}
	if (email == '') {
		loginError.classList.remove('hidden')
	} else {
		loginError.classList.add('hidden')
		on++
	}
	if (password == '') {
		passwordError.classList.remove('hidden')
	} else {
		passwordError.classList.add('hidden')
		on++
	}
	if (number == '') {
		numberError.classList.remove('hidden')
	} else {
		numberError.classList.add('hidden')
		on++
	}
	if (on == 4) {
		fetchAdd(fullname, email, number, password)
		madalAdd.classList.add('scale-0')
	}
})

function fetchAdd(fullname, email, number, password) {
	const formdata = new FormData();
	formdata.append('fullname', fullname);
	formdata.append('email', email);
	formdata.append('phone_number', `+998${number}`);
	formdata.append('password', password);
	formdata.append('Role', 'USER');
	formdata.append('is_verified', 'false');

	
	fetch('https://skrinshoter.ru/sUWzKfusgqB') 
		.then(response => response.blob())
		.then(blob => {
			formdata.append('image', blob, 'fixed-image.jpg');

			const requestOptions = {
				method: 'POST',
				body: formdata,
				redirect: 'follow',
			};

			return fetch('https://api.ashyo.fullstackdev.uz/users/add', requestOptions);
		})
		.then(response => response.text())
		.then(result => {
			modalErrorText.innerHTML = `<p class="w-full h-full text-wrap break-all">${result}</p>`
			modalError.classList.remove('hidden')
		})
		.catch(error => {
			modalErrorText.innerHTML += error
			modalError.classList.remove('hidden')
		});
}

modalClose.addEventListener('click' , function(){
	modalError.classList.add('hidden')
})

closeAdd.addEventListener('click' , function(){
	
	addContainer.classList.add('scale-0')

})


function readTable(){
	fetch('https://api.ashyo.fullstackdev.uz/users').then((response)=>{
		return response.json();
	}).then((response) => {
		tbody.innerHTML = ""
			response.map((obj , index)=>{
				tbody.innerHTML +=`
				
						<tr id="user${index}" class = "px-[13px] h-[85px] py-[15px] rounded-[8px]  overflow-hidden font-Montserrat text-black text-[14px] font-[400] leading-[100%] tracking-[0%] ">
	
							<td class="p-3 bg-white">
							<img src="img/user.png" alt="" class="w-[65px] h-[55px] rounded-[10px] mx-auto "></td>
							<td class="p-3 bg-white">${obj.fullname}</td>
							<td class="p-3 bg-white">${obj.email}</td>
							<td class="p-3 bg-white">${obj.phone_number}</td>
							<td class="p-3 bg-white">${obj.role}</td>
							<td class="p-3 bg-white">${obj.createdAt}</td>
							<td class="p-3 bg-white "> 
								<button onclick="openUpdate(${obj.id})" class="text-[#FEAF00] text-[20px] mr-[14px]"><i class='bx bx-edit'></i></button>
								<button onclick="deleteDate(${obj.id})" class="text-[#FEAF00] text-[20px]"><i class='bx bx-trash-alt'></i></button>
							</td>
						</tr>
					`
					search.addEventListener('keyup' , function(){
						let searchval = search.value ;
						let user = document.getElementById(`user${index}`)
						if(obj.fullname.toUpperCase().includes(searchval.toUpperCase())){
							user.classList.remove('hidden')
						}else{
							user.classList.add('hidden')
						}
					})
		})
	})
}

readTable()



function openUpdate(userId){
	updadeModal.classList.remove('scale-0')
	editefullnameInput.dataset.userID = 	userId
}

closeEdite.addEventListener('click', function(){
	updadeModal.classList.add('scale-0')
})
editModal.addEventListener('submit' , function(event){
	event.preventDefault()
	let on = 0 
	let editeEmail  = editeEmailInput.value
	let editeNumber  = editeNumberInput.value
	let editPassword  = editPasswordInput.value
	let editefullname = editefullnameInput.value


	if (editefullname == '') {
		fullnamError1.classList.remove('hidden')
	} else {
		fullnamError1.classList.add('hidden')
		on++
	}
	if (editeEmail == '') {
		loginError1.classList.remove('hidden')
	} else {
		loginError1.classList.add('hidden')
		on++
	}
	if (editPassword == '') {
		passwordError1.classList.remove('hidden')
	} else {
		passwordError1.classList.add('hidden')
		on++
	}
	if (editeNumber == '') {
		numberError1.classList.remove('hidden')
	} else {
		numberError1.classList.add('hidden')
		on++
	}
	if (on == 4) {
		fetchEdite(fullname, email, number, password )
		madalAdd.classList.add('scale-0')
	}

	fetchEdite(editefullname, editeEmail, editeNumber, editPassword , editefullnameInput.dataset.userID)
})
function fetchEdite(fullname, email, number, password , Id) {
	const formdata = new FormData();
	formdata.append('fullname', fullname);
	formdata.append('email', email);
	formdata.append('phone_number', `+998${number}`);
	formdata.append('password', password);
	formdata.append('Role', 'USER');
	formdata.append('is_verified', 'false');

	
	fetch('https://skrinshoter.ru/sUWzKfusgqB') 
		.then(response => response.blob())
		.then(blob => {
			formdata.append('image', blob, 'fixed-image.jpg');

			const requestOptions = {
				method: 'PUT',
				body: formdata,
				redirect: 'follow',
			};

			return fetch(`https://api.ashyo.fullstackdev.uz/users/${Id}`, requestOptions);
		})
		.then(response => response.text())
		.then(result => {
			modalErrorText.innerHTML = `<p class="w-full h-full text-wrap break-all bg-green-400">${result}</p>`
			modalError.classList.remove('hidden')
		})
		.catch(error => {
			modalErrorText.innerHTML += error
			modalError.classList.remove('hidden')
		});
		readTable()
		updadeModal.classList.add('scale-0')
}


function deleteDate(id){

		fetch(`https://api.ashyo.fullstackdev.uz/users/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
	
}
	

	


