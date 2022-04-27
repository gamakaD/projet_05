document.addEventListener('DOMContentLoaded', () => {

    function createNode(element) {
        return document.createElement(element);
    }

    const url = 'http://127.0.0.1:3000/api/products';

    // Recuparation des elements du localStorage
    let userCartItems = []
    for (let i = 0; i < localStorage.length; i++) {
        userCartItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }

    // Connection a l'API
    function fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(data => renderCart(data))
            .catch((error) => {
                console.log(error);
            })
    }

    // Rendu et modification du panier
    function renderCart(data) {

        const sectionCartItems = document.getElementById('cart__items')

        userCartItems.forEach(element => {
            data.forEach(item => {
                if (element[0] === item._id) {

                    // Creation des elements
                    let article = createNode('article')
                    let divImg = createNode('div')
                    let img = createNode('img')
                    let divContent = createNode('div')
                    let divDescription = createNode('div')
                    let itemTitle = createNode('h2')
                    let itemColor = createNode('p')
                    let itemPrice = createNode('p')
                    let divSettings = createNode('div')
                    let divSettingsQuantity = createNode('div')
                    let pQuantity = createNode('p')
                    let itemQuantity = createNode('input')
                    let divSettingsDelete = createNode('div')
                    let pDelete = createNode('p')

                    // Ajout des class et autres attributs
                    article.className = 'cart__item'
                    divImg.className = 'cart__item__img'
                    divContent.className = 'cart__item__content'
                    divSettings.className = 'cart__item__content__settings'
                    divSettingsQuantity.className = 'cart__item__content__settings__quantity'
                    divDescription.className = 'cart__item__content__description'
                    itemPrice.className = 'item__price'
                    itemQuantity.className = 'itemQuantity'
                    pQuantity.className = 'text__quantity'
                    divSettingsDelete.className = 'cart__item__content__settings__delete'
                    pDelete.className = 'deleteItem'

                    itemQuantity.type = 'number'
                    itemQuantity.name = 'itemQuantity'
                    itemQuantity.min = '1'
                    itemQuantity.max = '100'
                    itemQuantity.value = element[2]

                    article.setAttribute('data-id', element[0])
                    article.setAttribute('data-color', element[1])

                    img.src = item.imageUrl
                    img.alt = item.altTxt

                    // Ajout du texte
                    itemTitle.textContent = item.name
                    itemColor.textContent = element[1]
                    itemPrice.textContent = item.price + ' €'
                    pQuantity.textContent = 'Qté ' + ': ' + element[2]
                    pDelete.textContent = 'Supprimer'

                    // Injection des elements dans le DOM
                    sectionCartItems.append(article)
                    article.append(divImg, divContent)
                    divImg.append(img)
                    divContent.append(divDescription, divSettings)
                    divDescription.append(itemTitle, itemColor, itemPrice)
                    divSettings.append(divSettingsQuantity, divSettingsDelete)
                    divSettingsQuantity.append(pQuantity, itemQuantity)
                    divSettingsDelete.append(pDelete)

                }
            })
        })

        // Ajout de l'ecoute pour les changement de quantités
        const itemQuantity = document.getElementsByClassName('itemQuantity')
        for (let i = 0; i < itemQuantity.length; i++) {
            itemQuantity[i].addEventListener('change', quantityChanged)
        }

        // Ajout de l'ecoute pour la suppression d'articles
        const itemDelete = document.getElementsByClassName('deleteItem')
        for (let i = 0; i < itemDelete.length; i++) {
            itemDelete[i].addEventListener('click', itemRemoved)
        }

        // Recuperation de ligne de l'item et creation de la clé localStorage associée
        function getParentAndKey(child) {
            let parent = child.closest('article')
            let key = parent.dataset.id + '_' + parent.dataset.color
            return [parent, key]
        }

        // Modification quantité d'un article
        function quantityChanged(event) {
            let input = event.target
            let textQuantity = input.parentElement.getElementsByClassName('text__quantity')[0]
            let userStorageData = JSON.parse(localStorage.getItem(getParentAndKey(input)[1]))
            if (isNaN(input.value) || input.value <= 0 || input.value > 100) {
                input.value = 1
            }
            textQuantity.textContent = 'Qté ' + ': ' + input.value
            userStorageData.splice(2, 1, +input.value)
            localStorage.setItem(getParentAndKey(input)[1], JSON.stringify(userStorageData))
            updateCart()
            console.log(localStorage)
        }

        // Suppression d'un article
        function itemRemoved(event) {
            let input = event.target
            getParentAndKey(input)[0].remove()
            updateCart()
            localStorage.removeItem(getParentAndKey(input)[1])
        }

        // Affichage et mis à jour du panier
        function updateCart() {
            const cartRows = document.getElementsByClassName('cart__item')
            let total = 0
            let quantity = 0
            for (let i = 0; i < cartRows.length; i++) {
                let cartRow = cartRows[i]
                let itemPrice = cartRow.getElementsByClassName('item__price')[0]
                let quantityItem = +cartRow.getElementsByClassName('itemQuantity')[0].value
                let price = +itemPrice.innerText.replace('€', '')
                total = total + (price * quantityItem)
                quantity = quantity + quantityItem
            }
            totalPrice.textContent = total
            totalQuantity.textContent = quantity
        }
        updateCart()
    }
    fetchData()

})


