document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Arabica", img: "product.jpg", price: 10 },
      { id: 2, name: "Robusta", img: "product.jpg", price: 10 },
      { id: 3, name: "Liberica", img: "product.jpg", price: 10 },
      { id: 4, name: "Excelsa", img: "product.jpg", price: 10 },
      { id: 5, name: "Decaf", img: "product.jpg", price: 10 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart:
      const cartItem = this.items.find((item) => item.id === newItem.id);
      //   jika belum ada :
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda/sama dengan yang ada di cart:
        this.items = this.items.map((item) => {
          // jika barang berbeda :
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan subtotalnya :
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id :
      const cartItem = this.items.find((item) => item.id === id);
      //   jika item lebih dari 1 :
      if (cartItem.quantity > 1) {
        // telusuri 1/1 :
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik :
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1 :
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konfersi mata uang ke dollar
const dollar = (number) => {
  return new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(number);
};
