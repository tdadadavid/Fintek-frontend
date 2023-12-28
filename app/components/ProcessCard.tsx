import Link from "next/link";

interface ProcessCard {
	icon: React.ReactNode;
	title: string;
	description: string;
	linkTo: string;
}

const ProcessCard = (props: ProcessCard) => {
	return (
		<Link className="processCard" href={props.linkTo}>
			<div className="icon">{props.icon}</div>
			<div className="title">{props.title}</div>
			<p className="description">{props.description}</p>
		</Link>
	);
};

export default ProcessCard;
