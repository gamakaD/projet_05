document.addEventListener('DOMContentLoaded', () => {

    const urlOrderId = new URLSearchParams(window.location.search).get('orderId');

    orderId.textContent = " " + urlOrderId
    localStorage.clear()

})