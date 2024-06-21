 document.addEventListener('DOMContentLoaded', () => {
    const addressbtn = document.querySelector('#address-form');
    if (addressbtn) {
        addressbtn.addEventListener("click", function() {
            document.querySelector('.address-form').style.display = "flex";
        });
    }
});

const addressclose = document.querySelector('#address-close');
addressclose.addEventListener("click", function() {
            document.querySelector('.address-form').style.display = "none";
        });
//slide 
// Slide 
let index = 0;
const hinhAnh = document.querySelectorAll('.slide-content-left-top img');
const cacHinhAnhNho = document.querySelectorAll('.slide-content-left-bottom li');

const nutPhai = document.querySelector('.fa-chevron-right');
const nutTrai = document.querySelector('.fa-chevron-left');

function capNhatSlider() {
    document.querySelector(".slide-content-left-top").style.right = index * 100 + "%";
    xoaTrangThaiActive();
    cacHinhAnhNho[index].classList.add("active");
}

nutPhai.addEventListener("click", function () {
    index = index + 1;
    if (index > hinhAnh.length - 1) {
        index = 0;
    }
    capNhatSlider();
});

nutTrai.addEventListener("click", function () {
    index = index - 1;
    if (index < 0) {
        index = hinhAnh.length - 1;
    }
    capNhatSlider();
});

// Tự động chuyển ảnh sau 3 giây
setInterval(function () {
    index = index + 1;
    if (index > hinhAnh.length - 1) {
        index = 0;
    }
    capNhatSlider();
}, 3000);

// Slide tiêu đề chữ dưới
cacHinhAnhNho.forEach(function (hinhAnhNho, viTri) {
    hinhAnhNho.addEventListener("click", function () {
        index = viTri; // Cập nhật chỉ số index khi click
        capNhatSlider();
    });
});

function xoaTrangThaiActive() {
    let hinhAnhDangActive = document.querySelector('.slide-content-left-bottom li.active');
    if (hinhAnhDangActive) {
        hinhAnhDangActive.classList.remove("active");
    }
}

// Đặt trạng thái active ban đầu cho phần tử đầu tiên
cacHinhAnhNho[0].classList.add("active");


//lướt lên
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//-------Giỏ hàng---------
const btn = document.querySelectorAll(".slide-product-one-content-item button");
    let cartItems = [];

    if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
        cartItems.forEach(function(item) {
            addCartItem(item.image, item.name, item.price, item.quantity,item.productID);
        });
        updateTotal();
    }

    btn.forEach(function(button, index) {
        button.addEventListener("click", function(event) {
            const btnItem = event.target;
            const product = btnItem.parentElement;
            const productImg = product.querySelector("img").src;
			const productID = product.querySelector(".slide-product-one-content-item h3").innerText;
			
            const productName = product.querySelector(".slide-product-one-content-item h1").innerText+" Mẫu 1";
            const productPrice = product.querySelector(".slide-product-one-content-item span").innerText;
			

            const existingItemIndex = cartItems.findIndex(function(item) {
                return item.name === productName;
            });

            if (existingItemIndex !== -1) {
                if (confirm("SẢN PHẨM NÀY ĐÃ CÓ TRONG GIỎ HÀNG, BẠN CÓ MUỐN TĂNG SỐ LƯỢNG LÊN 1 ?")) {
                    cartItems[existingItemIndex].quantity += 1;
                    updateCartItem(existingItemIndex);
                }
            } else {
                cartItems.push({
                    image: productImg,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
					productID:productID
                });
                addCartItem(productImg, productName, productPrice, 1,productID);
				alert("Đã thêm vào giỏ hàng");
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotal();
        });
    });

    function addCartItem(productImg, productName, productPrice, quantity,productID) {
        const addTr = document.createElement("tr");
        const trContent = `
            <td style="display: flex; align-items: center">
                 <a href ="indexCTSP.html?id=${productID}"><img style="width: 70px;" src="${productImg}" alt="${productName}" /></a>${productName}			
            </td>
            <td>
                <p><span">${productPrice}</span><sup>đ</sup></p>
            </td>
            <td>
                <input style="width: 40px; outline: none; text-align: center" type="number" value="${quantity}" min="1">
            </td>
            <td style="cursor: pointer; ">&#128465</td>
        `;
        addTr.innerHTML = trContent;

        const cartTable = document.querySelector("tbody");
        if (cartTable) {
            cartTable.append(addTr);
        }

        addTr.querySelector("td[style*='cursor: pointer']").addEventListener("click", function() {
            addTr.remove();
            const index = cartItems.findIndex(function(item) {
                return item.name === productName;
            });

            if (index !== -1) {
                cartItems.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }

            updateTotal();
        });

        addTr.querySelector("input").addEventListener("change", function(event) {
            const newQuantity = parseInt(event.target.value);
            const index = cartItems.findIndex(function(item) {
                return item.name === productName;
            });

            if (index !== -1) {
                cartItems[index].quantity = newQuantity;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }

            updateTotal();
        });
    }

    function updateCartItem(index) {
        const row = document.querySelectorAll("tbody tr")[index];
        const input = row.querySelector("input");
        input.value = parseInt(input.value) + 1;
    }

    function calculateTotal() {
        let total = 0;
        cartItems.forEach(function(item) {
            const price = parseInt(item.price.replace(/\D/g, '').replace(/\./g, ''));
            total += price * item.quantity;
        });
        return total;
    }

    function updateTotal() {
        const totalPriceElement = document.querySelector(".price-total span");
        if (totalPriceElement) {
            totalPriceElement.textContent = formatCurrency(calculateTotal());
        }
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    updateTotal();




// hiển thị số lượng sản phẩm
function updateCartItemCount() {
    const cartItemCountElement = document.getElementById('cartItemCount');
    if (cartItemCountElement) {
        cartItemCountElement.textContent = getCartItemCount();
    }
}

// Hàm lấy số lượng sản phẩm trong giỏ hàng
function getCartItemCount() {
    let itemCount = 0;
    cartItems.forEach(function(item) {
        itemCount += item.quantity;
    });
    return itemCount;
}

// Gọi hàm cập nhật số lượng sản phẩm trong giỏ hàng khi trang được tải lại
updateCartItemCount();




//ấn hiện form giỏ hàng

// JavaScript để hiển thị hoặc ẩn phần giỏ hàng khi nhấn vào nút
var cart = document.querySelector('.cart');
var btnOpenCart = document.querySelector('.btn-open-cart');

btnOpenCart.addEventListener('click', function() {
    cart.classList.toggle('show-cart');
});


//dóng giỏ
var btnCloseCart = document.querySelector('.btn-close-cart');
var cart = document.querySelector('.cart');

btnCloseCart.addEventListener('click', function() {
    cart.classList.remove('show-cart'); // Loại bỏ lớp để ẩn form giỏ hàng
});


// Tìm kiếm sản phẩm trong giỏ hàng
document.getElementById("cart-search-input").addEventListener("input", function() {
    var filter = this.value.toLowerCase();
    var trs = document.querySelectorAll("tbody tr");
    trs.forEach(function(tr) {
        var productName = tr.querySelector("td:first-child").textContent.toLowerCase();
        if (productName.includes(filter)) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    });
});

/* 
function searchProducts() {
	
					const input = document.getElementById('searchInput').value.toLowerCase();
					const productItems = document.getElementsByClassName('slide-product-one-content-item');
					for (let i = 0; i < productItems.length; i++) {
						const item = productItems[i];
						const productName = item.textContent.toLowerCase();
						if (productName.includes(input)) {
							item.style.display = '';
							item.classList.remove('hidden');
						} else {
							item.style.display = 'none';
							item.classList.add('hidden');
						}
					}
					
} */


 function searchProducts() {
        let input, filter, productItems, productName, i, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        productItems = document.getElementsByClassName('slide-product-one-content-item');
		
        for (i = 0; i < productItems.length; i++) {
            productName = productItems[i].getElementsByTagName("h1")[0];
            txtValue = productName.textContent || productName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                productItems[i].classList.remove('hidden');
            } else {
                productItems[i].classList.add('hidden');
            }
        }
    }
	


