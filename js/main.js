var LS = typeof Storage !== "undefined" ? true : false ;
var mn = ["Jan","Feb","Mar","Apr", "May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
	google = null,
	id = 0,
	lat = 52.75,
	lng = 5.96,
	plc = 'The Netherlands',
	t = new Date(),
	data = null,
	cityinput = document.getElementById("city"),
	cityval = document.getElementById("city").value;


if ( navigator && navigator.geolocation ) {
	navigator.geolocation.getCurrentPosition(showPosition,showError);
}else{
	loadResults();
}
function weather(callback){
	getJSONP('https://api.darksky.net/forecast/9435460ac274999f8dcd0ba124acb7dc/'+lat+','+lng+'?exclude=currently,minutely,hourly,flags,alerts&units=ca&lang=en&callback='+callback);
}

function showPosition(p) {
	lat = p.coords.latitude;
	lng = p.coords.longitude;
	plc = 'Your location';
	loadResults();
}
function showError(error) {
	if( LS ){
		var old_lat = localStorage.getItem('lat');
		if( old_lat && old_lat != null ){
			lat = old_lat;
		}		
		var old_lng = localStorage.getItem('lng');
		if( old_lng && old_lng != null ){
			lng = old_lng;
		}
		var old_cty = localStorage.getItem('cty');
		if( old_cty && old_cty != null ){
			plc = old_cty;
			document.getElementById("city").value = plc;
		}
	}
	loadResults();
}
function loadResults(data){
	var localkey = t.getMonth() +'-'+ t.getDate() +'-'+ lat +'-'+ lng;
	if( LS ) var localFile = localStorage.getItem(localkey);
	if( LS && localFile != null ){
		setData( JSON.parse(localFile) );
	}else if( data != null ){
		setData(data);
	}else{
		weather('setData');
	}
}
function setData( data ){
	id = 0;
	var localkey = t.getMonth() +'-'+ t.getDate() +'-'+ lat +'-'+ lng;
	if( LS ){
		localStorage.setItem(localkey, JSON.stringify(data) );
		localStorage.setItem('lat', lat);
		localStorage.setItem('lng', lng);
		localStorage.setItem('cty', plc);
	}
	var sl 	= '';
	for (var key in data.daily.data ) {
		date = new Date( data.daily.data[key].time * 1000 );
		sl+= '<div class="day"><div class="'+ data.daily.data[key].icon +' slide"><h3 class="temp"><small>'+mn[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()+'</small>'+ data.daily.data[key].temperatureMax.toFixed(1) +'&deg;</h3><br><span id="location">'+plc+'</span><br>'+data.daily.data[key].summary+'<ul><li><span>Wind</span>'+ data.daily.data[key].windSpeed . toFixed(1)+' km/h</li><li><span>Rain</span>'+data.daily.data[key].precipProbability.toFixed(2)+'%</li></ul></div></div>'; 
		document.getElementById("result").innerHTML = sl;	
	}
	SD();
	var nl = document.getElementById('navleft');
	nl.removeEventListener("click", navigateLeft);
	nl.addEventListener("click", navigateLeft);
	nl.style.display = "block";
	var nr = document.getElementById("navright");
	nr.removeEventListener("click", navigateRight);
	nr.addEventListener("click", navigateRight);
	nr.style.display = "block";
}
function navigateLeft(){
	id--; SD();
}
function navigateRight(){
	id++; SD();
}
function SD() {
	var i,sld = document.getElementsByClassName("day"),nsl = sld.length;			
	if( id >= nsl ) id = 0;
	if( id < 0 ) id = (nsl-1);
	for (i = 0; i < nsl; i++) sld[i].className = "day";
	sld[id].className += " active";
}

cityinput.addEventListener("focus", onCityFocus, true);
function onCityFocus(){
	if( google == null ) getJSONP('https://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyCsTkbAiMEEHoHYlac6Gr5sOIS0-QVzQic&callback=googleSuggest');
	cityval = cityinput.value;
	cityinput.value = ""; 
}

cityinput.addEventListener("blur", onCityBlur, true);
function onCityBlur(){
	if( cityinput.value == '' && cityval != '' ) cityinput.value = cityval;
}

function googleSuggest(){
	var input = document.getElementById('city');
	var autocomplete = new google.maps.places.Autocomplete((input),{types: ['(cities)'],});
	google.maps.event.addListener(autocomplete, 'place_changed', function() {	
		var place = autocomplete.getPlace();
		if ( !place.geometry ) return;
		lat = place.geometry.location.lat();
		lng = place.geometry.location.lng();
		plc = place.formatted_address;	
		cityinput.value = plc;	
		if( LS ) {
			localStorage.setItem('cty',plc);
			localStorage.setItem('lat',lat);
			localStorage.setItem('lng',lng);
		}
		weather('loadResults');
	});
}
function getJSONP( url ){
	var script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script);
}