import { assertNever } from "../utils";
import { CoursePart } from "../types"

interface PartProps {
	part: CoursePart;
}

const Part = (props: PartProps) => {
	const result: JSX.Element[] = [
		<b key="partname">{props.part.name} {props.part.exerciseCount}</b>,
		<br key="linebreak" />
	];

	switch (props.part.kind) {
		case "basic":
			result.push(<i key={props.part.name + "_desc"}>{props.part.description}</i>);
			break;
		case "background":
			result.push(<span key={props.part.name + "_desc"}><i>{props.part.description}</i><br /></span>);			
			result.push(<span key={props.part.name + "_bg"}>Background material: {props.part.backgroundMaterial}</span>)
			break;
		case "group":
			result.push(<span key={props.part.name + "_gr"}>Project exercises: {props.part.groupProjectCount}</span>)
			break;
		case "special":
			result.push(<span key={props.part.name + "_desc"}><i>{props.part.description}</i><br /></span>);
			result.push(<span key={props.part.name + "_req"}>Required skills: {props.part.requirements.join(', ')}</span>)
			break;
		default:
			return assertNever(props.part);
	}

	return <div><br /> {result} </div>;
};

export default Part;