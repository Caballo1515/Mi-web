


$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Web Developer", "Mobile Developer", "Software Developer", "Software Engineer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Web Developer", "Mobile Developer", "Software Developer", "Software Engineer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

var firebaseConfig = {
    apiKey: "AIzaSyBaT2WId_JiB1R5ID1UYbstrsgkqPQYLNo",
    authDomain: "alexandruresume.firebaseapp.com",
    projectId: "alexandruresume",
    storageBucket: "alexandruresume.appspot.com",
    messagingSenderId: "712448087932",
    appId: "1:712448087932:web:bccbc88852337f2854b6f9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
var db = firebase.firestore();

var condicion = -1;

function add (){

    console.log("ejecutando el envio de mensaje")
    var nombre = document.getElementById("nombretextlabel").value;
    var correo = document.getElementById("emailtextlabel").value;
    var tema = document.getElementById("subjecttextlabel").value;
    var mensaje = document.getElementById("messagetextlabel").value;
    
    var aux = new Date();
    
    var day = aux.getDate();
    if (day<10){ 
        day = '0' + day;
    }
    var month = aux.getMonth()+1;
    if (month<10){ 
        month = '0' + month;
    }
    var year = aux.getFullYear();
    var hours = aux.getHours();
    if (hours<10){ 
        hours = '0' + hours;
    }
    var minutes = aux.getMinutes();
    if (minutes<10){ 
        minutes = '0' + minutes;
    }
    var seconds = aux.getSeconds();
    if (seconds<10){ 
        seconds = '0' + seconds;
    }


    
    var today = day + '-' + month + '-' + year;
    var time = hours + ':' + minutes + ':' + seconds;
    var thisMoment = today + ' ' + time;

    db.collection("users").add({
        name: nombre,
        mail: correo,
        subject: tema,
        message: mensaje,
        date: thisMoment 
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("The message has been sent");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Error");
    });
    var usersRef = db.collection("users");
    usersRef.orderBy("date");
    return false;
}
    
window.onload = inicio;
function inicio(){
    
    db.collection("users").add({
        date:"ERROR"
    })
    .then((docRef) => {
        var id;
        id = docRef.id;
        db.collection("users").doc(id).delete().then(() => {
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
    
    console.log("Web started");
    document.querySelector("#sendmessage").onclick= add;
}
