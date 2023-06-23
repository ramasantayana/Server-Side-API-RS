let API_KEY=process.env.OPENWEATHER_API_KEY

const previous_data=JSON.parse(localStorage.getItem('data')||"{}");

function insertData(data){
    console.log(data)
   let list=data.list;
   let todayData=list[0];
   let cityName=document.querySelector('.city-name');
   cityName.innerHTML=`${data.city.name} (${new Date(todayData.dt*1000).toLocaleDateString()}) <img src=${`http://openweathermap.org/img/w/${todayData.weather[0].icon}.png`} /> `
   document.querySelector('#temp').innerHTML=todayData.main.temp;
   document.querySelector('#humidity').innerHTML=todayData.main.humidity;
   document.querySelector('#wind').innerHTML=todayData.wind.speed;

   let count=5;
   let forcastWrapper=document.querySelector('.forcast-wrapper');
   forcastWrapper.innerHTML=''
   for(let i=1;i<data.list.length;i++){
    let currentData=data.list[i];
    forcastWrapper.insertAdjacentHTML('beforeend',`
    <div class="forcast">
    <p>${currentData.dt_txt}</p>
    <img  src=${`http://openweathermap.org/img/w/${currentData.weather[0].icon}.png`}  />
    <p>Temp : ${currentData.main.temp} </p>
    <p>Wind : ${currentData.wind.speed}</p>
    <p>Humidity : ${currentData.main.humidity}</p>
</div>
    
    `)

   }
   if(!previous_data[data.city.name]){
    document.querySelector('.left-area').insertAdjacentHTML('beforeend',`
    <button class="city-btn" onclick="loadData('${data.city.name}')">${data.city.name}</button>`)
   }
   previous_data[data.city.name]=data
   localStorage.setItem('data',JSON.stringify(previous_data));

}

function fetchWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res=>res.json())
    .then(res=>insertData(res))
    .catch(err=>console.log(err))
}

function search(){
   //alert(1)
    let city=document.querySelector('.search-input')?.value;
    if(city){
       fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
       .then(res=>res.json())
       .then(res=>{
        const {lat,lon}=res[0]
        console.log({lat,lon})
         fetchWeather(lat,lon)
       })
       .catch(err=>console.log(err))
    }
} 


function loadData(name){
    insertData(previous_data[name])
}

Object.keys(previous_data).map(name=>{
    document.querySelector('.left-area').insertAdjacentHTML('beforeend',`
    <button class="city-btn"  onclick="loadData('${name}')">${name}</button>`)
})

let btn=document.querySelector('.search-btn');
btn.addEventListener('click',search)