let API_KEY='72bc8ce590892ae2db211ad199f49784'

function search(){
    let city=document.querySelector('.search-input')?.value;
    if(!city){
       fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
       .then(res=>res.json())
       .cstch(err=>console.log(err))
    }
} 

let btn=document.querySelector('.search-btn');
btn.addEventListener('click',search)