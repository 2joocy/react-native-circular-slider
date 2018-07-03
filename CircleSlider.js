import React, { Component } from "react";
import { PanResponder, View, Dimensions } from "react-native";
import Svg, {
	Path,
	Circle,
	G,
	Text,
	Defs,
	LinearGradient,
	Stop
} from "react-native-svg";

export default class CircleSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			angle: this.props.value
		};
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gs) => true,
			onStartShouldSetPanResponderCapture: (e, gs) => true,
			onMoveShouldSetPanResponder: (e, gs) => true,
			onMoveShouldSetPanResponderCapture: (e, gs) => true,
			onPanResponderMove: (e, gs) => {
				let xOrigin =
					this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
				let yOrigin =
					this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
				let a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
				this.setState({ angle: a });
			}
		});
	}

	polarToCartesian(angle) {
		let r = this.props.dialRadius;
		let hC = this.props.dialRadius + this.props.btnRadius;
		let a = ((angle - 90) * Math.PI) / 180.0;

		let x = hC + r * Math.cos(a);
		let y = hC + r * Math.sin(a);
		return { x, y };
	}

	cartesianToPolar(x, y) {
		let hC = this.props.dialRadius + this.props.btnRadius;

		if (x === 0) {
			return y > hC ? 0 : 180;
		} else if (y === 0) {
			return x > hC ? 90 : 270;
		} else {
			return (
				Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
				(x > hC ? 90 : 270)
			);
		}
	}

	render() {
		let width = (this.props.dialRadius + this.props.btnRadius) * 2;
		let bR = this.props.btnRadius;
		let dR = this.props.dialRadius;
		let startCoord = this.polarToCartesian(0);
		let endCoord = this.polarToCartesian(this.state.angle);

		return (
			<Svg ref="circleslider" width={width} height={width}>
				<Defs>
					<LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
						<Stop offset="0%" stopColor={this.props.startGradient} />
						<Stop offset="100%" stopColor={this.props.endGradient} />
					</LinearGradient>
				</Defs>
				<Circle
					r={dR}
					cx={width / 2}
					cy={width / 2}
					stroke={this.props.backgroundColor}
					strokeWidth={25}
					fill="none"
				/>
				<Text
					x={width / 2}
					y={width / 2}
					fontSize={this.props.textSize}
					fill={this.props.textColor}
					textAnchor="middle"
				>
					{this.props.showValue &&
						this.props.onValueChange(this.state.angle) + ""}
				</Text>
				<Path
					stroke={"url(#gradient1)"}
					strokeWidth={this.props.dialWidth}
					fill="none"
					d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${
						this.state.angle > 180 ? 1 : 0
					} 1 ${endCoord.x} ${endCoord.y}`}
				/>

				<G x={endCoord.x - bR} y={endCoord.y - bR}>
					<Circle
						r={bR}
						cx={bR}
						cy={bR}
						fill={"white"}
						{...this._panResponder.panHandlers}
					/>
				</G>
			</Svg>
		);
	}
}

CircleSlider.defaultProps = {
	btnRadius: 13,
	dialRadius: 130,
	dialWidth: 25,
	textColor: "white",
	textSize: 50,
	value: 0,
	xCenter: Dimensions.get("window").width / 2,
	yCenter: Dimensions.get("window").height / 2,
  showValue: true,
  startGradient: '#12D8FA',
  endGradient: '#A6FFCB',
  backgroundColor: 'white',
	onValueChange: x => x
};
