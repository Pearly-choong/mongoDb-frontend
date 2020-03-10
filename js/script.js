console.log("front-end");
console.log(sessionStorage);
let url;

$(document).ready(function(){
  if(sessionStorage['userName']){
    console.log('You are logged in');
  } else {
    console.log('Please login');
  }


  $('#heading').click(function(){
    // $(this).css('background', 'teal');
  });

$('#loginForm').hide();
$('#loginBtn').click(function(){
  $('#loginForm').show();
  $()
});

$('#adminPage').hide();
$('#adminBtn').click(function(){
  $('#adminPage').show();
  $('#homePage').hide();
});

$('#homeBtn').click(function(){
  $('#adminPage').hide();
  $('#homePage').show();
})

//get url and port from config.json
$.ajax({
  url :'config.json',
  type :'GET',
  dataType :'json',
  success : function(configData){
    console.log(configData);
    url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
    console.log(url);
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
}); //ajax



// ======= View users ===========
$('#viewUserBtn').click(function(){
  $.ajax({
  //url :`http://192.168.33.10:3000/allUsers`,
  url :`${url}/allUsers`,
  type :'GET',
  dataType :'json',
  success : function(usersFromMongo){
    console.log(usersFromMongo);
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax
}); //viewUsers button



// ======= View products ===========
$('#viewProductBtn').click(function(){
  $.ajax({
  //url :`http://192.168.33.10:3000/allUsers`,
  url :`${url}/ProductsFromDB`,
  type :'GET',
  dataType :'json',
  success : function(productsFromMongo){
    console.log(productsFromMongo);
    document.getElementById('productCards').innerHTML = "";

    for(let i=0; i<productsFromMongo.length; i++){
      document.getElementById('productCards').innerHTML +=
      `<div class="col pt-5">
      <h3 class=""> ${productsFromMongo[i].productname}</h3>
      <h4 class=""> ${productsFromMongo[i].price}</h4>
      </div>`;
    }

  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax
}); //viewProduct button



// ======= Product form - update product ===========
$('#productForm').submit(function(){
  event.preventDefault();
  let  productId = $('#productId').val();
  let  productName = $('#productName').val();
  let  productPrice = $('#productPrice').val();
  let  userId = $('#userId').val();

  console.log(productId, productName, productPrice, userId);
  $.ajax({
    url :`${url}/updateProduct/${productId}`,
    type :'PATCH',
    data:{
      productname : productName,
      price : productPrice,
      userId : userId
      },
    success : function(data){
      console.log(data);
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error


  });//ajax

});//product function for productForm





// ======= Login ===========
$('#loginForm').submit(function(){
// $('#submit').click(function(){
  event.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  console.log(username, password);
  $.ajax({
    url :`${url}/loginUser`,
    type :'POST',
    data : {
        username : username,
        password : password
    },
    success : function(loginData){
      console.log(loginData);
      if (loginData === 'user not found. Please register'){
        alert('Register Please');
      } else {
        sessionStorage.setItem('userId', loginData['_id']);
        sessionStorage.setItem('userName',loginData['username']);
        sessionStorage.setItem('userEmail',loginData['email']);
        console.log(sessionStorage);
      }

  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax
}); //submit function for loginForm



// ======= Logout  ===========
$('#logoutBtn').click(function(){
  sessionStorage.clear();
  console.log(sessionStorage);
})





}); //document.ready
