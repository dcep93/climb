import React from "react";

import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

function mediaData(m: gt.mediaType) {
	if (!m.data) {
		return <p>received - handling</p>;
	} else if (m.mime === "video") {
		const href = encodeURIComponent(`https://www.facebook.com${m.data}`);
		const paddingPercent = (m.height * 100) / m.width;
		return (
			<div
				className={styles.video_div}
				style={{ paddingTop: `${paddingPercent}%` }}
			>
				<iframe
					className={styles.video}
					src={`https://www.facebook.com/plugins/video.php?href=${href}`}
					width={m.width}
					height={m.height}
					style={{
						border: "none"
					}}
					scrolling="no"
					allowFullScreen={true}
				/>
				<div className={gs.vertical_space_10} />
			</div>
		);
	} else if (m.mime === "image") {
		return <img className={styles.image} src={m.data} />;
	} else {
		return <pre>{m.data}</pre>;
	}
}

function keyById<T extends { id: number }>(items: T[]): { [id: number]: T } {
	const dict: { [id: number]: T } = {};
	items.forEach(item => {
		dict[item.id] = item;
	});
	return dict;
}

export default { keyById, mediaData };
