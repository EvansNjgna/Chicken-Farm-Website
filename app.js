document.addEventListener('DOMContentLoaded', function () {
    // Fetch the initial data
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalChickens').innerText = data.totalChickens;
            document.getElementById('soldChickens').innerText = data.soldChickens;
            document.getElementById('stockChickens').innerText = data.stockChickens;
        });

    // Sell chickens
    window.sellChickens = function () {
        const sellCount = parseInt(document.getElementById('sellInput').value);

        fetch('/api/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sellCount: sellCount }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('soldChickens').innerText = data.soldChickens;
                document.getElementById('stockChickens').innerText = data.stockChickens;

                if (data.stockChickens <= 0) {
                    document.getElementById('sellButton').disabled = true;
                }
            } else {
                alert('Not enough chickens in stock!');
            }
        });
    };

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Scroll-to-Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Order Form Submission
    document.getElementById('orderForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const name = this[0].value;
        const phone = this[1].value;
        const quantity = this[2].value;
        const notes = this[3].value;

        // Send order request (replace with your endpoint)
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, quantity, notes }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Order placed successfully!');
                this.reset(); // Reset form
            } else {
                alert('Error placing order. Please try again.');
            }
        });
    });
});
