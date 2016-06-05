var jsonplaceholderAPIUsers = "http://jsonplaceholder.typicode.com/users";
var jsonplaceholderAPIPosts = "http://jsonplaceholder.typicode.com/posts";
var jsonplaceholderAPIComments = "http://jsonplaceholder.typicode.com/comments";
var jsonplaceholderAPIAlbums = "http://jsonplaceholder.typicode.com/albums";
var jsonplaceholderAPIPhotos = "http://jsonplaceholder.typicode.com/photos";

function loadPhotos(){
	$.getJSON(jsonplaceholderAPIPhotos, function (data) {
	    console.log("Photos");
	    // console.log(data);
	    localStorage.photos = JSON.stringify(data);
	});
}

function loadAlbums(){
	$.getJSON(jsonplaceholderAPIAlbums, function (data) {
	    console.log("Albums");
	    // console.log(data);
	    var valueToAppend = '';
	    var count = 0;
	    for (var i=0;i<data.length;i++) {
	    		if(getUrlVars()["id"] == data[i].userId){
	    			count++;
	    			valueToAppend += getAlbumContent(data[i].id, data[i].title);
		    	}
	    }
	    $('#collectionAlbums').append(valueToAppend);
	    // $('#albumBadge').text(count)
	});
}

function getAlbumContent(id, title){
	// console.log(title)
	return '<a class="waves-effect waves-light btn blue" style="height: 60px;padding: 10px; '+
	'font-size: 10px; margin-top: 20px; margin-left: 20px;" id="album'+
	id+
	'" '+
	'albumName="'+
	title+
	'" onclick="albumclick(this)">'+
    	'<i class="material-icons left">assessment</i>'+
    	title+
    '</a>';
}

function albumclick(that){
	var id = $(that).attr('id');
	var albumName = $(that).attr('albumName');
	id = id.substring(5, id.length);
	getPhotobyAlbumId(id, albumName);
}

function getPhotobyAlbumId(albumId, albumName){
	// console.log(albumId)
	// console.log(localStorage.comments)
	var data = JSON.parse(localStorage.photos);
	var valueToAppend = '';
	for (var i=0;i<data.length;i++) {
    	if(albumId == data[i].albumId){
    		// console.log('sdf');
	    	valueToAppend += getPhotoContent(data[i].id, data[i].title, data[i].url, data[i].thumbnailUrl);
	    }
    }
    console.log('#album' + albumId)
	    // $('#album' + albumId).append(valueToAppend)
	    // console.log(valueToAppend)
	    swal({   title: toTitleCase(albumName),   text: valueToAppend,   html: true });
}

function getPhotoContent(id, title, url, thumbnailUrl){
	return '<a onclick="clickphoto(this)" mainUrl="'+
	url +
	'" mainThumbnailUrl="'+
	thumbnailUrl+
	'" mainTitle="'+
	title+
	'"><img src="'+
	thumbnailUrl+
	'" height="30px" width="30px"/></a>';
}

function clickphoto(that){
	var mainUrl = $(that).attr('mainUrl');
	var mainTitle = $(that).attr('mainTitle');
	var mainThumbnailUrl = $(that).attr('mainThumbnailUrl');
	var valueToAppend = '<img src="' + mainThumbnailUrl + '" height="30px" width="30px" /><br/>'+
	'<img src="' + mainUrl + '" height="300px" width="300px" />';
	swal({   title: toTitleCase(mainTitle),   text: valueToAppend,   html: true });

}

function loadUsers(){
	$.getJSON(jsonplaceholderAPIUsers, function (data) {
	    console.log("Users");
	    // console.log(data);
	    var users = [];
	    for (var i=0;i<data.length;i++) {
	    		$('#collectionUsers').append(getUserContent(data[i].id, data[i].name, data[i].company.name));
	    		users[data[i].id] = data[i];
	    }
	    localStorage.users = JSON.stringify(users);
	});
}

function loadComments(){
	$.getJSON(jsonplaceholderAPIComments, function (data) {
	    console.log("Comments");
	    // console.log(data);
	    localStorage.comments = JSON.stringify(data);
	});
}

function getCommentByPostId(postId){
	// console.log(postId)
	// console.log(localStorage.comments)
	var data = JSON.parse(localStorage.comments);
	var valueToAppend = '<ul class="collection">';
	for (var i=0;i<data.length;i++) {
    	if(postId == data[i].postId){
    		// console.log('sdf');
	    	valueToAppend += getCommentContent(data[i].id, data[i].email, data[i].name, data[i].body);
	    }
    }
    valueToAppend += '</ul>';
    // console.log('#post' + postId)
    if($('#post' + postId).find('ul').length == 0){
	    $('#post' + postId).append(valueToAppend)
	}else{
		$('#post' + postId).find('ul').remove()
	}
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getCommentContent(id, email, title, body){
	return '<li class="comment"><p class="commentTitle"><b>'+
		toTitleCase(title)+
		'</b>(<i>'+
		email+
		'</i>)'+
		'</p>'+
		'<p class="commentDesc">'+
		body+
		'</p></li><br/>';
}

// function compare(a,b) {
//   if (a.timestamp > b.timestamp)
//     return -1;
//   else if (a.timestamp < b.timestamp)
//     return 1;
//   else 
//     return 0;
// }

function loadPosts(){
	$.getJSON(jsonplaceholderAPIPosts, function (data) {
	    console.log("Posts");
	    // console.log(data);
	    var valueToAppend = '';
	    var valueToAppendArray = [];
	    var count = 0;
	    for (var i=0;i<data.length;i++) {
	    		if(getUrlVars()["id"] == data[i].userId){
	    			count++;
	    			// valueToAppend += getPostContent(data[i].id, data[i].timestamp, data[i].title, data[i].body);
	    			valueToAppendArray.push({
	    				id: data[i].id, 
	    				title: data[i].title, 
	    				body: data[i].body
	    			})
		    	}
	    }
	    //valueToAppendArray = valueToAppendArray.sort(compare);
	    var data = valueToAppendArray;
	    for (var i=0;i<data.length;i++) {
	    	valueToAppend += getPostContent(data[i].id, data[i].title, data[i].body);
	    				
	    }
	    $('#collectionPosts').append(valueToAppend);
	    // $('#postBadge').text(count)
	});
	loadComments();
	loadAlbums();
	loadPhotos();
}

function postclick(that){
	var id = $(that).attr('id');
	id = id.substring(4, id.length);
	getCommentByPostId(id)
}

function getPostContent(id, title, body){
	// console.log(name, company)
	return '<a class="collection-item" id="post'+
		id+
		'" onclick="postclick(this)"'+
		'"> '+
		'<p class="title">'+
		title+
		'</p>'+
		'<p class="desc">'+
		body+
		'</p>'+
	'</a>';
}

function redirectToIndex(){
	window.location = "index.html";
}

function checkId(){
	if(isNaN(getUrlVars()["id"])){
		redirectToIndex();
	}
}

function getSingleUserInfo(){
	checkId();
	var users = JSON.parse(localStorage.users);
	// console.log(users)
	console.log(users[getUrlVars()["id"]])
	var user = users[getUrlVars()["id"]];

	$('#logo-container').text(user.name);
	$('#email').text(user.email);
	$('#phone').text(user.phone);
	$('#website').text(user.website);

	$('#suite').text(user.address.suite);
	$('#street').text(user.address.street);
	$('#city').text(user.address.city);
	$('#zipcode').text(user.address.zipcode);

	$('#companyname').text(user.company.name);
	$('#companycatchPhrase').text('"' + user.company.catchPhrase + '"');


}

function getUserContent(id, name, company){
	// console.log(name, company)
	return '<a class="collection-item avatar" href="profile.html?id='+
		id+
		'">'+
		'<i class="material-icons circle indigo darken-4" style="margin-top: 15px">perm_identity</i>'+
		'<p class="title">'+
		name+
		'</p>'+
		'<p class="desc">'+
		company+
		'</p>'+
	'</a>';
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
	  vars[key] = value;
	});
	return vars;
}

function showContent(value){
	// console.log(value)
	if(value == "post"){
		removeClassButtonBadge('post')
		addClassButtonBadge('post', '')
		addClassButtonBadge('album', 'lighten-2')
		$('#collectionPosts').show();
		$('#collectionAlbums').hide();
	}else if(value == "album"){
		removeClassButtonBadge('album')
		addClassButtonBadge('album', '')
		addClassButtonBadge('post', 'lighten-2')
		$('#collectionPosts').hide();
		$('#collectionAlbums').show();
	}	
}

function addClassButtonBadge(value, shade){
	$('#' + value + 'Button').addClass('waves-effect waves-light btn indigo ' + shade);
	// $('#' + value + 'Badge').addClass('waves-effect waves-light btn indigo ' + shade);
}

function removeClassButtonBadge(value){
	$('#' + value + 'Button').removeClass('waves-effect waves-light btn indigo lighten-2');
	// $('#' + value + 'Badge').removeClass('waves-effect waves-light btn indigo lighten-2');
}

