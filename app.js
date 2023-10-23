if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready() {
    let removeCartItemsBtns = document.getElementsByClassName('btn-danger')
    for(let i = 0; i < removeCartItemsBtns.length; i++){
        const item = removeCartItemsBtns[i]
        item.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++){
        const input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addCartButtons = document.getElementsByClassName('shop-item-button')
    for(let i = 0; i < addCartButtons.length; i++){
        const button = addCartButtons[i]
        button.addEventListener('click', addCartCkicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event){
    const clickedBtn = event.target
    clickedBtn.parentElement.parentElement.remove()
    updateCartToTal()
}

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartToTal()
}

function purchaseClicked(){
    alert('thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartToTal()
}

function addCartCkicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
    addItemToCart(title, price, imageSrc)
    updateCartToTal()
}


function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('this item is already added to the cart')
            return
        }
    }


    let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartToTal(){
    const cartItemContainer = document.getElementsByClassName('cart-items')[0]
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0

    for(let i = 0; i < cartRows.length; i++){
        const cartRow = cartRows[i]        
        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value

        total = total + (price * quantity)
    }        

    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = `$` + total
}

