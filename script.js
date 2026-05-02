
        // NAYA GOOGLE SHEET URL YAHAN HAI
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzWTWwSuNgWA2zgOJ5Vsc1URcVEFGfW2LPcX2Kj7jWnzypiexAImw2mgCJcRYFZZOSv/exec";
    const google_sheet_url_orders ="https://script.google.com/macros/s/AKfycbwo_8Hm1IO_4101zt72fZQWSio3MP4Sjn1hdc5oNWoc/dev"
    let defaultProducts = [
    {id: 1, name: "Fresh Potatoes (Aaloo)", price: 40, category: "Vegetables", desc: "Farm fresh everyday potatoes. Best quality.", images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500"], sizes: ["1 KG", "2 KG", "5 KG"], colors: [] },
    {id: 2, name: "Red Tomatoes (Tamatar)", price: 60, category: "Vegetables", desc: "Juicy and red tomatoes direct from farm.", images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"], sizes: ["1 KG", "2 KG"], colors: [] },
    {id: 3, name: "Green Spinach (Palak)", price: 30, category: "Vegetables", desc: "Healthy green spinach leaves.", images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500"], sizes: ["1 Bunch", "2 Bunches"], colors: [] },
    {id: 4, name: "Fresh Apples (Seb)", price: 150, category: "Fruits", desc: "Sweet and crunchy apples.", images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=500"], sizes: ["1 KG", "2 KG"], colors: [] },
    {id: 5, name: "Bananas (Kela)", price: 50, category: "Fruits", desc: "Fresh yellow bananas.", images: ["https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500"], sizes: ["1 Dozen", "2 Dozen"], colors: [] },
    {id: 6, name: "Sweet Mangoes (Aam)", price: 120, category: "Fruits", desc: "Seasonal sweet mangoes.", images: ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500"], sizes: ["1 KG", "3 KG"], colors: [] },
    {id: 7, name: "Men's Casual Cotton Shirt", price: 699, category: "Clothing", desc: "Comfortable cotton shirt for daily wear.", images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500"], sizes: ["M", "L", "XL"], colors: ["Blue", "White", "Black"] },
    {id: 8, name: "Formal White Shirt", price: 899, category: "Clothing", desc: "Premium formal white shirt for office wear.", images: ["https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500"], sizes: ["S", "M", "L", "XL"], colors: ["White"] },
    {id: 9, name: "Sony Wireless Headphones", price: 2999, category: "Electronics", desc: "High bass over-ear wireless headphones.", images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"], sizes: [], colors: ["Black", "Silver"] },
    {id: 10, name: "Boat BassHeads Wired", price: 499, category: "Electronics", desc: "Wired earphones with heavy bass.", images: ["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500"], sizes: [], colors: ["Red", "Black"] },
    {id: 11, name: "Apple iPhone 13", price: 69999, category: "Electronics", desc: "Latest Apple iPhone with A15 Bionic chip.", images: ["https://images.unsplash.com/photo-1631647537360-9c8b1a1e5c3b?w=500"], sizes: [], colors: ["Black", "White", "Red", "Blue"] },
    {id: 12, name: "Nike Air Max Sneakers", price: 4999, category: "Footwear", desc: "Comfortable and stylish sneakers for everyday wear.", images: ["https://images.unsplash.com/photo-1600185366598-1c3a1b2e5f4c?w=500"], sizes: ["7", "8", "9", "10"], colors: ["Black", "White", "Grey"] }

   ];

    let products = JSON.parse(localStorage.getItem('pshop_products')) || defaultProducts;
    let user = JSON.parse(localStorage.getItem('pshop_user')) || null;
    let selectedP = null;

    let userSelectedSize = "";
    let userSelectedColor = "";
    let currentCategory = "All";

    if(!user) {
        document.getElementById('loginOverlay').classList.remove('hidden');
        } else {
        document.getElementById('userNameTxt').innerText = user.name;
    document.getElementById('setName').innerText = user.name;
    document.getElementById('setPhone').innerText = user.phone;
    document.getElementById('checkUserName').innerText = user.name;
    document.getElementById('checkUserPhone').innerText = user.phone;
        }

    // LOGIN FUNCTION
    function saveUser() {
            const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;
    if(!name || !phone) return alert("Pura naam aur phone number bhariye!");

    document.getElementById('loginBtn').innerText = "Logging in...";
    document.getElementById('loginBtn').disabled = true;

    localStorage.setItem('pshop_user', JSON.stringify({name, phone}));

    let formData = new FormData();
    formData.append("type", "login");
    formData.append("name", name);
    formData.append("phone", phone);
    // YAHAN DATE BHEJ RAHA HAI LOGIN KE TIME PAR
    formData.append("date", new Date().toLocaleString());

    fetch(GOOGLE_SHEET_URL, {method: "POST", body: formData, mode: "no-cors" })
                .then(() => {location.reload(); })
                .catch(e => {console.error(e); location.reload(); });
        }

    function logout() {localStorage.removeItem('pshop_user'); location.reload(); }

    function renderProducts(data) {
        document.getElementById('homePage').innerHTML = data.map(p => {
            let mainImg = (p.images && p.images.length > 0) ? p.images[0] : p.img;
            return `
                <div onclick='openProfile(${JSON.stringify(p)})' class="bg-white rounded-[32px] p-2 border shadow-sm active:scale-95 transition cursor-pointer">
                    <img src="${mainImg}" class="h-44 w-full object-cover rounded-[28px] mb-3 bg-slate-100">
                    <div class="px-3 pb-2">
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">${p.category || 'Product'}</p>
                        <h3 class="font-black text-slate-800 text-sm line-clamp-2 leading-tight">${p.name}</h3>
                        <p class="text-green-600 font-black text-lg mt-1">₹${p.price}</p>
                    </div>
                </div>
            `}).join('');
        }

    function filterCategory(cat) {
        currentCategory = cat;
            document.querySelectorAll('.cat-btn').forEach(btn => {
                if(btn.innerText === cat || (cat === 'Clothing' && btn.innerText === 'Shirts') || (cat === 'Electronics' && btn.innerText === 'Headphones')) {
        btn.classList.replace('bg-white', 'bg-green-600');
    btn.classList.replace('text-slate-600', 'text-white');
                } else {
        btn.classList.replace('bg-green-600', 'bg-white');
    btn.classList.replace('text-white', 'text-slate-600');
                }
            });

    if(cat === "All") {
        renderProducts(products);
            } else {
        renderProducts(products.filter(p => p.category === cat));
            }
        }

    function applySearch() {
        let s = document.getElementById('searchBox').value.toLowerCase();
            let f = products.filter(x => x.name.toLowerCase().includes(s));
    renderProducts(f);
        }

    function openProfile(p) {
        selectedP = p;
    userSelectedSize = "";
    userSelectedColor = "";

    document.getElementById('detCategory').innerText = p.category || "General";
    document.getElementById('detName').innerText = p.name;
    document.getElementById('detPrice').innerText = '₹' + p.price;
    document.getElementById('detDesc').innerText = p.desc || "No description available.";

    let mediaHTML = "";
    let imgList = p.images || [p.img];
            imgList.forEach(imgUrl => {
                if(imgUrl) mediaHTML += `<img src="${imgUrl}" class="w-full h-full object-cover flex-none snap-center">`;
            });
        document.getElementById('profMedia').innerHTML = mediaHTML;

        let sizeSec = document.getElementById('sizeSection');
        let sizeOpt = document.getElementById('sizeOptions');
            if(p.sizes && p.sizes.length > 0) {
            sizeSec.classList.remove('hidden');
                sizeOpt.innerHTML = p.sizes.map(s =>
        `<button onclick="selectSize(this, '${s}')" class="size-btn px-4 py-2 border-2 rounded-xl font-black text-slate-500 hover:border-slate-800 transition">${s}</button>`
        ).join('');
            } else {sizeSec.classList.add('hidden'); }

        let colorSec = document.getElementById('colorSection');
        let colorOpt = document.getElementById('colorOptions');
            if(p.colors && p.colors.length > 0) {
            colorSec.classList.remove('hidden');
                colorOpt.innerHTML = p.colors.map(c =>
        `<button onclick="selectColor(this, '${c}')" class="color-btn px-4 py-2 border-2 rounded-xl font-black text-slate-500 hover:border-slate-800 transition">${c}</button>`
        ).join('');
            } else {colorSec.classList.add('hidden'); }

        document.getElementById('fullProfile').classList.add('active');
        }

        function closeProfile() {document.getElementById('fullProfile').classList.remove('active'); }

        function selectSize(element, size) {
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('border-slate-800', 'text-slate-800', 'bg-slate-100'));
        element.classList.add('border-slate-800', 'text-slate-800', 'bg-slate-100');
        userSelectedSize = size;
        }

        function selectColor(element, color) {
            document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('border-slate-800', 'text-slate-800', 'bg-slate-100'));
        element.classList.add('border-slate-800', 'text-slate-800', 'bg-slate-100');
        userSelectedColor = color;
        }

        function showPage(p) {
            ['homePage', 'ordersPage', 'profilePage'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById(p + 'Page').classList.remove('hidden');
        window.scrollTo(0, 0);
        if(p === 'orders') renderOrders();
        }

        function changeQty(val) {
            let q = document.getElementById('orderQty');
        let newVal = parseInt(q.value) + val;
            if(newVal >= 1) {
            q.value = newVal;
        updateCheckoutTotal();
            }
        }

        function updateCheckoutTotal() {
            let qty = parseInt(document.getElementById('orderQty').value);
        document.getElementById('checkTotalAmount').innerText = '₹' + (selectedP.price * qty);
        }

        function openCheckout() {
            if(selectedP.sizes && selectedP.sizes.length > 0 && !userSelectedSize) return alert("Kripya Size/Weight select karein!");
            if(selectedP.colors && selectedP.colors.length > 0 && !userSelectedColor) return alert("Kripya Color select karein!");

            let mainImg = (selectedP.images && selectedP.images.length > 0) ? selectedP.images[0] : selectedP.img;

        document.getElementById('checkPImg').src = mainImg;
        document.getElementById('checkPName').innerText = selectedP.name;
        document.getElementById('checkPPrice').innerText = '₹' + selectedP.price;
        document.getElementById('orderQty').value = 1;

        let variantsTxt = [];
        if(userSelectedSize) variantsTxt.push(`Size: ${userSelectedSize}`);
        if(userSelectedColor) variantsTxt.push(`Color: ${userSelectedColor}`);
        document.getElementById('checkVariants').innerText = variantsTxt.join(' | ');

        updateCheckoutTotal();
        document.getElementById('checkoutModal').classList.remove('hidden');
        }

        // ORDER FUNCTION
        function placeOrder() {
            let addr = document.getElementById('shipAddr').value;
        if(!addr) return alert("Kripya poora address likhein!");

        document.getElementById('confirmOrderBtn').innerText = "Processing...";
        document.getElementById('confirmOrderBtn').disabled = true;

        let orders = JSON.parse(localStorage.getItem('pshop_orders')) || [];
        let qty = parseInt(document.getElementById('orderQty').value);
            let mainImg = (selectedP.images && selectedP.images.length > 0) ? selectedP.images[0] : selectedP.img;
        let fullAddress = document.getElementById('nawadaLoc').value + ", " + addr;
        let totalAmt = selectedP.price * qty;

        let newOrder = {
            id: Date.now(),
        date: new Date().toLocaleDateString(),
        userPhone: user.phone,
        userName: user.name,
        pName: selectedP.name,
        pPrice: selectedP.price,
        pImg: mainImg,
        size: userSelectedSize,
        color: userSelectedColor,
        qty: qty,
        total: totalAmt,
        payMethod: document.getElementById('payMethod').value,
        location: document.getElementById('nawadaLoc').value,
        addr: addr,
        status: 'Pending',
        deliveryDate: 'Waiting...'
            };

        orders.push(newOrder);
        localStorage.setItem('pshop_orders', JSON.stringify(orders));

        let formData = new FormData();
        formData.append("type", "order");
        formData.append("name", user.name);
        formData.append("phone", user.phone);
        formData.append("product", selectedP.name + (userSelectedSize ? ` (${userSelectedSize})` : '') + (userSelectedColor ? ` [${userSelectedColor}]` : ''));
        formData.append("qty", qty);
        formData.append("total", totalAmt);
        formData.append("address", fullAddress);
        // YAHAN DATE BHEJ RAHA HAI ORDER KE TIME PAR
        formData.append("date", new Date().toLocaleString());

        fetch(GOOGLE_SHEET_URL, {method: "POST", body: formData, mode: "no-cors" })
                .then(() => {
            alert("Order Successful! Aapka order Google Sheet mein chala gaya hai.");
        document.getElementById('confirmOrderBtn').innerText = "CONFIRM ORDER";
        document.getElementById('confirmOrderBtn').disabled = false;
        document.getElementById('checkoutModal').classList.add('hidden');
        closeProfile();
        showPage('orders');
                })
                .catch(e => {
            console.error(e);
        alert("Error in sending order to Google Sheets, but saved locally."); 
                });
        }

        function renderOrders() {
            let orders = JSON.parse(localStorage.getItem('pshop_orders')) || [];
            let my = orders.filter(o => o.userPhone === user.phone);

        if(my.length === 0) {
            document.getElementById('orderList').innerHTML = `
                <div class="text-center mt-20 text-slate-400">
                    <i class="fas fa-box-open text-6xl mb-4 opacity-50"></i>
                    <p class="font-bold">Koi orders nahi hain.</p>
                </div>`;
        return;
            }

            document.getElementById('orderList').innerHTML = my.map(o => {
            let variants = [];
        if(o.size) variants.push(`Size: ${o.size}`);
        if(o.color) variants.push(`Color: ${o.color}`);
                let varText = variants.length > 0 ? `<p class="text-xs font-bold text-slate-500 my-1">${variants.join(' | ')}</p>` : '';

        return `
        <div class="bg-white p-5 rounded-[30px] border shadow-sm">
            <div class="flex gap-4 mb-4">
                <img src="${o.pImg}" class="w-24 h-24 rounded-2xl object-cover border bg-slate-50">
                    <div class="flex-1">
                        <h4 class="font-black text-slate-800 leading-tight">${o.pName} <span class="text-slate-400 text-xs">(x${o.qty})</span></h4>
                        ${varText}
                        <p class="text-green-600 font-black text-lg mt-1">₹${o.total}</p>
                        <span class="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full font-black uppercase mt-2 inline-block shadow-sm">
                            <i class="fas fa-circle text-[8px] mr-1"></i> ${o.status}
                        </span>
                    </div>
            </div>
            <div class="bg-slate-50 p-4 rounded-2xl text-[11px] border border-slate-100">
                <p class="font-black text-slate-600 mb-1">Customer Info:</p>
                <p class="font-bold text-slate-500">${o.userName} | ${o.userPhone}</p>
                <p class="font-bold text-slate-500">📍 ${o.location}: ${o.addr}</p>
                <p class="font-bold text-slate-500 mt-1">💳 Payment: ${o.payMethod}</p>
                <div class="h-px bg-slate-200 my-2"></div>
                <p class="text-blue-600 font-bold italic"><i class="fas fa-truck mr-1"></i> Delivery: ${o.deliveryDate}</p>
            </div>
        </div>
            `}).reverse().join('');
        }

        renderProducts(products);
