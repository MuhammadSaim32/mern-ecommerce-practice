import api from "./axios.api";

class productsApi {
  async uploadProduct(formData, token, id) {
    const response = await api.post(
      `/products/upload?id=${id}`,
      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  async GetAllProducts() {
    const response = await api.post("/products/all");
    return response.data.products;
  }

  async AddCart(token, product) {
    const response = await api.post("/products/cart/add", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async FetchProductById(ids) {
    const response = await api.post("/products/cart/products", ids);
    return response;
  }

  async ClearCartFromBackend(token) {
    const response = await api.post(
      "/products/cart/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  async DecreaseItem(token, product) {
    const response = await api.post("/products/cart/decrease", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async RemoveItem(token, product) {
    const response = await api.post("/products/cart/remove", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async handlepayment(data, token) {
    const response = await api.post("/payment/stripeSession", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async GetSellerProducts(token) {
    const resposne = await api.post("/products/seller/product", token, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposne;
  }

  async DeleteProduct(_id, token) {
    const res = await api.delete(`/products/seller/delete/product?id=${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }

  async GetOutOfStockProducts(token) {
    const res = await api.post(
      "/products/seller/outofstock",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  }

  async GetSellerOders(token) {
    const resposne = await api.post("/products/seller/orders", token, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposne;
  }

  async FetchUserOrder(ids) {
    const response = await api.post("/products/user/product", ids);
    return response;
  }

  async fetchUserOrder(token) {
    const resposne = await api.post("/products/user/orders", token, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposne;
  }

  async changeOrderStatus(data, token) {
    const response = await api.post("/products/seller/changestatus", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
  async AddReview(content, token, productid) {
    let data = {
      content,
      productid,
    };
    const response = await api.post("/products/review", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async deleteReview(token, productid) {
    const response = await api.post(
      "/products/review/delete",
      { productid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  async getproductByproductid(id) {
    const response = await api.post("/products/productByid", { id });
    return response;
  }
}

export const productApi = new productsApi();
