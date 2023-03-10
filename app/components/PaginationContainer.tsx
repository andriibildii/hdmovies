"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationContainer({
	page,
	querySearch,
}: {
	page: number;
	querySearch: string;
}) {
	// const [serverPage, setServerPage] = useState<number>(page);
	// console.log("serverPage", serverPage);

	const [clientPage, setClientPage] = useState<number>(1);
	// console.log("clientPage", clientPage);

	const router = useRouter();

	const nextPage = () => {
		setClientPage(clientPage + 1);
	};

	useEffect(() => {
		// setClientPage(1);
	}, [querySearch]);

	useEffect(() => {
		// router.push(`/?page=${clientPage}`);
	}, [clientPage]);

	return (
		<div>
			<p>page {clientPage}</p>
			<button onClick={nextPage}>Change Page</button>
		</div>
	);
}
