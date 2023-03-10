"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchField() {
	const [querySearch, setQuerySearch] = useState("");
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuerySearch(e.target.value);
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		router.push(`/?search=${querySearch}`);
		setQuerySearch("");
	};

	return (
		<div className="flex justify-center items-center gap-4 my-2">
			<form
				onSubmit={handleSubmit}
				className="flex justify-center flex-wrap sm:flex-nowrap"
			>
				<input
					type="text"
					value={querySearch}
					onChange={handleChange}
					className="py-2 px-4 text-sm text-slate-900 bg-slate-200 rounded-md font-medium my-1"
					placeholder="Search movie..."
				/>
				<button
					type="submit"
					className="py-2 px-4 text-sm bg-slate-600 text-white rounded-lg ml-1 my-1"
				>
					Search
				</button>
			</form>
		</div>
	);
}
