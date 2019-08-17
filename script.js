var resultZone = document.getElementById("results");
var inputField = document.getElementById("inputField");
var submitBtn = document.getElementById("submitBtn");
var limitedUsers;	
var limitedPosts;
var inputUser;
var inputPosts;
var usersId;
var usersPromise;
var postsPromise;
var albumsPromise;
var users;
var posts;
var albums;

function getUserData(data) {

function getAllUsers() {
	return new Promise(function(resolve,reject){
			$.get('http://jsonplaceholder.typicode.com/users', function(users){
				resolve(users);
			}).fail((error)=>{
				reject(error);
			})
	})

}

function getAllPosts() {
	return new Promise(function(resolve,reject){
			$.get('http://jsonplaceholder.typicode.com/posts', function(posts){
				resolve(posts);
			}).fail((error)=>{
				reject(error);
			})
	})
}

function getAllAlbums() {
	return new Promise(function(resolve,reject){
			$.get('http://jsonplaceholder.typicode.com/albums', function(albums){
				resolve(albums);
			}).fail((error)=>{
				reject(error);
			})
	})
}

 usersPromise = getAllUsers();
 postsPromise = getAllPosts();
 albumsPromise = getAllAlbums();

Promise.all([usersPromise, postsPromise, albumsPromise])
	.then(function(results){
		 users = results[0];
		 posts = results[1];
		 albums = results[2];
		 
		//console.log(users);
		//console.log(posts);
		limitedUsers = users.filter((user) => {
		 inputUser = inputField.value;
		 usersId = user.id;	
			return user.username.includes(inputUser);
		})
		
		 console.log(limitedUsers);
		 console.log(posts[usersId].userId);

		 // resultZone.innerHTML = posts[usersId].title;

		//  limitedPosts = posts.filter((pst) => {
		//  inputPosts = inputField.value;
		// 	return pst.id.includes(inputPosts);
		// })
		 // console.log(limitedPosts);

		 if (limitedUsers.length < 1) {
			resultZone.innerHTML += "<br> No User found.";
			console.log("error");
		}

		 limitedUsers.forEach((item) => {
			  
			//variable stores yet to be created list element...
			var newListItem = document.createElement("li");
			//content is added to yet to be list item....
			newListItem.innerHTML = `Username: ${item.username} <br> Name: ${item.name} <br> Email: ${item.email} <br> Phone: ${item.phone} <br> Posts: ${posts[usersId].title} <br> Albums: ${albums[usersId].title}`;
			//ul id is grabbed...
			var userList = document.getElementById("userList");
			//new list item is appended to the unordered list...
			userList.appendChild(newListItem);

		})


	
}).catch((err)=>{
	console.log("Velociraptor")
})

}