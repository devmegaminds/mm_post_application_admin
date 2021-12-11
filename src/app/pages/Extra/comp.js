import React from 'react';
import axios from 'axios';
import '../custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUplaodComponents from '../../components/ImageUplaod'
import { imagesubcriber } from '../../env/subBehaviour';

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.addFormData = this.addFormData.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        debugger
        imagesubcriber.subscribe((x) => {
            debugger
            this.setState({image: x})
        })
    }
    //FileChange
    // handleChange(file) {
    //     this.setState({
    //         imagedata: file[0],
    //     })
    // }

    addFormData() {
        debugger
        let x = this.state.image
        console.log(x, "PLPLPLPLPLPLPLPLPLPLP");

        for (var i = 0; i < x.length; i++) {
            const fd = new FormData();
            fd.append('image', x[i]['file']);
            // fd.append('stImageDatabase64', x[i]['data_url'].split(',')[1]);
            var xyz = 15
            var xysz = 'base64data'
            var asd = 0
            fd.append('inCategoryId', xyz);
            fd.append('stImageDatabase64', xysz);
            fd.append('inCategoryImageId', asd);
            // console.log(fd, ">:>:>:>:>:>:>:>:>:>:");
            // axios.post('http://localhost:4200/api/Image/addEditImage', fd)
            axios.post('http://megaminds-001-site12.itempurl.com/api/Image/addEditImage', fd)
                .catch((e) => {
                });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <ImageUplaodComponents />
                </div>
                <div >
                    <button className="btn btn-primary"
                    style={{ width: 120, marginRight: 10, marginTop:50 }}
                     onClick={this.addFormData}
                    >Submit</button>
                </div>
            </div>
        )
    }
}
export default Demo;