export async function searchProducts(name) {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/products/search/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  