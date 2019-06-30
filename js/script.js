
/*   **** menu vista mobile ****  */
const menuNav=document.getElementById('nav');
const arrow=document.getElementById('imgArrow');

function showMenu(){
	if(menuNav.dataset.state=='hidden'){
		menuNav.dataset.state='show';
		menuNav.style.display = 'flex';
		arrow.src=menuNav.dataset.ruteImg+'/arrowUp.png';
	}else{
		menuNav.dataset.state='hidden';
		menuNav.style.display = 'none';
		arrow.src=menuNav.dataset.ruteImg+'arrowDown.png';
	}
}

/* ****** obtener json ******/
var ARRAY_SONG=[]

function getAudios(){
	fetch(RUTA_JSON)
	.then(res=>res.json())
	.then(data=>{
		ARRAY_SONG=data;
		createSong(ARRAY_SONG[0]);
	})
}

/******  carga de pagina ******/
const LIST=document.getElementById('list')
const LOADER=document.getElementById('loader')
const PROGRESS=document.getElementById('progress')
var x=0;

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
	  <a href="${obj.link}" target="_blank" class="download"></a>
	</div>`
	LIST.append(div)
	PROGRESS.innerHTML=`${parseFloat(x*100/ARRAY_SONG.length).toFixed(2)}%`
	x++;
	createSong(ARRAY_SONG[x]);
  }else{
  	LOADER.style.display='none';
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
