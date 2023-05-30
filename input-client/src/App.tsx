import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Group, { GroupType } from "./Group";

// forcereload hook
// https://stackoverflow.com/questions/53215285/how-can-i-force-a-react-component-to-re-render-with-hooks
function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state

	return () => setValue((value) => ++value); // update the state to force render
}

function App() {
	const forceUpdate = useForceUpdate();

	// useref with array of type GroupType
	const data = useRef<GroupType[]>([]);

	// useref of grouptype
	const group = useRef<GroupType>({
		groups: [],
		id: 0,
		name: "BIG GROUP",
	});

	// createNewGroup function
	function createNewGroup() {
		let newGroup: GroupType = {
			groups: [],
			id: data.current.length,
			name: "Group " + data.current.length,
		};
		data.current.push(newGroup);
		forceUpdate();
	}

	console.log("data.current", data.current);

	return (
		<div>
			<h1>Groups</h1>
			{data.current.map((group: any, index: number) => {
				return <Group key={index} group={group} forceReload={forceUpdate} />;
			})}
			<button onClick={createNewGroup}>Add group</button>
		</div>
	);
}

export default App;
