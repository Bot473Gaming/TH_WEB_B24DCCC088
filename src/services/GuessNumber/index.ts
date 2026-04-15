/**
 * Sinh số ngẫu nhiên từ 1 đến 100
 */
export const generateRandomNumber = (): number => {
	return Math.floor(Math.random() * 100) + 1;
};
