// api/adminProducts.js
import { getHeaders, handleResponse } from "./helpers";

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:p0--DpmS";

// GET all products with variants
export async function getAllProducts() {
    const res = await fetch(`${API_URL}/products`, {
        headers: getHeaders(false, true),
    });
    return handleResponse(res);
}

// PATCH update Product is_featured
export async function updateProductIsFeatured(productId, isFeatured) {
    const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "PATCH",
        headers: getHeaders(true, true),
        body: JSON.stringify({
            is_featured: isFeatured,
            products_id: productId
        }),
    });
    return handleResponse(res);
}

// PATCH update variant stock
export async function updateVariantStock(variantId, newStock) {
    const res = await fetch(`${API_URL}/product_variants/${variantId}`, {
        method: "PATCH",
        headers: getHeaders(true, true),
        body: JSON.stringify({
            stock: newStock,
            product_variants_id: variantId
        }),
    });
    return handleResponse(res);
}

// POST create a new product (sans variantes)
export async function createProduct(product) {
    const { name, description, price_in_cents, img_url, sub_categories_id } = product;
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: getHeaders(true, true),
        body: JSON.stringify({ name, description, price_in_cents, img_url, sub_categories_id }),
    });
    const createdProduct = await handleResponse(res);

    return createdProduct;
}



// POST add a variant to an existing product
export async function createVariant(productId, variant) {
    const { color, size, sku, stock } = variant;
    const res = await fetch(`${API_URL}/product_variants`, {
        method: "POST",
        headers: getHeaders(true, true),
        body: JSON.stringify({ products_id: productId, color, size, sku, stock }),
    });
    return handleResponse(res);
}

// DELETE a product
export async function deleteProduct(productId) {
    const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: getHeaders(true, true),
        body: JSON.stringify({ products_id: productId }),
    });
    return handleResponse(res);
}

// DELETE a product variant
export async function deleteVariant(variantId) {
    const res = await fetch(`${API_URL}/product_variants/${variantId}`, {
        method: "DELETE",
        headers: getHeaders(true, true),
        body: JSON.stringify({ product_variants_id: variantId }),
    });
    return handleResponse(res);
}

// GET orders
export async function getAllOrders() {
    const res = await fetch(`${API_URL}/orders`, {
        headers: getHeaders(true, true),
    });
    return handleResponse(res);
}

// PATCH order status
export async function updateOrderStatus(orderId, status) {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: getHeaders(true, true),
        body: JSON.stringify({
            status,
            orders_id: orderId,
        }),
    });
    return handleResponse(res);
}
