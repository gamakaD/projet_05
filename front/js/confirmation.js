document.addEventListener('DOMContentLoaded', () => {

    const urlOrderId = new URLSearchParams(window.location.search).get('orderId');
    const orderId = document.getElementById('orderId')

    orderId.textContent = " " + urlOrderId
    localStorage.clear()

})