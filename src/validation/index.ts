interface IProductValidation {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

/**
 * Validates a product object ensuring all fields meet specified criteria.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product, must be between 10 and 50 characters.
 * @param {string} product.description - The description of the product, must be between 10 and 200 characters.
 * @param {string} product.imageURL - The URL of the product's image, must be a valid URL.
 * @param {string} product.price - The price of the product, must be a valid number.
 * @returns {Object} errors - An object containing error messages for each invalid field.
 * @returns {string} errors.title - Error message for the title, if invalid.
 * @returns {string} errors.description - Error message for the description, if invalid.
 * @returns {string} errors.imageURL - Error message for the image URL, if invalid.
 * @returns {string} errors.price - Error message for the price, if invalid.
 */
export const productValidation = (product: IProductValidation) => {
  const errors: IProductValidation = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 50
  ) {
    errors.title = "Title must be between 10 and 50 characters";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 200
  ) {
    errors.description = "Description must be between 10 and 200 characters";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Image URL is required and must be a valid URL";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price is required and must be a valid number";
  }

  return errors;
};
