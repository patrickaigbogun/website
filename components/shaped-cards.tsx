export default function ShapedCards() {
	const cardStyles = {
		product: {
			'--circle-r': '13px',
			'--big-circle-r': '30px',
			'--pillar-size': 'max(34px, var(--circle-r))',
			'--card-color': '#fff',
			'--card-shadow': '0 10px 48px rgba(21, 44, 115, 0.15)',
			width: '217px',
			minHeight: '400px',
			borderRadius: '50px',
		},
		compare: {
			'--circle-r': '10px',
			'--big-circle-r': '25px',
			'--pillar-size': 'max(24px, var(--circle-r))',
			'--card-color': '#fff',
			'--card-shadow': '0 10px 48px rgba(21, 44, 115, 0.15)',
			width: '300px',
			minHeight: '140px',
			borderRadius: '40px',
		},
		dropdown: {
			'--circle-r': '20px',
			'--big-circle-r': '22px',
			'--pillar-size': 'max(23px, var(--circle-r))',
			'--card-color': '#fff',
			'--card-shadow': '0 10px 48px rgba(21, 44, 115, 0.15)',
			width: '200px',
			minHeight: '240px',
			borderRadius: '25px',
		},
	};

	return (
		<div
			style={{
				background: 'pink',
				display: 'flex',
				gap: '20px',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				minHeight: '100vh',
				overflowX: 'auto',
				padding: '20px',
			}}
		>
			<div className='card' style={cardStyles.product}></div>
			<div className='card' style={cardStyles.compare}></div>
			<div className='card' style={cardStyles.dropdown}></div>

			<style>{`
        .card {
          --circle-d: calc(var(--circle-r) * 2);
          --circles-space: calc(var(--big-circle-r) + var(--pillar-size));
          --circle-extend-inset: calc(var(--circle-r) + var(--circles-space));

          position: relative;
          border-top-right-radius: 0;
          filter: drop-shadow(var(--card-shadow));
          background: 
            /* Top Circle  */
            radial-gradient(
              circle closest-side,
              var(--card-color) 100%,
              transparent calc(100% + 1px)
            )
            calc(100% - var(--circles-space)) 0 / var(--circle-d) var(--circle-d)
            no-repeat,
            /* Top Circle Extend */
            linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0px
            0px / calc(100% - var(--circle-extend-inset)) var(--circle-d) no-repeat,
            /* Top Gap fill Pillar */
            linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0px
            var(--circle-r) / calc(100% - var(--circles-space))
            calc(100% - var(--circle-r)) no-repeat,
            /* Right Circle */
            radial-gradient(
              circle closest-side,
              var(--card-color) 100%,
              transparent calc(100% + 1px)
            )
            100% var(--circles-space) / var(--circle-d) var(--circle-d) no-repeat,
            /* Right Circle Extend  */
            linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 100%
            var(--circle-extend-inset) / var(--circle-d) 100% no-repeat,
            /* Right Gap fill Pillar */
            linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0
            var(--circles-space) / calc(100% - var(--circle-r)) 100% no-repeat,
            /* Big Circle Cutout */
            radial-gradient(
              circle at 100% 0%,
              transparent var(--big-circle-r),
              var(--card-color) calc(var(--big-circle-r) + 1px)
            )
            0px var(--pillar-size) / calc(100% - var(--pillar-size)) 100% no-repeat;
        }
      `}</style>
		</div>
	);
}
