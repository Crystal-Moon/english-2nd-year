
/*   **** menu vista mobile ****  */
const menuNav=document.getElementById('nav');
const arrow=document.getElementById('imgArrow');
function showMenu(){

	if(menuNav.dataset.state=='hidden'){
		menuNav.dataset.state='show';
		menuNav.style.display = 'flex';
		arrow.src='imgs/arrowUp.png';
		console.log('mostrando...')
	}else{
		menuNav.dataset.state='hidden';
		menuNav.style.display = 'none';
		arrow.src='imgs/arrowDown.png';
		console.log('ocultando...')
	}
}

let prueba={
	seccion:"1A",
	page:"4",
	point:"1a",
	link:"https://www.dropbox.com/s/g8nwp5xsyotlgl3/Track%2015.mp3?dl=1",
	downloadLink: "https://www.dropbox.com/home/audio_english?preview=Track+15.mp3"
}

/* ****** obtener json ******/
const ARRAY_SONG=[]
function getAudios(){
	fetch(RUTA_JSON)
	.then(res=>res.json())
	.then(data=>{ 
		ARRAY_SONG=data 
		createSong(ARRAY_SONG[0])
	})
}

/******  carga de pagina ******/
const LIST=document.getElementById('list')
let x=0;

function createSong(obj){
  if(x<ARRAY_SONG.length){
	let name=' '+obj.seccion+'_'+obj.point
	let div=document.createElement('div');
	div.className='song';
	div.dataset.link=obj.link;
	div.innerHTML=`
	<div class="page">${obj.page}</div>
	<div class="songName">${name}</div>
	<div class="btns">
	  <div class="play" onclick="playAudio(this,'${name}')" data-state="pause"></div>
	  <a href="${obj.downloadLink}" target="_blank" class="download"></a>
	</div>`
	LIST.append(div)
	x++;
	createSong(ARRAY_SONG[x]);
  }
}

/* ****** PLAY AUDIO ****** */

const audio=document.getElementById('audio');
const nameSong=document.getElementById('playName')

function playAudio(btnPlay,name){
	let divSong=btnPlay.parentNode.parentNode;
	let linkSong=divSong.dataset.link;
	audio.src=linkSong
	nameSong.innerHTML=name;

	if(btnPlay.dataset.state=='pause'){
		btnPlay.classList.remove('play')
		btnPlay.classList.add('pause')
		btnPlay.dataset.state='play';
		audio.play();
	}else{
		btnPlay.classList.add('play')
		btnPlay.classList.remove('pause')
		btnPlay.dataset.state='pause';
		audio.pause();
	}
}
