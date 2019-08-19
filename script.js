var userInput = document.getElementById("inputField");
var searchBtn = document.getElementById("searchBtn");
var listArea = document.getElementById("userList");
var errorZone = document.getElementById("errorZone");
var newListItem1 = document.createElement("li");
var newListItem2 = document.createElement("li");
var newListItem3 = document.createElement("li");
var usersPromise;
var postsPromise;
var albumsPromise;
var inputUser;
var inputUserId;

function getUserData() {
	let getUsersData = () => {
		return new Promise((resolve, reject) => {
			$.get('http://jsonplaceholder.typicode.com/users', (userData) => {
				resolve(userData);
			})
		})
	}

	let getPostsData = () => {
		return new Promise((resolve, reject) => {
			$.get('http://jsonplaceholder.typicode.com/posts', (postsData) => {
				resolve(postsData);
			})
		})
	}

	let getAlbumsData = () => {
		return new Promise((resolve, reject) => {
			$.get('http://jsonplaceholder.typicode.com/albums', (albumsData) => {
				resolve(albumsData);
			})
		})
	}
	usersPromise = getUsersData();
	postsPromise = getPostsData();
	albumsPromise = getAlbumsData();
	

	Promise.all([usersPromise, postsPromise, albumsPromise]).then((results) => {
		users = results[0];
		posts = results[1];
		albums = results[2];

		for (let i = 0; i < users.length; i ++) {
			if (inputField.value == users[i].username) {
				inputUser = users[i];
			} 
		}

		newListItem1.setAttribute("id", "user-li");
		newListItem2.setAttribute("id", "posts-li");
		newListItem3.setAttribute("id", "albums-li");
	

		newListItem1.innerHTML += `<strong>Username:</strong>  ${inputUser.username}<hr/> <br> <strong>Name: </strong>${inputUser.name}<hr/><br> <strong>Company: </strong>${inputUser.company.name}<hr/><br> <strong>Email: </strong>${inputUser.email}<hr/><br><strong>Website: </strong>${inputUser.website}<hr/><br><strong>Phone: </strong>${inputUser.phone}`;


		
		newListItem2.innerHTML += `<strong>Posts:</strong><br>`;
		for (let i = 1; i < posts.length; i ++) {
			if (posts[i].userId == inputUser.id) {
				newListItem2.innerHTML += `${posts[i].title}<hr/><br>`;
			} 
		}

		
		newListItem3.innerHTML += `<br><strong>Albums:</strong><br>`;
		for (let i = 1; i < albums.length; i ++) {
			if (albums[i].userId == inputUser.id) {
			newListItem3.innerHTML += `${albums[i].title}<hr/><br>`;
			}
		}


		userList.appendChild(newListItem1);
		userList.appendChild(newListItem2);
		userList.appendChild(newListItem3);
	
		
		inputUserId = inputUser.id;
		console.log(inputUser.id);
	
	}).catch((error) => {
		errorZone.innerHTML = `Sorry cant find that user! Try Again.`
		console.log("Velociraptor");
	})


}