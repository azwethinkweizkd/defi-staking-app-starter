import { useEffect, useState } from "react";

const Airdrop = () => {
	const [time, setTime] = useState({});
	const [seconds, setSeconds] = useState(20);
	let timer = 0;

	const startTime = () => {
		timer = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds <= 0) {
					clearInterval(timer);
					// Do something when timer ends
					return 0;
				} else {
					return prevSeconds - 1;
				}
			});
		}, 1000);
	};

	useEffect(() => {
		startTime();
		return () => {
			clearInterval(timer);
		};
	}, []);

	<div>0:{seconds}</div>;
};

export default Airdrop;
