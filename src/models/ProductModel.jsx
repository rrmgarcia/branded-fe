class ProductModel {
  constructor() {}

  async createProduct(product) {
    try {
      const response = await fetch("https://branded-be.onrender.com/product", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        console.log("Product saved:", savedProduct);
        return savedProduct;
      } else {
        console.error("Error creating product:", response.statusText);
        throw new Error("Error creating product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }
  async updateProductDetails(userId, updatedProductDetails) {
    console.log("test", updatedProductDetails);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://branded-be.onrender.com/product/${userId}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(updatedProductDetails), // Pass the object directly here
      });

      if (response.ok) {
        const updatedProduct = await response.json(); // Parse the response as JSON directly

        return updatedProduct;
      } else {
        console.error("Error updating product details:", response.statusText);
        throw new Error("Error updating product details");
      }
    } catch (error) {
      console.error("Error updating product details:", error);
      throw error;
    }
  }

  async findProductsByUserId(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://branded-be.onrender.com/product/${userId}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      if (response.ok) {
        const userProducts = await response.json();
        return userProducts;
      } else if (response.status === 404) {
        return null;
      } else {
        console.error("Error fetching user products:", response.statusText);
        throw new Error("Error fetching user products");
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://branded-be.onrender.com/product/${productId}`,
        {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

      if (response.ok) {
        console.log(
          `Product with productId ${productIdToDelete} deleted successfully.`
        );
      } else if (response.status === 404) {
        console.log(`Product with productId ${productIdToDelete} not found.`);
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}

const productModel = new ProductModel();
export default productModel;
