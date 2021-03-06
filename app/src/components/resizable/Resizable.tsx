import React, { useEffect, useState } from 'react';
import './styles.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	if (direction === 'horizontal')
		resizableProps = {
			className: 'resize-horizontal',
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			height: Infinity,
			width: width,
			resizeHandles: ['e'],
			onResizeStop: (event, data) => setWidth(data.size.width),
		};
	else
		resizableProps = {
			minConstraints: [Infinity, innerHeight * 0.2],
			maxConstraints: [Infinity, innerHeight * 0.75],
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
		};

	useEffect(() => {
		let timer: any;

		const listener = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				window.innerWidth * 0.75 < width && setWidth(window.innerWidth * 0.75);
			}, 100);
		};
		window.addEventListener('resize', listener);

		return () => window.removeEventListener('resize', listener);
	}, [width]);

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
