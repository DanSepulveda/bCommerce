const cartSection = document.getElementById('cartSection')
const productList = document.getElementById('productList')

document.getElementById('cart').addEventListener('click', function (e) {
    cartSection.classList.remove('hide')
    productList.innerHTML = ''
    const productsId = Object.keys(localStorage)
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
})

document.getElementById('close').addEventListener('click', function (e) {
    cartSection.classList.add('hide')
})







let buttons = Array.from(document.getElementsByClassName('buyButton'))
buttons.forEach(button => button.addEventListener('click', function (e) {
    const { id, name, image, price } = e.target.dataset
    let product = { name, image, price }
    localStorage.setItem(id, JSON.stringify(product))
}))