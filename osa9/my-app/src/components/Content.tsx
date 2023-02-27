import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.courseParts.map(p => <Part key={p.name} part={p} />)}
		</div>
	);
};

export default Content;