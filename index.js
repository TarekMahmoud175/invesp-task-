
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

function addModalElement(){
	let body = document.querySelectorAll("body")[0]
	let modal = document.createElement("div")
	modal.classList.add("modal")
	modal.innerHTML="<h1>hiii this is test</h1>"
	body.appendChild(modal)
}

function RemoveModalElement(){
	let body = document.querySelectorAll("body")[0]
	let modal = document.querySelectorAll(".modal")[0]
	if(modal) body.removeChild(modal);
}



document.addEventListener("mouseover",function(event){
	let product_link = event?.target?.href
	let product_card_classes = [...event.target.classList]


	if(product_card_classes.includes('link-wrapper')){
		let element = document.querySelectorAll(`.link-wrapper[href ="${product_link}"]`)[0]
		
		addBtn(element)
		animateBtn()
		addModalElement()
		
		element.addEventListener("mouseleave",()=>{
			removeBtn(element)
			RemoveModalElement()
		})
	}
})

