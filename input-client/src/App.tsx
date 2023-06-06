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

	// useref of grouptype
	const group = useRef<GroupType>({
		groups: [],
		id: 0,
		name: "BIG GROUP",
		classes: [],
		minimumNumberFromGroup: 0,
		mutuallyExclusive: false,
	});

	return (
		<div>
			<h1>Groups</h1>
			<Group group={group.current} forceReload={forceUpdate}></Group>

			<button
				onClick={() => {
					console.log(group.current);
				}}
				className="border-4 border-red-700 p-2"
			>
				Show data
			</button>
		</div>
	);
}

export default App;
