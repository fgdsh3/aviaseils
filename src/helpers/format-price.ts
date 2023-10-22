const formatPrice = (price: number) => {
	return String(price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
};

export default formatPrice;
