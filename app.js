const humberger = document.querySelector(".menu-humberger");
humberger.addEventListener("click", () => {
    if(humberger.classList.contains("active")){
        gsap.to(".navbar-links ul", {x:"-100%"});
        // gsap.set("body", {overflow: auto});
        gsap.set("body", {overflow: "hidden"});
    }else {

        gsap.to(".navbar-links ul", { x: "0%" });
        gsap.fromTo(
          ".navbar-links ul li",
          { opacity: 0, y: 0 },
          { opacity: 1, y: 20, delay: 0.5, stagger: 0.25 }
        );
        gsap.set("body", { overflow: "hidden" });
      }
      humberger.classList.toggle("active");
})

// Add to cart code...
const productEl = document.querySelector(".section-description")
const cartItemsEl = document.querySelector(".cart-items")
const purchaseEl = document.querySelector(".section-purchase")

let cart = []
let basket = []

const renderCartItems = () => {
  let totalPrice = 0, totalItems = 0;
  cart.forEach((item) => {
      totalPrice+= item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
      cartItemsEl.innerHTML += `
      <div class="item">
                <div class="item-container">
                  <img src=${item.imgsrc} alt="product 1" srcset="">
                  <div class="item-desc">
                    <p>${item.name}</p>
                    <h4>${totalPrice.toFixed(2)}</h4>
                  </div>
                  <img class="delete" onClick="removeItemFromCart(${item.id})" src="./images/icon-delete.svg" alt="delete" srcset="">
                </div>
              </div>
              <button type="button">Checkout</button>
      `
      
  })
} 

const updateCart = () => {
  renderCartItems()
}

const renderDetails = () => {
  
    products.forEach((product)=>{
      let {company,name,description,price,prevPrice,id} = product;
        productEl.innerHTML += `
        <h3>${company}</h3>
          <h1>${name}</h1>
          <p>
            ${description}
          </p>
            <div class="section-price">
              <h1> ${price}</h1>
              <span>50%</span>
            </div>
          <h2>${prevPrice}</h2>
          <div class="section-purchase">
            <div class="add-subtract">
              <img onClick="changeNumberOfUnits("minus",${id})" src="./images/icon-minus.svg" alt="minus" srcset="" />
              <h4 id=${id}>0</h4>
              <img onClick="increment(${id})" src="./images/icon-plus.svg" alt="plus" srcset="" />
            </div>
            <button onClick="addToCart(${id})" class="btn"><img src="./images/icon-cart.svg" alt="" srcset="">Add to cart</button>
          </div>
        `
    })
    
}
renderDetails()

// Change number fo units
// const changeNumberOfUnits = (action, id) => {
//     cart = cart.map((item) => {
//         let numberOfUnits = item.numberOfUnits;
//         if(item.id === id){
//             if(action === "minus"){
//                 numberOfUnits--
//             }
//             else if(action === "plus"){
//                 numberOfUnits++
//             }
//         }
//         return {
//             ...item,
//             numberOfUnits,
//         }
//     })
//     updateCart()
// }






updateCart()

const addToCart = (id) => {
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus",id)
    }
    else{
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1,
        })
    }
    updateCart()
}





// Change number fo units
const changeNumberOfUnits = (action, id) => {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === "minus"){
                numberOfUnits--
            }
            else if(action === "plus"){
                numberOfUnits++
            }
        }
        return {
            ...item,
            numberOfUnits,
        }
    })
    updateCart()
}

console.log(cart)







//Remove item from cart
const removeItemFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    updateCart()
}

// https://drive.google.com/drive/folders/1zwY8pGbTRYJYBu2MPxR9VyAsE-RzQTMt?usp=share_link 


// Plan B
const increment = (id) => {
  const item = products.find((product)=> product.id ===id);
  const basketProduct = basket.some((item) => item.id === id);
  if(item){
    basket.push({
      ...item,
      numberOfProduct: 1,
    })
  }else if(basketProduct){
    item.numberOfProduct++
  }
  
  console.log(basket)
}