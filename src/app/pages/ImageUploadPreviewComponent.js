import React, { useState } from "react";

export default function App() {
    const [images, setImages] = useState([])
    const [data, setData] = useState([])

    const fileToDataUri = (image) => {

        return new Promise((res) => {
            const reader = new FileReader();
            const { type, name, size } = image;
            reader.addEventListener('load', () => {
                res({
                    base64: reader.result,
                    name: name,
                    type,
                    size: size,
                })
            });

            // console.log();
            reader.readAsDataURL(image);
        })
    }
    // convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    const uploadImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < e.target.files.length; i++) {
                newImagesPromises.push(fileToDataUri(e.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            console.log(newImages[1].base64, ":><:><:><:><:>");
            setImages([...images, ...newImages])

        }
    }

    return (
        <form>
            <div className="form-group">
                <input className="form-control" type="file" onChange={uploadImage} multiple />
            </div>
            {
                images.length > 0
                    ? images.map((imageObj, i) => {
                        return (
                            <div className="form-group multi-preview">
                                <img
                                    width="75px"
                                    height="75px"
                                    src={imageObj.base64}
                                    alt=''
                                />
                                <div>
                                    <span>{imageObj.size ? imageObj.size : '-'}</span>
                                    <span>{imageObj.name ? imageObj.name : '-'}</span>
                                    {/* <span
                                onClick={() => removeImage(i)}
                            >
                                test
                            </span> */}
                                </div>
                            </div>
                        )
                    })
                    : null
            }
        </form>
    );
}