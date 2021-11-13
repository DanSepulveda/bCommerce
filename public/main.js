const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

const cartSection = document.getElementById('cartSection')
const productList = document.getElementById('productList')
const cartQty = document.getElementById('cartQty')

// FORMAT FOR PRODUCT PRICES
const formatPrices = (className) => {
    let prices = Array.from(document.getElementsByClassName(className))
    prices.forEach(price => {
        price.innerText = formatter.format(price.innerText)
    })
}

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
                    <p class="text-end cartPrice">${product.price}</p>
                </div>
            </div>
        `
    })
    formatPrices('cartPrice')
}

getProductsFromLS()
formatPrices('price')

// LISTENERS FOR OPEN AND CLOSE CART
document.getElementById('cart').addEventListener('click', function (e) {
    cartSection.classList.remove('hide')
})

document.getElementById('close').addEventListener('click', function (e) {
    cartSection.classList.add('hide')
})

// LISTENER FOR BUTTONS TO ADD PRODUCTS TO CART ANS SET THEM ON LS
let buttons = Array.from(document.getElementsByClassName('buyButton'))
buttons.forEach(button => button.addEventListener('click', function (e) {
    const { id, name, image, price } = e.target.dataset
    let product = { name, image, price }
    localStorage.setItem(id, JSON.stringify(product))
    getProductsFromLS()
    formatPrices()
}))

// CLEAR PRODUCTS FROM LS AND CART
document.getElementById('clearButton').addEventListener('click', function (e) {
    localStorage.clear()
    productList.innerHTML = ''
    cartQty.innerText = 0
})


