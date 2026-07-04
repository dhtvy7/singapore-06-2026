const map = new maplibregl.Map({
  container: 'map',
  style:
    'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [103.8, 1.35],
  zoom: 4
});

fetch('data.json')
  .then(response => response.json())
  .then(data => {

    const coordinates = [];

    const timeline =
      document.getElementById('timeline');

    data.forEach(p => {

      coordinates.push([p.lon, p.lat]);

      timeline.innerHTML += `
        <div class="stop" onclick="goToStop(${p.id})">
          <h3>${p.day}</h3>
          <p>${p.title}</p>
        </div>
      `;

      const el =
        document.createElement('div');

      el.className = 'marker';

      el.addEventListener('click', () => {
        showContent(p);
      });

      new maplibregl.Marker({
        element: el
      })
        .setLngLat([p.lon, p.lat])
        .addTo(map);

    });

    window.goToStop = function(id) {

      const p =
        data.find(d => d.id === id);

      showContent(p);

    }

    function showContent(p){

      document.getElementById('content').innerHTML = `
        <img src="${p.image}">
        <h2>${p.title}</h2>

        <p><strong>${p.day}</strong></p>

        <h3>What I Saw</h3>
        <p>${p.description}</p>

        <h3>Key Lesson</h3>
        <p>${p.lesson}</p>
      `;

      map.flyTo({
        center:[p.lon,p.lat],
        zoom:12,
        speed:0.8
      });

    }

    map.on('load', () => {

      map.addSource('journey', {
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
