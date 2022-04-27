document.addEventListener('DOMContentLoaded', () => {

    function createNode(element) {
        return document.createElement(element);
    }

    const items = document.getElementById('items');
    const url = 'http://127.0.0.1:3000/api/products';

    function fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(data => renderItems(data))
            .catch((error) => {
                console.log(error);
            })
    }

    function renderItems(data) {
        data.forEach((item) => {
            // creation des elements
            let itemLink = createNode('a');
            let article = createNode('article');
            let img = createNode('img');
            let itemTitle = createNode('h3');
            let itemDescription = createNode('p');

            // Ajout des class et autres attributs
            itemTitle.className = 'productName'
            itemDescription.className = 'productDescription'
            itemLink.href = "./product.html?id=" + item._id
            img.src = item.imageUrl;

            // Ajout du texte
            itemTitle.textContent = item.name;
            itemDescription.textContent = item.description;

            // Injection des elements dans le DOM
            itemLink.append(article)
            article.append(img, itemTitle, itemDescription)
            items.append(itemLink)
        })
    }

    fetchData()

})




