document.addEventListener('DOMContentLoaded', () => {

    function createNode(element) {
        return document.createElement(element);
    }

    const itemImg = document.getElementsByClassName('item__img')
    const itemTitle = document.getElementById('title')
    const itemPrice = document.getElementById('price')
    const itemDescription = document.getElementById('description')
    const itemColorSelection = document.getElementById('colors')

    const urlId = new URLSearchParams(window.location.search).get('id');
    const url = 'http://127.0.0.1:3000/api/products' + '/' + urlId;

    // Connection à l'API
    function fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(data => renderItem(data))
            .catch((error) => {
                console.log(error);
            })
    }

    // Rendu visuel des produits 
    function renderItem(data) {

        // Creation des elements
        let img = createNode('img')
        img.src = data.imageUrl
        itemImg[0].append(img)

        // Ajout du texte 
        itemTitle.textContent = data.name
        itemPrice.textContent = data.price
        itemDescription.textContent = data.description

        // Creation et ajout des options couleur
        data.colors.forEach((color) => {
            let option = createNode('option')
            option.value = color
            option.textContent = color
            itemColorSelection.append(option)

        })

    }
    fetchData()

    // ******************************************
    // Recuperer les articles et les placer dans localStorage

    const itemQuantity = document.getElementById('quantity')
    const addToCartBtn = document.getElementById('addToCart')

    itemQuantity.value = 1

    let userColor = ""
    let userQuantity = 1

    // Ajout des ecoutes sur les elements
    itemColorSelection.addEventListener('change', colorChoice)
    itemQuantity.addEventListener('change', quantityChoice)
    addToCartBtn.addEventListener('click', addUserDataToLocalStorage)

    function colorChoice() {
        userColor = itemColorSelection.value
    }

    function quantityChoice() {
        userQuantity = Number(itemQuantity.value)
    }
    
    function addUserDataToLocalStorage() {
        let userItemKey

        if (userColor === "") {
            alert('Vous devez selectionner une couleur')
        } else if (userQuantity <= 0 || userQuantity > 100 || isNaN(userQuantity)) {
            alert('Vous devez choisir une quantité comprise entre 1 et 100')
        } else {
            userItemKey = urlId + "_" + userColor

            if (localStorage.getItem(userItemKey) === null) {

                localStorage.setItem(userItemKey, '[]')
                let userStorageData = JSON.parse(localStorage.getItem(userItemKey))
                userStorageData.push(urlId, userColor, userQuantity)
                localStorage.setItem(userItemKey, JSON.stringify(userStorageData))

            } else if (localStorage.getItem(userItemKey)) {
                let userStorageData = JSON.parse(localStorage.getItem(userItemKey))
                let oldUserQuantity = userStorageData[2]
                let newUserQuantity = oldUserQuantity + userQuantity
                userStorageData.splice(2, 1, newUserQuantity)
                localStorage.setItem(userItemKey, JSON.stringify(userStorageData))
            }
        }
    }
})




