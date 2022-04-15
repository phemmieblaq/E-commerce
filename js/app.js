const menu=document.querySelector(".menu");
const btnHamburger= document.querySelector(".hamburger");
const btnMenuClose= document.querySelector("#btnMenuClose");

const cart=document.querySelector(".cart");
const btnCart=document.querySelector(".btnCart");

const btnPlus=document.querySelector("#btnPlus");
const btnMinus=document.querySelector("#btnMinus");
const productCounter=document.querySelector(".counter");

const gallery = document.querySelectorAll(".pic");
const heroImage=document.querySelector(".product-hero");
//mobile updating of hero image
const btnNext = document.querySelector(".next");
const btnPrevious = document.querySelector(".previous");

const btnAddToCart=document.querySelector(".btnWrapper");
const cartCount = document.querySelector(".cart-count");
const productInShoppingCart = document.querySelector(".products-in-cart");
const msgEmpty = document.querySelector(".msg-empty");
const checkout = document.querySelector(".checkout");


const overlay = document.querySelector(".overlay");
const lightBox= document.querySelector(".lightbox");


btnHamburger.addEventListener("click",onHamburgerClick);
btnMenuClose.addEventListener("click",onBtnMenuCloseClick);

btnCart.addEventListener("click",openCart);

btnPlus.addEventListener("click",productCounterPlus);
btnMinus.addEventListener("click",productCounterMinus);

gallery.forEach(img => {
    img.addEventListener("click",onThumbClick)
});
btnNext.addEventListener("click",handleBtnClickNext);
btnPrevious.addEventListener("click",handleBtnClickPrevious);

btnAddToCart.addEventListener("click",addToCart);





// declaring  variables
let productCounterValue=1; // initializing the counter  value to 1 and gets updated later
let productsInCart=0;
let price =250.0;
let discount=0.5;


function onHamburgerClick() {
    menu.classList.remove('hidden'); //remove  slide menu when hamburger is being clicked 
    }

function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
}

function openCart(){
    cart.classList.toggle('hidden');
}

function productCounterPlus (){
    setProductCounter(1)
    // console.log(productCounterValue)

}

function productCounterMinus (){
    setProductCounter(-1)
}

function setProductCounter(value) {
    if ((productCounterValue +value ) > 0){
        productCounterValue+=value;
        productCounter.innerHTML=productCounterValue; // update the value of the counter int the html
          }
}

function onThumbClick(event){
    // clear  active states  for all the thumbnails
    gallery.forEach(img => {
        img.classList.remove("active")
    });

    // set active thumbnail
    event.target.parentElement.classList.add("active");

    // update heroImage
    heroImage.src=event.target.src. replace("-thumbnail", "");

}
function handleBtnClickNext(){
    let imageIndex=getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4){
        imageIndex = 1;
    }
    setHeroImage(imageIndex);

}
function handleBtnClickPrevious(){
    let imageIndex=getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1){
        imageIndex = 4;
    }
    setHeroImage(imageIndex);


}
function getCurrentImageIndex(){
    const imageIndex=parseInt(heroImage.src.split('\\').pop().split('/').pop().replace('.jpg', ''). replace('image-product-', ''));
    //console.log(imageIndex);
    return imageIndex;
}
function setHeroImage(imageIndex){
    heroImage.src= `./images/image-product-${imageIndex}.jpg`;
    // hero image changing but not sync
    gallery.forEach(img => {
        img.classList.remove("active")   // clear active state
    });
    // set active thumbnails
    gallery[imageIndex-1].classList.add("active");

}

function addToCart(){
    productsInCart+=productCounterValue;
    console.log( productsInCart);
    const productHTMLElement =`
    <div class="items">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
        <div class="details">
        <div class="product-name">Autumn Limited Edition...</div>
        <div class="price-group">
            <div class="price">${(price*discount).toFixed(2)}</div> x
            <div class="count">${productsInCart}</div>
            <div class="total-amount">${(price*discount*productsInCart).toFixed(2)}</div>
        </div>
    </div>
    <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
    </div>

    `;
    productInShoppingCart.innerHTML=productHTMLElement;

    updateCart();
    const btnDelete= document.querySelector("#btnDelete");
    btnDelete.addEventListener("click",onDeleteClick);


}
function updateCart(){

    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}
function updateCartIcon(){
    cartCount.textContent= productsInCart;
    if (productsInCart==0){
        if (!cartCount.classList.contains("hidden")){
            cartCount.classList.add("hidden");
        }
    }else {
        cartCount.classList.remove("hidden");
    }

}
function updateMsgEmpty(){
    if (productsInCart==0){
        if (msgEmpty.classList.contains("hidden")){
            msgEmpty.classList.remove("hidden");
        }
    }else{
        if (!msgEmpty.classList.contains("hidden")){
            msgEmpty.classList.add("hidden");
        }
    }

}
function updateCheckoutButton(){
    if (productsInCart==0){
        if (!checkout.classList.contains("hidden")){
            checkout.classList.add("hidden");
            }
    }

    else{
                checkout.classList.remove("hidden");

        }


}
function onDeleteClick(){  // this button reduce the number of products in cart
    if (productsInCart>0){
    productsInCart--;
    updateCart();

    const del = document.querySelector(".count");
    const totalAmount = document.querySelector(".total-amount");
    del.innerHTML= productsInCart;
    totalAmount.innerHTML=`$${(price*discount*productsInCart).toFixed(2)}`; // fixing to 2.dp
}

}

