import React, { useRef } from "react";

export type GroupType = {
	groups: GroupType[];
	name: string;
	id: number;
	classes: string[];
	minimumNumberFromGroup?: number;
	mutuallyExclusive?: boolean;
};

interface Props {
	group: GroupType;
	forceReload: () => void;
}

const Group = ({ group, forceReload }: Props) => {
	const groupRef = useRef() as React.MutableRefObject<GroupType>;

	function createNewGroup() {
		let newGroup: GroupType = {
			groups: [],
			id: group.groups.length,
			name: "Group " + group.groups.length,
			classes: [],
			minimumNumberFromGroup: 0,
			mutuallyExclusive: false,
		};

		group.groups.push(newGroup);
		forceReload();
	}

	function addClass(newClassName: string) {
		console.log("addClass");

		console.log("groupRef.current", groupRef.current);
		group.classes.push(newClassName);
		forceReload();
	}

	// style guidelines
	// every header is a bold 4rem font
	// everything is left aligned
	// subgroups are indented by 1rem
	// classes are indented by 2rem
	// minimum number from group is indented by 1rem
	// mutually exclusive is indented by 1rem
	// input labels are small gray text
	// add class is indented by 1rem
	// add subgroup is indented by 1rem
	// 1px gray borders with rounded corners
	// 1rem padding
	// 1rem margin

	return (
		<div className="border-4 border-gray-400 rounded-lg p-4 mt-2 flex items-start justify-center flex-col mr-2">
			<input
				className="text-1xl font-bold border-0 rounded-lg outline-none"
				value={group.name}
				onChange={(e) => {
					group.name = e.currentTarget.value;
					forceReload();
				}}
			></input>
			<h1 className="text-0.5xl font-bold">
				{group.groups.length + group.classes.length > 0 ? "Items" : "No items"}
			</h1>
			<div className="mt-2">
				<button
					className="border-2 border-gray-400 rounded-lg p-2 mr-2"
					onClick={createNewGroup}
				>
					Add subgroup
				</button>

				<input
					className="border-2 border-gray-400 rounded-lg p-2"
					type="text"
					placeholder="Add class"
					// when user presses enter, add class
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (e.currentTarget.value === "") {
								return;
							}
							console.log("e.currentTarget.value", e.currentTarget.value);
							addClass(e.currentTarget.value);
							e.currentTarget.value = "";
						}
					}}
				/>
			</div>
			<div className="flex max-w-full flex-wrap">
				{group.classes.map((c: any, index: number) => {
					return (
						<div className="border-2 border-gray-400 rounded-lg p-2 mr-2 mt-2">
							<p key={index}>{c}</p>
						</div>
					);
				})}
			</div>
			<div className="flex max-w-full flex-wrap">
				{group.groups.map((g: any, index: number) => {
					return <Group key={index} group={g} forceReload={forceReload} />;
				})}
			</div>

			<div className="flex flex-row justify-between items-center mt-2">
				<div>
					<label
						className="text-sm text-gray-500"
						htmlFor="minimumNumberFromGroup"
					>
						Min #
					</label>
					<input
						className="border-2 border-gray-400 rounded-lg p-2 m-2 w-10"
						name="minimumNumberFromGroup"
						placeholder="#"
						type="number"
						onChange={(e) => {
							group.minimumNumberFromGroup = parseInt(e.currentTarget.value);
							forceReload();
						}}
					/>
				</div>

				<div>
					<label className="text-sm text-gray-500" htmlFor="mutuallyExclusive">
						Mutually exclusive?
					</label>
					<input
						className="border-2 border-gray-400 rounded-lg p-2 m-2"
						name="mutuallyExclusive"
						type="checkbox"
						onChange={(e) => {
							group.mutuallyExclusive = e.currentTarget.checked;
							forceReload();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Group;
