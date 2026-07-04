const map = new maplibregl.Map({
container: 'map',
style:
'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
center: [103.8, 1.35],
zoom: 4
});

fetch('data.json')
.then(r => r.json())
.then(data => {

const coordinates = [];

data.forEach((p,index)=>{

coordinates.push([p.lon,p.lat]);

const el = document.createElement('div');
el.className = 'marker';

new maplibregl.Marker(el)
.setLngLat([p.lon,p.lat])
.addTo(map);

const timeline =
document.getElementById('timeline');

const button =
document.createElement('div');

button.className='timeline-item';

button.innerHTML=`
<h3>DAY ${index+1}</h3>
`;

timeline.appendChild(button);

function showStory(){

document
.querySelectorAll('.timeline-item')
.forEach(i=>i.classList.remove('active'));

button.classList.add('active');

document.getElementById('content').innerHTML=`

<h1>A Journey of Learning</h1>

<div class="subtitle">
Singapore Internship Experience 2026
</div>

<img src="${p.image}">

<h2>${p.title}</h2>

<p><strong>${p.day}</strong></p>

<h3>WHAT I SAW</h3>
<p>${p.whatISaw}</p>

<h3>KEY LESSON</h3>
<p>${p.whatILearned}</p>

<h3>FUTURE PRACTICE</h3>
<p>${p.futurePractice}</p>

`;

map.flyTo({
center:[p.lon,p.lat],
zoom:10,
speed:.8
});
}

el.addEventListener(
'click',
showStory
);

button.addEventListener(
'click',
showStory
);

});

map.on('load',()=>{

map.addSource('journey',{
type:'geojson',
data:{
type:'Feature',
geometry:{
type:'LineString',
coordinates:coordinates
}
}
});

map.addLayer({
id:'journey-glow',
type:'line',
source:'journey',
layout:{
'line-cap':'round',
'line-join':'round'
},
paint:{
'line-color':'rgba(255,255,255,.12)',
'line-width':8,
'line-blur':8
}
});

map.addLayer({
id:'journey',
type:'line',
source:'journey',
layout:{
'line-cap':'round',
'line-join':'round'
},
paint:{
'line-color':'rgba(255,255,255,.55)',
'line-width':2
}
});

document
.querySelector('.timeline-item')
?.click();

});

});
