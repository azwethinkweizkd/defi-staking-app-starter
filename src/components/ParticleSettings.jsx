import Particles from "react-tsparticles";

const BackgroundParticles = () => {
	return (
		<div>
			<Particles
				height="100vh"
				width="100vw"
				id="tsparticles"
				options={{
					background: {
						color: "#333334",
					},
					fpsLimit: 120,
					interactivity: {
						detectsOn: "canvas",
						events: {
							onClick: {
								enable: true,
								mode: "push",
							},
							onHover: {
								enable: true,
								mode: "repulse",
							},
							resize: true,
						},
						modes: {
							bubble: {
								distance: 400,
								duration: 2,
								opacity: 0.8,
								size: 40,
							},
							push: {
								quantity: 4,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
							},
						},
					},
					particles: {
						color: {
							value: "#9933FF",
						},
						links: {
							color: "#3366FF",
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						collisions: {
							enable: false,
						},
						move: {
							direction: "none",
							enable: true,
							outModes: {
								default: "bounce",
							},
							random: true,
							speed: 1.25,
							straight: true,
						},
						number: {
							density: {
								enable: true,
								value_area: 800,
							},
							value: 80,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: "circle",
						},
						size: {
							random: true,
							value: 5,
						},
					},
				}}
			/>
		</div>
	);
};

export default BackgroundParticles;
