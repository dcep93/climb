import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

class Media extends Component<{media: gt.mediaType[], gym: gt.gymType, wall: gt.wallType, common: gt.commonType}, any> {
    newMedia() {
        if (this.props.common.user.id === undefined) {
            return <p>Create an account and become verified to upload media.</p>
        } else if (!this.props.common.user.is_verified) {
            return <p>Email climb.nomorerice@gmail.com to become verified to upload media.</p>
        } else {
            return <div>
                <p>New Media</p>
                <form onSubmit={this.submitNewMedia}>
                    <input type="file" name="upload" />
                    <input type="submit" />
                </form>
            </div>
        }
    }

    submitNewMedia = () => {
        return;
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
              {this.props.media.map((m) => {
                  <div>
                    <p>id: {m.id}</p>
                    <p>mime: {m.mime}</p>
                    {this.mediaData(m)}
                </div>
              })}            
          </div>
      );
    }
  }

export default Media;
