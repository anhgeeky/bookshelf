import React, { createElement } from "react"
import styled from "styled-components"

interface IStyledHeading {
	style?: React.CSSProperties
	className?: string
	weight?: number
}

const StyledHeading = styled.span<IStyledHeading>`
	font-family: var(--fonts);
	line-height: 1.2;
	font-weight: ${props => (props.weight ? props.weight : 700)};

	.h1 {
		font-size: var(--step-4);
	}

	.h2 {
		font-size: var(--step-3);
	}

	.h3 {
		font-size: var(--step-2);
	}

	.h4 {
		font-size: var(--step-1);
	}

	.h5 {
		font-size: var(--step-0);
	}
`

interface IHeading {
	level: any
	levelClass?: string
	className?: string
	weight?: number
	style?: React.CSSProperties
	props?: React.HTMLAttributes<HTMLDivElement>
	children?: React.ReactNode
}

const HeadingEl: React.FC<IHeading> = ({ level, levelClass, className, weight, style, children, ...props }) => {
	return (
		<StyledHeading weight={weight}>
			{createElement(
				level,
				{ className: `${levelClass ? levelClass : level} ${className ? ` ${className}` : ""}`, style: style, ...props },
				children
			)}
		</StyledHeading>
	)
}

export default HeadingEl
