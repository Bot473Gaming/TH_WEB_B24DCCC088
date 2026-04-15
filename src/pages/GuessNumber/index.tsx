import React from 'react';
import { useModel } from 'umi';

const GuessNumber: React.FC = () => {
	// Lấy state và hàm xử lý từ model
	const { guess, setGuess, message, turns, gameOver, MAX_TURNS, handleGuess, resetGame } =
		useModel('guessnumber.index');

	return (
		<div style={{ padding: 20 }}>
			<h2>Trò chơi đoán số</h2>
			<p>Đoán số từ 1 đến 100 (Tối đa {MAX_TURNS} lượt)</p>

			<input type='number' value={guess} onChange={(e) => setGuess(e.target.value)} disabled={gameOver} />

			<button onClick={handleGuess} disabled={gameOver}>
				Đoán
			</button>

			<p>
				Lượt đã dùng: {turns}/{MAX_TURNS}
			</p>

			<p>{message}</p>

			<button onClick={resetGame}>Chơi lại</button>
		</div>
	);
};

export default GuessNumber;
