import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import Image from 'next/image'; 
import router from 'next/router'
import { toast } from "react-toastify";

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

export default function AddBannerSub() {
  const [bannersSubTitle, setBannerSubTitle] = useState("");
  const [bannersSubText, setBannerSubText] = useState("");
  const [bannersSubLink, setBannerSubLink] = useState("");
  const [bannersSubButton, setBannerSubButton] = useState("");
  const [bannersSub, setBannersSub] = useState("");
  const [imageInput, setImage] = useState([]);
  const [bannersSubIsActive, setActive] = useState(1);

  const [imageFile, setImageFile] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let imageArr = [];
    imageInput.forEach(async item => {
      if (item.image) {
       const name = item.path;
       const storageRef = ref(storage, `image/${name}`);
       const uploadTask = uploadBytesResumable(storageRef, item.image);
       uploadTask.on(
         'state_changed',
         (snapshot) => {
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
 
           setProgressUpload(progress) // to show progress upload
 
           switch (snapshot.state) {
             case 'paused':
               console.log('Upload is paused')
               break
             case 'running':
               console.log('Upload is running')
               break
           }
         },
         (error) => {
           alert(error.message)
         },
 
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
             //url is download url of file
             setDownloadURL((current) => [
               ...current,
               {
                 url: url,
                 path: name,
               },
             ]);
             const obj = [{url: url, path: name}];
             imageArr = obj;
           })
         },
         )
       } else {
         alert('File not found')
       }
       
       contador++

       toast('Aguarde Sub-Banner sendo adicionado!', {
        position: "top-right",
        });


       setTimeout(async () => {
       console.log(imageArr, contador)
       if(imageInput.length === contador) {
         contador = 0;
       let data = await axios.post(`/api/subBanners`, {
        title: bannersSubTitle,
        text: bannersSubText,
        btnText: bannersSubButton,
        btnLink: bannersSubLink,
        image: JSON.stringify(imageArr),
        active: bannersSubIsActive,
       });
       mutate(`/api/subBanners`);
       if (data.data) router.push("/b2b/subBanners");
     }
     }, 3000)
 })
  };


  function changeImageSrc(files) {
    const reader = new FileReader();
    setImage([
      {
        image: files,
        path: Math.floor(Math.random() * (1000000000 + 10)),
      },
    ]);

    reader.onload = function () {
      setBannersSub(reader.result);
    };

    reader.readAsDataURL(files);
  };


  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Banner</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Titulo
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Texto
            </label>
            <div className="col-12">
              <textarea
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                style={{borderRadius: '0px'}}
                rows="5"
                onChange={(e) => setBannerSubText(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Escrita Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubButton(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Link Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubLink(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Imagem
            </label>
            <div style={{ height: '60px', display: 'flex' }}>
              <Image
                className="ec-brand-icon"
                style={{ minWidth: "300px", objectFit: 'cover' }}
                src={bannersSub || require('../../../assets/images/noimg.jpg')}
                alt=""
                width={150}
                height={150}
              /></div>
            <div className="col-12">
              <input
                id="color"
                name="color"
                className="form-control here slug-title p-0"
                style={{ paddingLeft: '10px !important', height: '30px' }}
                type="file"
                onChange={(e) => changeImageSrc(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row align-items-center">
            <label className="form-label">Ativado</label>
            <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
              <input
                type="radio"
                name="active"
                value={1}
                style={{ width: '20px', margin: '0 15px 0 0' }}
                onChange={(e) => setActive(e.target.value)}
              />
              Sim
            </div>
            <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
              <input
                type="radio"
                name="active"
                value={0}
                style={{ width: '20px', margin: '0 15px 0 0' }}
                onChange={(e) => setActive(e.target.value)}
              />
              Não
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary mt-4">
                Adicionar Banner
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
