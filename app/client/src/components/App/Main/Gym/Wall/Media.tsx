import React, { Component, RefObject, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

class Media extends Component<{media: gt.mediaType[], gym: gt.gymType, wall: gt.wallType, common: gt.commonType}, any> {
    newMediaRef: RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.newMediaRef = React.createRef();
    }

    newMedia() {
        if (this.props.common.user.id === undefined) {
            return <p>Create an account and become verified to upload media.</p>
        } else if (!this.props.common.user.is_verified) {
            return <p>Email climb.nomorerice@gmail.com to become verified to upload media.</p>
        } else {
            return <div>
                <p>New Media</p>
                <form onSubmit={this.submitNewMedia}>
                    <input ref={this.newMediaRef} type="file" name="upload" />
                    <input type="submit" />
                </form>
            </div>
        }
    }

    submitNewMedia = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var input = this.newMediaRef.current;
        if (input === null) return;
        var files = input.files;
        if (!files) return;
        var file = files[0];
        var mime = file.type.split("/")[0];
        var acceptableMedia = ["image", "video"];
        if (acceptableMedia.indexOf(mime) === -1) return alert('invalid file');
        var gcsKey: string;
        g.req('/api/get_gcs_key')
            .then((response) => response.json())
            .then((response) => {
                gcsKey = response.token;
                var folder = response.folder;
                var bucket = response.bucket;

                var name = `${folder}/${(new Date().getTime())}_${file.name}`;
                var endpoint = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${name}`;

                return fetch(endpoint, {
                    method: 'POST',
                    body: file,
                    headers: {
                        'Authorization': `Bearer ${gcsKey}`,
                        'Content-Type': file.type,
                        // 'Content-Length': file.size,
                    },
                });
            })
            .then((response) => response.json())
            .then((response) =>
                g.req(`/api/${this.props.common.path}/upload`, 'POST', {
                    gcs_path: response.name,
                    gcs_id: response.id,
                    mime: file.type,
                    size: file.size,
                    gcs_key: gcsKey,
                })
            )
    }

    mediaData(m: gt.mediaType) {
        if (!m.data) {
            return <p>received - handling</p>;
        } else if (m.mime === 'video') {
            var href = encodeURIComponent(`https://www.facebook.com${m.data}`);
            return <iframe src={`https://www.facebook.com/plugins/video.php?href=${href}`} width={m.width} height={m.height} style={{border:'none',overflow:'hidden'}} scrolling="no" allowTransparency={true} allowFullScreen={true}></iframe>;
        } else if (m.mime === 'image') {
            return <img src={m.data}></img>;
        } else {
            return <pre>{m.data}</pre>
        }
    }

    render() {
      return (
          <div>
              <p>Media</p>
              <br />
              {this.newMedia()}
              <div>
                {this.props.media.map((m) =>
                    <div key={m.id}>
                        <p>id: {m.id}</p>
                        <p>mime: {m.mime}</p>
                        {this.mediaData(m)}
                    </div>
                )}
              </div>
          </div>
      );
    }
  }

export default Media;
