const Course = ({ course }) => (
	<>
		<h2>{course.name}</h2>
		{course.parts.map(part => <Part key={part.id} part={part} />)}		
		<Total parts={course.parts} />
	</>
)

const Part = (props) => (
	<>
		<p>{props.part.name} {props.part.exercises}</p>
  	</>
)

const Total = (props) => (
	<>
		<p>total of {props.parts.reduce((sum, p) => sum + p.exercises, 0)} exercises</p>
	</>
)

export default Course