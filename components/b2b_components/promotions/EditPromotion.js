import axios from "axios";
import router from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

export default function EditPromotion({ promotionEditId, promotionsArr, bannerImagetrue }) {
  const [promotionsTitle, setPromotionTitle] = useState("");
  const [promotionsText, setPromotionText] = useState("");
  const [promotionsLink, setPromotionLink] = useState("");
  const [promotionsButton, setPromotionButton] = useState("");
  const [promotions, setPromotion] = useState("");
  const [promotionsIsActive, setActive] = useState(1);
  const [imageInput, setImage] = useState([]);
  const [imageInputNew, setImageNew] = useState([]);
  const [id_, setId_] = useState(0);

  const [imageFile, setImageFile] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  useEffect(() => {
    promotionsArr?.map(item => {
      if (item.id === promotionEditId) {
        setPromotionTitle(item.title);
        setPromotionText(item.text);
        setPromotionButton(item.btnText);
        setPromotionLink(item.btnLink);
        setImage(JSON.parse(item.image));
        setActive(item.active);
        setId_(item.id)
      }
    })
  }, [promotionEditId]);

  function changeImageSrc(files) {
    const reader = new FileReader();

    setImageNew([
      {
        image: files,
        path: Math.floor(Math.random() * (1000000000 + 10)),
      },
    ]);

    reader.onload = function () {
      setPromotion(reader.result);
    };

    reader.readAsDataURL(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let imageArr = [];

    if(imageInputNew.length > 0){
      imageInput.forEach(item => {
        console.log(item.path)
        const desertRef = ref(storage, `image/${item.path}`);

        deleteObject(desertRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      })
    }
    if (imageInputNew.length > 0) {
    imageInputNew.forEach(async item => {
      if (item.image) {
       const name = item.path;
       const storageRef = ref(storage, `image/${name}`)
       const uploadTask = uploadBytesResumable(storageRef, item.image)
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

       toast('Aguarde Promoção sendo editada!', {
        position: "top-right",
        });

       setTimeout(async () => {
       console.log(imageArr, contador)
       if(imageInput.length === contador) {
         contador = 0;
       let data = await axios.put(`/api/promotions/` + id_, {
        title: promotionsTitle,
        text: promotionsText,
        btnText: promotionsButton,
        btnLink: promotionsLink,
        image: JSON.stringify(imageArr),
        active: promotionsIsActive,
       });
       mutate(`/api/promotions`);
       if (data.data) router.push("/b2b/promotions");
     }
     }, 3000)
 })} else {
  toast('Aguarde Promoção sendo editada!', {
    position: "top-right",
  });

  setTimeout(async () => {
    let data = await axios.put(`/api/promotions/` + id_, {
      title: promotionsTitle,
      text: promotionsText,
      btnText: promotionsButton,
      btnLink: promotionsLink,
      image: JSON.stringify(imageInput),
      active: promotionsIsActive,
    });
    mutate(`/api/promotions`);
    if (data.data) router.push("/b2b/promotions");
  }, 3000)
}
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Editar Promoção</h4>

        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Titulo
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                defaultValue={promotionsTitle}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionTitle(e.target.value)}
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
                defaultValue={promotionsText}
                className="form-control here slug-title p-0"
                style={{ borderRadius: '0px' }}
                rows="5"
                onChange={(e) => setPromotionText(e.target.value)}
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
                defaultValue={promotionsButton}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionButton(e.target.value)}
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
                defaultValue={promotionsLink}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionLink(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Imagem
            </label>
            <div style={{ height: '60px', display: 'flex' }}>
                  {imageInput?.map((item, index) => {
                      return(
                      <Image
                      key={index}
                      className="ec-brand-icon"
                      style={{ minWidth: "300px", objectFit: 'cover' }}
                      src={promotions || item.url}
                      alt=""
                      width={150}
                      height={150}
                    />)
                  })}
                  </div>
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
            {promotionsIsActive === 1 ?
              <>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
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
              </>
              :
              <>
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
                  defaultChecked
                  value={0}
                  style={{ width: '20px', margin: '0 15px 0 0' }}
                  onChange={(e) => setActive(e.target.value)}
                />
                Não
              </div>
            </>
            }

          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
                Editar Promoção
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
