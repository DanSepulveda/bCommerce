const cartSection = document.getElementById('cartSection')
const productList = document.getElementById('productList')
const cartQty = document.getElementById('cartQty')

const getProductsFromLS = () => {
    productList.innerHTML = ''
    const productsId = Object.keys(localStorage)
    cartQty.innerText = productsId.length
    productsId.forEach(productId => {
        let product = JSON.parse(localStorage.getItem(productId))
        productList.innerHTML += `
            <div class="singleProduct d-flex align-items-center">
                <div class="cartImage" style="background-image: url(${product.image})"></div>
                <div class="info">
                    <p>${product.name}</p>
                    <p class="text-end">${product.price}</p>
                </div>
            </div>
        `
    })
}

getProductsFromLS()



document.getElementById('cart').addEventListener('click', function (e) {
    cartSection.classList.remove('hide')
})

document.getElementById('close').addEventListener('click', function (e) {
    cartSection.classList.add('hide')
})

let buttons = Array.from(document.getElementsByClassName('buyButton'))
buttons.forEach(button => button.addEventListener('click', function (e) {
    const { id, name, image, price } = e.target.dataset
    let product = { name, image, price }
    localStorage.setItem(id, JSON.stringify(product))
    getProductsFromLS()
}))

// CLEAR PRODUCTS FROM LS AND CART
document.getElementById('clearButton').addEventListener('click', function (e) {
    localStorage.clear()
    productList.innerHTML = ''
    cartQty.innerText = 0
})