import Link from "next/link";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface ContentHeadingType {
	title: string;
	sideSection: React.ReactNode;
}

const ContentHeading = (props: ContentHeadingType) => {
	return (
		<div className="content-heading">
			<Link href="/">
				<IoArrowBackCircleSharp size={20} />
			</Link>
			<h2>{props.title}</h2>
			<div className="side-section">{props.sideSection}</div>
		</div>
	);
};

export default ContentHeading;