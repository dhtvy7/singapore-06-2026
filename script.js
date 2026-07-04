const map = new maplibregl.Map({
container:'map',

style:
'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',

center:[103.8,1.35],
zoom:4
});

fetch('data.json')
.then(response=>response.json())
.then(data=>{

const coordinates=[];

data.forEach(p=>{

coordinates.push([p.lon,p.lat]);

const el=document.createElement('div');
el.className='marker';

new maplibregl.Marker(el)
.setLngLat([p.lon,p.lat])
.addTo(map);

el.addEventListener('click',()=>{

document.getElementById('content').innerHTML=`

<h2>${p.title}</h2>

<p><b>${p.day}</b></p>

<img src="${p.image}">

<h3>👀 What I Saw</h3>
<p>${p.whatISaw}</p>

<h3>💡 What I Learned</h3>
<p>${p.whatILearned}</p>

<h3>🚀 Future Practice</h3>
<p>${p.futurePractice}</p>

`;

map.flyTo({
center:[p.lon,p.lat],
zoom:12
});

});

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
id:'journey',
type:'line',
source:'journey',
paint:{
'line-color':'#f7c948',
'line-width':4
}
});

});

});
