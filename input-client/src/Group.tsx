import React from "react";

interface Props {
	group: GroupType;
	forceReload: () => void;
}

const Group = ({ group, forceReload }: Props) => {
	function createNewGroup() {
		let newGroup: GroupType = {
			groups: [],
			id: group.groups.length,
			name: "Group " + group.groups.length,
		};
		group.groups.push(newGroup);
		forceReload();
	}

	return (
		<div className="border-red-700 border-4">
			<h1>{group?.name}</h1>
			<h1>{group.groups.length > 0 ? "Groups" : "No groups"}</h1>
			{group.groups.map((g: any, index: number) => {
				return <Group key={index} group={g} forceReload={forceReload} />;
			})}

			<button onClick={createNewGroup}>Add subgroup</button>
		</div>
	);
};

export type GroupType = {
	groups: GroupType[];
	name: string;
	id: number;
};

export default Group;
