import React, { Component, RefObject } from "react";
import Button from "react-bootstrap/Button";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

interface ProgressType {
	t: number;
	p: number;
}

const PROGRESS_LOOKBACK = 20;

class NewMedia extends Component<
	gt.problemType,
	{
		uploading_file?: string;
		progress?: ProgressType;
		last_progress?: ProgressType;
		progress_log: ProgressType[];
	}
> {
	new_media_ref: RefObject<HTMLInputElement> = React.createRef();

	constructor(props: gt.problemType) {
		super(props);
		this.state = { progress_log: [] };
	}

	render() {
		if (g.common().user.id === undefined) {
			return (
				<div>
					<p>Login and become verified to upload media.</p>
				</div>
			);
		} else if (!g.common().user.is_verified) {
			return (
				<div>
					<p>
						Email climb.nomorerice@gmail.com with a link to your
						profile to become verified to upload media.
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<p>New Media</p>
					<div className={gs.padding}>
						<input
							ref={this.new_media_ref}
							type="file"
							name="upload"
						/>
						<div className={gs.vertical_space_10} />
						<Button onClick={this.submitNewMedia.bind(this)}>
							Submit
						</Button>
						{this.state.progress !== undefined && (
							<span className={gs.margin}>{this.progress()}</span>
						)}
					</div>
				</div>
			);
		}
	}

	progress() {
		if (this.state.progress === undefined) return null;
		if (this.state.uploading_file === undefined) return "upload complete";
		if (this.state.last_progress === undefined) return "upload starting";
		const progress_ref = this.state.progress_log[0];
		const d =
			(this.state.progress.t - progress_ref.t) /
			1000 /
			(this.state.progress.p - progress_ref.p);
		return `${(this.state.progress.p * 100).toFixed(2)}% - ${Math.ceil(
			(1 - this.state.progress.p) * d
		)} seconds remaining`;
	}

	markProgress(p: number) {
		const progress = { p: p, t: Date.now() };
		if (this.state.progress !== undefined)
			this.state.progress_log.push(this.state.progress);
		if (this.state.progress_log.length > PROGRESS_LOOKBACK)
			this.state.progress_log.shift();
		this.setState({
			progress,
			last_progress: this.state.progress
		});
	}

	submitNewMedia() {
		const input = this.new_media_ref.current;
		if (input === null) return;
		const files = input.files;
		if (!files) return;
		const file = files[0];
		if (this.state !== null && this.state.uploading_file !== undefined)
			return alert(`already uploading ${this.state.uploading_file}`);
		this.setState({ uploading_file: file.name });
		const mime = file.type.split("/")[0];
		const acceptable_media = ["image", "video"];
		if (acceptable_media.indexOf(mime) === -1)
			return alert(`invalid file - ${mime}`);
		let gcs_key: string;
		let component = this;
		g.req("/get_gcs_key")
			.then(response => response.json())
			.then(response => {
				gcs_key = response.token;
				const folder = response.folder;
				const bucket = response.bucket;

				const name = `${folder}/${new Date().getTime()}_${file.name}`;
				const endpoint = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${name}`;

				return new Promise((resolve, reject) => {
					let req = new XMLHttpRequest();
					req.upload.onprogress = function(e) {
						component.markProgress(e.loaded / e.total);
					};
					req.open("POST", endpoint);
					req.onload = function(e) {
						if (req.status !== 200) return reject(req.statusText);
						resolve(req);
					};
					req.setRequestHeader("Authorization", `Bearer ${gcs_key}`);
					req.setRequestHeader("Content-Type", file.type);
					req.send(file);
				}) as Promise<XMLHttpRequest>;
			})
			.then(req => req.response)
			.then(JSON.parse)
			.then(response =>
				g.req(
					`/gym/${this.props.gym_path}/problem/${
						this.props.id
					}/upload`,
					"POST",
					{
						gcs_path: response.name,
						gcs_id: response.id,
						mime: file.type,
						size: file.size,
						gcs_key: gcs_key
					}
				)
			)
			.then(g.refresh)
			.then(() =>
				this.setState({
					uploading_file: undefined,
					last_progress: undefined,
					progress_log: []
				})
			);
	}
}

export default NewMedia;
