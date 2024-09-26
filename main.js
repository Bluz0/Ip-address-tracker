var api_key = "at_2eBVcL0W6ik4BRGOrPlclZjT0F99Q";

var map = L.map('map');
var zoom = 13;

let inputIP = document.querySelector(".ip-adress");
let buttonIP = document.querySelector("#box-button");
var ip = inputIP.value;

let p_id = document.querySelector("#adress-p");
let p_loc = document.querySelector("#loc");
let times = document.querySelector("#timez");
let p_isp = document.querySelector("#isb-p");


$(function () { // Function from api website (idk wth is ajax or jquery but its good)
    $.ajax({ // When ip = "" , your actual localisation
        url: "https://geo.ipify.org/api/v1",
        data: {apiKey: api_key, ipAddress: ip},
        success: function(data) {
        //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");

        buttonIP.addEventListener("click", function get_data(){ // when we click on button

            ip = inputIP.value;
            $.ajax({ // Look at ip value in input and load actual map
                url: "https://geo.ipify.org/api/v1",
                data: {apiKey: api_key, ipAddress: ip},
                success: function(data) {
                    //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
                    
                    let latitude = data.location.lat;
                    let longitude = data.location.lng;
                    let timeZone = "UTC"+data.location.timezone;

                    map.setView([latitude, longitude], zoom);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // Get map
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    let blackIcon = L.icon({iconUrl: 'images/icon-location.png'}); // Change marker
                    let marker = L.marker([latitude, longitude],{icon:blackIcon}).addTo(map);

                    p_id.innerHTML = data.ip;
                    p_loc.innerHTML = data.location.country+" "+data.location.region+", "+data.location.city;
                    times.innerHTML = "UTC"+data.location.timezone;
                    p_isp.innerHTML = data.isp;

                }
            });
            
        });
        
    }
    });
});