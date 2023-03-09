
function addBtn(element){
	let btn = document.createElement("button")
	btn.classList.add("quickView")
	btn.innerText = "Quick View"
	element.appendChild(btn); 
}

function animateBtn() {
let btn = document.querySelector(".quickView")
let height = 0
let animationInterval = setInterval(function(){
	if( height < 50 ){
		height += 2.5
		btn.style.height = height + "px"
	}else{
		clearInterval(animationInterval);
	}
}, 10);
}

function removeBtn(element){
let addedBtn = document.querySelector(".quickView")
if(addedBtn) element.removeChild(addedBtn)
}

async function getImages(href=""){
let res = await fetch(href)
let html =  res.text()
return  html
}

let modalHeader = `
<div class="modal-header">
<div class="modal-title w-100"> <h1> Quick View </h1> </div>
<div class="text-end">
<img src="https://t3.ftcdn.net/jpg/03/64/30/82/360_F_364308273_cV9OrZrqUpZ8En9rC8KxBqaxkVg95ZTY.jpg" alt="close-icon" 
	class="close-modal-icon">
</div>	
</div>`


async function makeModalCarousel(link=""){
let carousel = `<div class="slider">`

let targetPagehtml = await getImages(link)	
const parser = new DOMParser();
const doc = parser.parseFromString(targetPagehtml, 'text/html');
let images = [...doc.querySelectorAll(`img.thumb[src*="https://cdn20.pamono.com/p/"]`)]
let arr = [...images];
if(images.length > 5) {
	arr	=	images.slice(0,5)
}

carousel +=`
	<div class="shown-img"> 
		<img src='${images[0].src.replace("/t/","/g/")}' class="product-carousel-image"  />
	</div>`

carousel +=` <div class="dots">`

 for(let i = 0; i< arr.length ; i++){
	carousel +=`
		<div class="dot"> 
			<img src='${arr[i].src.replace("/t/","/g/")}' 
			class="product-carousel-dot ${i==0? "active-dot":""}" 
			onmouseover="dotHovered(this)"
			/>
		</div>`
}

carousel+=`</div> </div>`
return carousel	
}

function dotHovered(element){
let shownImg = document.querySelectorAll(".product-carousel-image")[0]
shownImg.src = element.src
let lastImg = document.querySelectorAll(".product-carousel-dot.active-dot")[0]
lastImg.classList.remove("active-dot")	
element.classList.add("active-dot")
}




async function addModalElement(link=""){
let body = document.querySelectorAll("body")[0]
let modal = document.createElement("div")
modal.classList.add("modal")
let html= modalHeader
let carouselHtml = await makeModalCarousel(link)
modal.innerHTML= html + carouselHtml
modal.style.display="block"
body.appendChild(modal)
// close modal icon listener 
document.querySelectorAll(".close-modal-icon")[0].addEventListener("click",RemoveModalElement)

}

function RemoveModalElement(){
let body = document.querySelectorAll("body")[0]
let modal = document.querySelectorAll(".modal")[0]
if(modal) body.removeChild(modal);
}

function addBtnEvent(link=""){
let btn = document.querySelectorAll(".quickView")[0]
btn.addEventListener("click",function(e){
	 e.stopPropagation();
	 e.preventDefault();
	 addModalElement(link)
})
}


document.addEventListener("mouseover",async function(event){
let product_link = event?.target?.href
let product_card_classes = [...event.target.classList]


if(product_card_classes.includes('link-wrapper')){
	let element = document.querySelectorAll(`.link-wrapper[href ="${product_link}"]`)[0]
	
	addBtn(element)
	animateBtn()
	addBtnEvent(product_link)
	
	element.addEventListener("mouseleave",()=>{
		removeBtn(element)
		let modal = document.querySelectorAll(".modal")[0]
		if(modal && modal.style.display== "none"){
			RemoveModalElement()
		}
	})
}
})


document.addEventListener("click",function (event){
const modal = event.target.closest(".modal");
if(!modal){
	RemoveModalElement()
}
})




