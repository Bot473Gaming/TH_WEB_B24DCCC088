import { useState } from 'react';
import { generateRandomNumber } from '@/services/GuessNumber';

// Số lượt đoán tối đa
const MAX_TURNS = 10;

export default function useGuessNumberModel() {
	// Số cần đoán (random khi load game)
	const [targetNumber, setTargetNumber] = useState<number>(generateRandomNumber());

	// Giá trị người chơi nhập
	const [guess, setGuess] = useState<string>('');

	// Thông báo kết quả
	const [message, setMessage] = useState<string>('');

	// Số lượt đã sử dụng
	const [turns, setTurns] = useState<number>(0);

	// Trạng thái kết thúc game
	const [gameOver, setGameOver] = useState<boolean>(false);

	/**
	 * Xử lý khi người chơi bấm nút "Đoán"
	 */
	const handleGuess = () => {
		if (gameOver) return;

		const num = Number(guess);

		// Kiểm tra dữ liệu nhập
		if (isNaN(num) || num < 1 || num > 100) {
			setMessage('Vui lòng nhập số từ 1 đến 100');
			return;
		}

		const newTurns = turns + 1;
		setTurns(newTurns);

		// So sánh kết quả
		if (num < targetNumber) {
			setMessage('Bạn đoán quá thấp!');
		} else if (num > targetNumber) {
			setMessage('Bạn đoán quá cao!');
		} else {
			setMessage('Chúc mừng! Bạn đã đoán đúng!');
			setGameOver(true);
			return;
		}

		// Hết lượt
		if (newTurns >= MAX_TURNS) {
			setMessage(`Bạn đã hết lượt! Số đúng là ${targetNumber}`);
			setGameOver(true);
		}
	};

	/**
	 * Reset lại game và sinh số mới
	 */
	const resetGame = () => {
		setTargetNumber(generateRandomNumber());
		setGuess('');
		setMessage('');
		setTurns(0);
		setGameOver(false);
	};

	return {
		guess,
		setGuess,
		message,
		turns,
		gameOver,
		MAX_TURNS,
		handleGuess,
		resetGame,
	};
}
