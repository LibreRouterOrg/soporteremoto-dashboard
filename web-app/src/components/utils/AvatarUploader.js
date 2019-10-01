import React from 'react';
import { Upload, Icon, message } from 'antd';

var MAX_HEIGHT = 100;

function getBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
            // Resize Image
            var canvas = document.createElement("canvas");
            if (image.height > MAX_HEIGHT) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            callback(canvas.toDataURL())
        };
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

export class AvatarUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.beforeUpload = this.beforeUpload.bind(this);
    }

    beforeUpload(file) {
        getBase64(file, imageUrl => {
            this.setState({
                imageUrl,
                loading: false,
            });
            this.props.onChange(imageUrl)
        })
        return false;
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                accept="image/*"
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}
