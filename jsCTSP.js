let index = 0;
let slides = document.getElementsByClassName("slides");
let timer;

function showSlides() 
{
    for (let i = 0; i < slides.length; i++) 
	{
        slides[i].style.display = "none";
    }
    index++;
    if (index > slides.length) 
	{
        index = 1;
    }
    slides[index - 1].style.display = "block";
   
}


window.onload = function() 
{
    showSlides();
}
//mở đóng form

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




// tăng số lượng
function increaseAmount(id) {
    var a = document.getElementById(id).value;
    var newAmount = Number(a) + 1;
    document.getElementById(id).value = newAmount;
    return newAmount;
}

function decreaseAmount(id) {
    var a = document.getElementById(id).value;
    if (Number(a) > 1) {
        var newAmount = Number(a) - 1;
        document.getElementById(id).value = newAmount;
        return newAmount;
    }
    return Number(a);
}




 let cartItems = [];

    if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
        cartItems.forEach(function(item) {
            addCartItem(item.image, item.name, item.price, item.quantity,item.productID);
        });
        updateTotal();
    }
	

//Thêm vào giỏ hàng
function addToCart(id) {
    var amount = document.getElementById(id).value;
   var amountInt = parseInt(amount, 10);
   
			if (selectedProduct == "") 
			{
				selectedProduct="Mẫu 1";
			}
            const productImg = document.getElementById('product-image').src;
            const productName =  document.getElementById('product-name').innerText+" " +selectedProduct;
            const productPrice =  document.getElementById('product-price').innerText;

            const existingItemIndex = cartItems.findIndex(function(item) {
                return item.name === productName;
            });

            if (existingItemIndex !== -1) {
                if (confirm("SẢN PHẨM NÀY ĐÃ CÓ TRONG GIỎ HÀNG, BẠN CÓ MUỐN TĂNG SỐ LƯỢNG LÊN "+amount+"  ?")) {
                    cartItems[existingItemIndex].quantity += amountInt;
                    updateCartItem(existingItemIndex,amountInt);
					alert("Đã thêm sản phẩm với số lượng " + amount + " vào giỏ hàng.");
                }
            } else {
                cartItems.push({
                    image: productImg,
                    name: productName,
                    price: productPrice,
                    quantity: amountInt,
					productID:ID_product
                });
                addCartItem(productImg, productName, productPrice, amountInt,ID_product);
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotal();
	
	
    //alert("Đã thêm sản phẩm với số lượng " + amount + " vào giỏ hàng.");
}


  function addCartItem(productImg, productName, productPrice, quantity,ID_product) {
        const addTr = document.createElement("tr");
        const trContent = `
            <td style="display: flex; align-items: center">
                <a href ="indexCTSP.html?id=${ID_product}"><img style="width: 70px;" src="${productImg}"  alt="${productName}" /></a>${productName}
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

    function updateCartItem(index,amountInt) {
        const row = document.querySelectorAll("tbody tr")[index];
        const input = row.querySelector("input");
        input.value = parseInt(input.value) + amountInt;
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


function removeFromCart() {
    if (confirm("Bạn có chắc muốn xóa khỏi giỏ hàng?")) {
		
		 const productName =  document.getElementById('product-name').innerText;
		 const index = cartItems.findIndex(function(item) {
                return item.name === productName;
            });

            if (index !== -1) {
                cartItems.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
			
            }
			
        alert("Xóa thành công");
			 location.reload();
        // Thực hiện các hành động xóa sản phẩm khỏi giỏ hàng tại đây
    } else {
        alert("Đã hủy thao tác xóa");
    }
}

//đánh giá sao
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            updateStars(selectedRating);
        });

        star.addEventListener('mouseover', () => {
            updateStars(star.getAttribute('data-value'), true);
        });

        star.addEventListener('mouseout', () => {
            updateStars(selectedRating);
        });
    });
});

function updateStars(rating, hover = false) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected', 'hovered');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add(hover ? 'hovered' : 'selected');
        }
    });
}

function submitRating() {
    if (selectedRating > 0) {
        alert(`Bạn đã đánh giá ${selectedRating} sao`);
    } else {
        alert('Vui lòng chọn số sao để đánh giá');
    }
}


// lướt lên
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


	

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


var ID_product="";

// ấn vô thì hiện lên chi tiết 
 document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
			ID_product=productId;
            const productInfo = {
                1: { name: "Iphone 12 Pro Max 128GB", price: "32.990.000đ",priceTG: "30.990.000đ" , description: "Màn hình: OLED6.7 Super Retina XDR" , mota2: "Hệ điều hành: IOS 15" , mota3: "Camera sau: 3 camera 12 MP", mota4: "Camera trước: 12 MP", mota5: "Chip:Apple A14 Bionic", image: "13promax.jpg" ,anh1: "13promax.jpg" ,anh2: "12promax.jpg" ,anh3: "12promaxxam.webp" ,anh4: "12promaxbac.jpg"   },
                2: { name: "Iphone 13 Pro Max 512GB", price: "34.990.000đ",priceTG: "33.990.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 15 MP", mota4: "Camera trước: 15 MP", mota5: "Chip:Apple A15 Bionic" , image: "13promax.jpg" ,anh1: "13promax.jpg" ,anh2: "12promax.jpg" ,anh3: "12promaxxam.webp" ,anh4: "12promaxbac.jpg"},
                3: { name: "Iphone 12 Pro Max 512GB", price: "33.000.000đ",priceTG: "32.990.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 18 MP", mota4: "Camera trước: 12 MP", mota5: "Chip:Apple A14 Bionic" , image: "12promax.jpg" ,anh1: "13promax.jpg" ,anh2: "12promax.jpg" ,anh3: "12promaxxam.webp" ,anh4: "12promaxbac.jpg"},
				4: { name: "Iphone 11 Pro Max 128GB", price: "12.990.000đ",priceTG: "10.990.000đ" , description: "Màn hình: OLED6.7 Super Retina XDR" , mota2: "Hệ điều hành: IOS 15" , mota3: "Camera sau: 3 camera 12 MP", mota4: "Camera trước: 12 MP", mota5: "Chip:Apple A14 Bionic", image: "11promax.jpg" ,anh1: "13promax.jpg" ,anh2: "11promax.jpg" ,anh3: "12promaxxam.webp" ,anh4: "12promaxbac.jpg"  },
                5: { name: "Iphone 13 Bộ nhớ 128GB", price: "20.000.000đ",priceTG: "18.990.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 15 MP", mota4: "Camera trước: 15 MP", mota5: "Chip:Apple A15 Bionic" , image: "13.jpg",anh1: "13xanhla.jpg" ,anh2: "13.jpg" ,anh3: "13vang.jpg" ,anh4: "13do.jpg" },
                6: { name: "Iphone XS Max 128GB", price: "8.990.000đ",priceTG: "8.000.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 18 MP", mota4: "Camera trước: 12 MP", mota5: "Chip:Apple A14 Bionic" , image: "xsmax.jpg",anh1: "xsmax.jpg" ,anh2: "xsmaxden.jpg" ,anh3: "xsmaxtrang.jpg" ,anh4: "xsmaxxanhduong.jpg" },
				7: { name: "Iphone XR Bộ nhớ 128GB", price: "6.990.000đ",priceTG: "6.000.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 15 MP", mota4: "Camera trước: 15 MP", mota5: "Chip:Apple A15 Bionic" , image: "xr.jpg" ,anh1: "xr.jpg" ,anh2: "xrden.jpg" ,anh3: "xrvang.jpg" ,anh4: "xrdo.jpg"},
                8: { name: "Iphone XS Bộ nhớ 128GB", price: "7.990.000đ",priceTG: "7.390.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 18 MP", mota4: "Camera trước: 12 MP", mota5: "Chip:Apple A14 Bionic" , image: "xs.jpg",anh1: "xsmax.jpg" ,anh2: "xsmaxden.jpg" ,anh3: "xsmaxtrang.jpg" ,anh4: "xsmaxxanhduong.jpg" },
				9: { name: "Airpods Pro Gen 2", price: "6.290.000đ",priceTG: "5.990.000đ", description: "Thời gian tai nghe: 6h", mota2: "Thời gian hộp: 30h", mota3: "Cổng sạc: Type C", mota4: "Tương thích: macOS (Macbook, iMac)Android, iOS, Windows", mota5: "Hỗ trợ kết nối: Bluetooth 5.3" , image: "airpodsprogen2.jpg" ,anh1: "airpodsprogen2.jpg" ,anh2: "airpodsprogen21.jpg" ,anh3: "airpodsprogen23.jpg" ,anh4: "airpodsprogen24.jpg" },
				10: { name: "Airpods 2 Lightning", price: "3.700.000đ",priceTG: "2.990.000đ", description: "Thời gian tai nghe: 6h", mota2: "Thời gian hộp: 30h", mota3: " Cổng sạc: Type C", mota4: "Tương thích: macOS (Macbook, iMac)Android, iOS, Windows", mota5: "Hỗ trợ kết nối: Bluetooth 5.3" , image: "airpods2lighning.jpg" ,anh1: "airpods2lighning.jpg" ,anh2: "airpods2lighning2.jpg" ,anh3: "airpods2lighning23.jpg" ,anh4: "airpods2lighning24.jpg"},
				11: { name: "Tai nghe TW", price: "4.000.000đ",priceTG: "3.690.000đ", description: "Thời gian tai nghe: Dùng 7 giờ - Sạc 1 giờ", mota2: "Thời gian hộp: Dùng 28 giờ - Sạc 2 giờ", mota3: "Cổng sạc: Type C", mota4: "Tương thích: macOS (Macbook, iMac)Android, iOS, Windows", mota5: "Hỗ trợ kết nối: Bluetooth 5.3" , image: "truewalet.jpg" ,anh1: "truewalet.jpg" ,anh2: "tw1.jpg" ,anh3: "tw3.jpg" ,anh4: "tw4.jpg"},
				12: { name: "Tai nghe có dây", price: "790.000đ",priceTG: "590.000đ", description: "Thời gian tai nghe: Dùng 5 giờ", mota2: "Hàng Chính Hãng", mota3: "Đầu dây: Lightning", mota4: "Tương thích: macOS (Macbook, iMac), iOS", mota5: "Hỗ trợ kết nối: Kết nối dây" , image: "tainghecoday.png" },
				13: { name: "Kính cường lực", price: "360.000đ",priceTG: "290.000đ", description: "Nhà sản xuất: Shanghai JCPAL", mota2: "Địa Chỉ: Trung Quốc", mota3: "Chất liệu: Kính Aluminosilicat", mota4: "Công dụng: bảo vệ, hạn chế trầy xước", mota5: "Dùng cho Iphone 15 Pro Max" , image: "kinhcl.jpg",anh1: "kinhcl.jpg" ,anh2: "kcl1.jpg" ,anh3: "kcl4.jpg" ,anh4: "kcl3.jpg" },
				14: { name: "Ốp điện thoại", price: "90.000đ",priceTG: "70.000đ", description: "Nhà sản xuất: Shanghai JCPAL", mota2: "Địa Chỉ: Trung Quốc", mota3: "Chất liệu: Nhựa An Toàn", mota4: "Công dụng: bảo vệ, chống va đập", mota5: "Dùng cho Iphone 15 Pro Max" , image: "op.jpg" ,anh1: "op.jpg" ,anh2: "op1.jpg" ,anh3: "op2.jpg" ,anh4: "op3.jpg"},
				15: { name: "Apple Pencil Pro", price: "4.990.000đ",priceTG: "4.500.000đ", description: "Kích thước: Dài 16.6 cm - Đường kính 0.89 cm", mota2: "Tương thích thiết bị: iPad Pro 13 inch (M4), iPad Pro 11 inch (M4)", mota3: "Bluetooth: Có", mota4: "Cách kết nối: Sạc nam châm với iPad Pro", mota5: "Sản xuất tại: Việt Nam/Trung Quốc (tùy lô hàng)" , image: "butiphone.jpg",anh1: "butiphone.jpg" ,anh2: "butiphone1.jpg" ,anh3: "butiphone2.png" ,anh4: "butiphone3.png" },
				16: { name: "Iphone XS 64GB", price: "7.990.000đ",priceTG: "7.390.000đ", description: "Màn hình: OLED6.7 Super Retina XDR", mota2: "Hệ điều hành: IOS 15", mota3: "Camera sau: 3 camera 18 MP", mota4: "Camera trước: 11 MP", mota5: "Chip:Apple A13 Bionic" , image: "xs.jpg",anh1: "xsmax.jpg" ,anh2: "xsmaxden.jpg" ,anh3: "xsmaxtrang.jpg" ,anh4: "xsmaxxanhduong.jpg" },
				
			
			};
			

            if (productInfo[productId]) {
                document.getElementById('product-name').innerText = productInfo[productId].name;
                document.getElementById('product-price').innerText = productInfo[productId].price;
				 document.getElementById('product-priceTG').innerText = productInfo[productId].priceTG;
                document.getElementById('mota1').innerText = productInfo[productId].description;
				document.getElementById('mota2').innerText = productInfo[productId].mota2;
				document.getElementById('mota3').innerText = productInfo[productId].mota3;
				document.getElementById('mota4').innerText = productInfo[productId].mota4;
				document.getElementById('mota5').innerText = productInfo[productId].mota5;
				document.getElementById('product-image').src = productInfo[productId].image;
				
                document.getElementById('product-image').alt = productInfo[productId].name;
				
				document.getElementById('product-anh1').src = productInfo[productId].anh1;
				document.getElementById('product-anh2').src = productInfo[productId].anh2;
				document.getElementById('product-anh3').src = productInfo[productId].anh3;
				document.getElementById('product-anh4').src = productInfo[productId].anh4;
            } else {
                document.getElementById('product-info').innerText = "Sản phẩm không tồn tại.";
            }
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




// Hàm thay đổi hình ảnh chính
    function changeProductImage(event) {
        var mainImage = document.getElementById('product-image');
        mainImage.src = event.target.src;
    }

    // Gắn sự kiện click cho các hình ảnh nhỏ
    var thumbnails = document.querySelectorAll('[id^="product-anh"]');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', changeProductImage);
    });
	
	
// Hàm thay đổi hình ảnh chính ấn nút 
var selectedProduct = '';

function changeProductImageById(thumbnailId) {
        var mainImage = document.getElementById('product-image');
        var thumbnail = document.getElementById(thumbnailId);
        mainImage.src = thumbnail.src;
		
		   // Reset all button styles
			const buttons = document.querySelectorAll('.nutmau input[type="button"]');
			buttons.forEach(button => {
				button.style.backgroundColor = '';
				button.style.color = '';
			});
			var selectedButton1="";
			if (thumbnailId == "product-anh1") 
			{
				selectedButton1 = "btnmau1";
			} else if (thumbnailId == "product-anh2") 
			{
				selectedButton1 = "btnmau2";// Default behavior
			} else if (thumbnailId == "product-anh3") 
			{
				selectedButton1 = "btnmau3"; // Default behavior
			} else if (thumbnailId == "product-anh4") 
			{
				selectedButton1 = "btnmau4"; // Default behavior
			}
			
			// Highlight the selected button
			const selectedButton = document.getElementById(selectedButton1);
			selectedButton.style.backgroundColor = 'black';
			selectedButton.style.color = 'white';
			
			if (thumbnailId == "product-anh1") 
			{
				selectedProduct = "Mẫu 1";
			} else if (thumbnailId == "product-anh2") 
			{
				selectedProduct = "Mẫu 2"; // Default behavior
			} else if (thumbnailId == "product-anh3") 
			{
				selectedProduct = "Mẫu 3"; // Default behavior
			} else if (thumbnailId == "product-anh4") 
			{
				selectedProduct = "Mẫu 4"; // Default behavior
			}
}


	
	
	
	