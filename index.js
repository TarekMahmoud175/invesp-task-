
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

document.addEventListener("mouseover",function(event){
	let product_link = event?.target?.href
	let product_card_classes = [...event.target.classList]


	if(product_card_classes.includes('link-wrapper')){
		
		let element = document.querySelectorAll(`.link-wrapper[href ="${product_link}"]`)[0]
		
		let btn = document.createElement("button")
		btn.classList.add("quickView")
		btn.innerText = "Quick View"
		element.appendChild(btn); 
		animateBtn()

		element.addEventListener("mouseleave",function(event){
		let addedBtn = document.querySelector(".quickView")
		if(addedBtn) element.removeChild(addedBtn)
		})
	}
})