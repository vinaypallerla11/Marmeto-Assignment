const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

async function fetchData() {
    try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        const data = await response.json();
        console.log(data); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderProducts(response) {
    const products = response.data;

    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-info">
                <img src="${product.product_image}" alt="${product.product_title}"> <br/>
                <p class="badge">${product.product_badge}</p>
            </div>
            <div class="product-details">
                <h3>${product.product_title}</h3>
                <ul>
                    ${product.product_variants.map(variant => `<li>${Object.values(variant)}</li>`).join('')}
                </ul>
            </div>
        `;
        productList.appendChild(productCard);
    });
}


function switchLayout(layout) {
    productList.classList.remove('grid-layout', 'list-layout');
    productList.classList.add(layout + '-layout');
}
function switchLayout(layout) {
    productList.className = 'product-list'; // Reset the class to 'product-list'
    productList.classList.add(`${layout}-layout`);
}

// Function to highlight search results
function highlightSearch() {
    const searchKey = searchInput.value.trim().toLowerCase(); 
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('h3');
        const titleText = title.textContent.trim().toLowerCase();

        const variants = product.querySelectorAll('li');

        const isTitleMatch = titleText.includes(searchKey);

        title.classList.toggle('highlight', searchKey && isTitleMatch);

        variants.forEach(variant => {
            const variantText = variant.textContent.trim().toLowerCase();
            const isVariantMatch = variantText.includes(searchKey);

            variant.classList.toggle('highlight', searchKey && isVariantMatch);
        });
    });
}


searchInput.addEventListener('input', highlightSearch);

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchData();
    renderProducts(products);
});
